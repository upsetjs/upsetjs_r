
sortSets = function(sets, order.by='cardinality', limit=NULL) {
  set_attr = function(order.by.attr) {
    set_names =
    if (order.by.attr == 'cardinality') {
      sapply(sets, function (x) { -x$cardinality })
    } else if (order.by == 'degree') {
      sapply(sets, function (x) { x$degree })
    } else {
      sapply(sets, function (x) { x$name })
    }
  }

  if (order.by == 'cardinality') {
    order.by = c('cardinality', 'name')
  } else if (order.by == 'degree') {
    order.by = c('degree', 'name')
  }
  o = order(...sapply(order.by, set_attr))
  r = sets[o]
  if (is.null(limit)) {
    r
  } else {
    r[1:limit]
  }
}

generateCombinationsImpl = function(sets, set_f, min, max, order.by, limit, symbol="&") {
  combinations = c()
  c_type = if (set_f == intersect) "intersection" else "union"
  for(l in min:max) {
    combos = combn(sets, l, simplify=F)
    for(combo in combos) {
      set_names = sapply(combo, function(s) s$name)
      set_elems = sapply(combo, function(s) s$elems)
      elems = set_f(...set_elems)
      if (empty || length(elems) > 0) {
        combinations = c(combinations, list(namepaste(set_names, symbol), type=c_type, elems=elems, setNames=set_names))
      }
    }
  }
  sortSets(combinations, order.by, limit)
}

#'
#' generates the sets from a lists object
#' @param upsetjs the upsetjs (proxy) instance
#' @param value the list input value
#' @param order.by order intersections by cardinality or name
#' @param limit limit the ordered sets to the given limit
#' @param shared a crosstalk shared data frame
#' @param shared.mode whether on 'hover' or 'click' (default) is synced
#' @return upsetjs
#'
#' @export
fromList = function(upsetjs, value, order.by="cardinality", limit=NULL, shared=NULL, shared.mode="click") {
  stopifnotupset(upsetjs)
  stopifnot(is.list(value))
  stopifnot(order.by == "cardinality" || order.by == "degree")
  stopifnot(is.null(limit) || (is.numeric(limit) && length(limit) == 1))
  stopifnot(shared.mode == "click" || shared.mode == "hover")

  toSet = function(key, value) {
    list(name=key, elems=value, cardinality=length(value))
  }
  sets = mapply(toSet, key=names(value), value=value, SIMPLIFY=F)
  # list of list objects
  names(sets) = NULL

  if (!is.null(shared)) {
     upsetjs = enableCrosstalk(upsetjs, shared, mode=shared.mode)
  }

  sets = sortSets(sets, order.by=order.by, limit=limit)
  gen = generateCombinationsImpl(sets, intersect, 0, NULL, order.by, NULL)
  setProperties(upsetjs, list(sets=sets, combinations=gen))
}

#'
#' generates the sets from a lists object that contained the cardinalties of both sets and combinations (&)
#' @param upsetjs the upsetjs (proxy) instance
#' @param value the expression list input
#' @param symbol the symbol how to split list names to get the sets
#' @param order.by order intersections by cardinality or name
#' @return upsetjs
#'
#' @export
fromExpression = function(upsetjs, value, symbol="&", order.by="cardinality") {
  stopifnotupset(upsetjs)
  stopifnot(is.list(value))
  stopifnot(order.by == "cardinality" || order.by == "degree")

  degrees = sapply(names(value), function (x) { length(unlist(strsplit(x, symbol))) })

  combinations = value
  sets = value[degrees == 1]

  toSet = function(key, value) {
    list(name=key, type="set", elems=c(), cardinality=value)
  }
  sets = mapply(toSet, key=names(sets), value=sets, SIMPLIFY=F)
  names(sets) = NULL
  sets = sortSets(sets, order.by=order.by)

  toCombination = function(key, value) {
    list(name=key, type="composite", elems=c(), cardinality=value, setNames=unlist(strsplit(key, symbol)))
  }
  combinations = mapply(toCombination, key=names(combinations), value=combinations, SIMPLIFY=F)
  names(combinations) = NULL
  combinations = sortSets(combinations, order.by=order.by)

  props = list(sets=sets, combinations=combinations)
  setProperties(upsetjs, props)
}


#'
#' extract the sets from a data frame (rows = elems, columns = sets, cell = contained)
#' @param upsetjs the upsetjs (proxy) instance
#' @param df the data.frame like structure
#' @param order.by order intersections by cardinality or degree
#' @param limit limit the ordered sets to the given limit
#' @param shared a crosstalk shared data frame
#' @param shared.mode whether on 'hover' or 'click' (default) is synced
#' @return upsetjs
#'
#' @export
fromDataFrame = function(upsetjs, df, order.by="cardinality", limit=NULL, shared=NULL, shared.mode="click") {
  stopifnotupset(upsetjs)
  stopifnot(is.data.frame(df))
  stopifnot(order.by == "cardinality" || order.by == "degree")
  stopifnottype(limit)
  stopifnot(shared.mode == "click" || shared.mode == "hover")

  elems = rownames(df)
  toSet = function(key) {
    sub = elems[df[[key]] == T]
    list(name=key, elems=sub)
  }
  sets = lapply(colnames(df), toSet)

  if (!is.null(shared)) {
    upsetjs = enableCrosstalk(upsetjs, shared, mode=shared.mode)
  } else {
    upsetjs = enableCrosstalk(upsetjs, df, mode=shared.mode)
  }

  sets = sortSets(sets, order.by=order.by, limit=limit)
  gen = generateCombinationsImpl(sets, intersect, 0, NULL, order.by, NULL)
  setProperties(upsetjs, list(sets=sets, combinations=gen))
}


#'
#' extract the vector of sets
#' @param upsetjs the upsetjs instance
#' @return vector of sets
#'
#' @export
getSets = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs'))
  upsetjs$x$sets
}

#'
#' extract the vector of combinations
#' @param upsetjs the upsetjs instance
#' @return vector of sets
#'
#' @export
getCombinations = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs'))
  upsetjs$x$combinations
}

generateCombinations = function(upsetjs, set_f, min, max, empty, order.by, limit, symbol = '&') {
  stopifnotupset(upsetjs)
  stopifnot(is.numeric(min), length(min) == 1)
  stopifnottype(max)
  stopifnot(is.logical(empty), length(empty) == 1)
  stopifnot(is.character(order.by), length(order.by) >= 1)
  stopifnot(is.null(limit) || (is.numeric(limit) && length(limit) == 1))

  if(inherits(upsetjs, 'upsetjs')) {
    sets = upsetjs$x$sets
    gen = generateCombinationsImpl(sets, set_f, min, max, empty, order.by, limit, symbol)
  } else {
    # proxy
    c_type = if (set_f == intersect) "intersection" else "union"
    gen = cleanNull(list(type=c_type, min=min, max=max, empty=empty, order=order.by, limit=limit))
  }
  setProperty(upsetjs, 'combinations', gen)
}
#'
#' configure the generation of the intersections
#' @param upsetjs the upsetjs (proxy) instance
#' @param min minimum number of sets in an intersection
#' @param max maximum number of sets in an intersection
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by cardinality, degree, name or a combination of it
#' @param limit limit the number of intersections to the top N
#' @return upsetjs
#'
#' @export
generateIntersections = function(upsetjs, min=0, max=NULL, empty=FALSE, order.by="cardinality", limit=NULL) {
  generateCombinations(upsetjs, intersect, min, max, empty, order.by, limit)
}

#'
#' configure the generatation of the unions
#' @param min minimum number of sets in an union
#' @param max maximum number of sets in an union
#' @param empty whether to include empty intersections or not
#' @param upsetjs the upsetjs (proxy) instance
#' @param order.by order intersections by cardinality, degree, name or a combination of it
#' @param limit limit the number of intersections to the top N
#' @return upsetjs
#'
#' @export
generateUnions = function(upsetjs, min=0, max=NULL, empty=FALSE, order.by="cardinality", limit=NULL) {
  generateCombinations(upsetjs, union, min, max, empty, order.by, limit)
}
