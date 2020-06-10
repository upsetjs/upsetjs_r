#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
#


sortSets = function(sets, order.by='cardinality', limit=NULL) {
  set_attr = function(order.by.attr) {
    if (order.by.attr == 'cardinality') {
      sapply(sets, function (x) if (length(x$elems) == 0) x$cardinality * -1 else length(x$elems) * -1)
    } else if (order.by.attr == 'degree') {
      sapply(sets, function (x) length(x$setNames))
    } else {
      sapply(sets, function (x) x$name)
    }
  }

  if (order.by[1] == 'cardinality') {
    order.by = c('cardinality', 'name')
  } else if (order.by[1] == 'degree') {
    order.by = c('degree', 'name')
  }
  values = lapply(order.by, set_attr)
  o = do.call(order, values)
  r = sets[o]
  if (is.null(limit) || length(r) <= limit) {
    r
  } else {
    r[1:limit]
  }
}

generateCombinationsImpl = function(sets, c_type, min, max, empty, order.by, limit, symbol="&") {
  combinations = list()
  set_f = if (c_type == "union") union else intersect
  distinct = (c_type == 'distinct')
  lsets = length(sets)
  all_indices = 1:lsets

  for(l in min:(if (is.null(max)) lsets else max)) {
    combos = combn(all_indices, l, simplify=F)
    for(combo in combos) {
      indices = unlist(combo)
      set_names = sapply(indices, function(i) sets[[i]]$name)
      if (length(indices) == 0) {
        elems = c()
      } else {
        elems = sets[[indices[1]]]$elems
        for (index in indices) {
          elems = set_f(elems, sets[[index]]$elems)
        }
      }
      if (distinct) {
        not_indices = setdiff(all_indices, indices)
        for (index in not_indices) {
          elems = setdiff(elems, sets[[index]]$elems)
        }
      }
      if (empty || length(elems) > 0) {
        combination = structure(
          list(name=paste(set_names, collapse=symbol), type=c_type, elems=elems, setNames=set_names),
          class="upsetjs_combination"
        )
        combinations = c(combinations, list(combination))
      }
    }
  }
  names(combinations) = NULL
  sortSets(combinations, order.by, limit)
}

#'
#' generates the sets from a lists object
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param value the list input value
#' @param order.by order intersections by cardinality or name
#' @param limit limit the ordered sets to the given limit
#' @param shared a crosstalk shared data frame
#' @param shared.mode whether on 'hover' or 'click' (default) is synced
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3)))
#'
#' @export
fromList = function(upsetjs, value, order.by="cardinality", limit=NULL, shared=NULL, shared.mode="click") {
  checkUpSetArgument(upsetjs)
  stopifnot(is.list(value))
  stopifnot(order.by == "cardinality" || order.by == "degree")
  stopifnot(is.null(limit) || (is.numeric(limit) && length(limit) == 1))
  stopifnot(shared.mode == "click" || shared.mode == "hover")

  elems = c()
  toSet = function(key, value) {
    elems <<- unique(c(elems, value))
    structure(
      list(name=key, elems=value),
      class="upsetjs_set"
    )
  }
  sets = mapply(toSet, key=names(value), value=value, SIMPLIFY=F)
  # list of list objects
  names(sets) = NULL
  names(elems) = NULL

  if (!is.null(shared)) {
     upsetjs = enableCrosstalk(upsetjs, shared, mode=shared.mode)
  }

  sets = sortSets(sets, order.by=order.by, limit=limit)
  gen = generateCombinationsImpl(sets, "intersection", 0, NULL, FALSE, order.by, NULL)
  setProperties(upsetjs, list(sets=sets, combinations=gen, elems=elems, attrs=list()))
}

#'
#' generates the sets from a lists object that contained the cardinalities of both sets and combinations (&)
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param value the expression list input
#' @param symbol the symbol how to split list names to get the sets
#' @param order.by order intersections by cardinality or name
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromExpression(list(a=3, b=2, `a&b`=2)))
#'
#' @export
fromExpression = function(upsetjs, value, symbol="&", order.by="cardinality") {
  checkUpSetArgument(upsetjs)
  stopifnot(is.list(value))
  stopifnot(order.by == "cardinality" || order.by == "degree")

  degrees = sapply(names(value), function (x) { length(unlist(strsplit(x, symbol))) })

  raw_combinations = value
  raw_sets = value[degrees == 1]

  toSet = function(key, value) {
    structure(
      list(name=key, type="set", elems=c(), cardinality=value),
      class="upsetjs_set"
    )
  }
  sets = mapply(toSet, key=names(raw_sets), value=raw_sets, SIMPLIFY=F)
  names(sets) = NULL
  sets = sortSets(sets, order.by=order.by)

  toCombination = function(key, value) {
    structure(
      list(name=key, type="composite", elems=c(), cardinality=value, setNames=unlist(strsplit(key, symbol))),
      class="upsetjs_combination"
    )
  }
  combinations = mapply(toCombination, key=names(raw_combinations), value=raw_combinations, SIMPLIFY=F)
  names(combinations) = NULL
  combinations = sortSets(combinations, order.by=order.by)

  props = list(sets=sets, combinations=combinations, elems=c(), attrs=list())
  setProperties(upsetjs, props)
}


#'
#' extract the sets from a data frame (rows = elems, columns = sets, cell = contained)
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param df the data.frame like structure
#' @param attributes the optional column list or data frame
#' @param order.by order intersections by cardinality or degree
#' @param limit limit the ordered sets to the given limit
#' @param shared a crosstalk shared data frame
#' @param shared.mode whether on 'hover' or 'click' (default) is synced
#' @return the object given as first argument
#' @examples
#' df <- as.data.frame(list(a=c(1, 1, 1),b=c(0, 1, 1)),row.names=c('a', 'b', 'c'))
#' upsetjs() %>% fromDataFrame(df)
#'
#' @export
fromDataFrame = function(upsetjs, df, attributes=NULL, order.by="cardinality", limit=NULL, shared=NULL, shared.mode="click") {
  checkUpSetArgument(upsetjs)
  stopifnot(is.data.frame(df))
  stopifnot((is.null(attributes) || is.data.frame(attributes) || is.list(attributes) || is.character(attributes)))
  stopifnot(order.by == "cardinality" || order.by == "degree")
  stopifnottype('limit', limit)
  stopifnot(shared.mode == "click" || shared.mode == "hover")

  elems = rownames(df)
  toSet = function(key) {
    sub = elems[df[[key]] == T]
    structure(
      list(name=key, type="set", elems=sub),
      class="upsetjs_set"
    )
  }

  set_names = setdiff(colnames(df), if (is.character(attributes)) attributes else c())
  sets = lapply(set_names, toSet)

  if (!is.null(shared)) {
    upsetjs = enableCrosstalk(upsetjs, shared, mode=shared.mode)
  } else {
    upsetjs = enableCrosstalk(upsetjs, df, mode=shared.mode)
  }

  sets = sortSets(sets, order.by=order.by, limit=limit)
  gen = generateCombinationsImpl(sets, "intersection", 0, NULL, FALSE, order.by, NULL)
  props = list(sets=sets, combinations=gen, elems=elems)

  if(!is.null(attributes)) {
    attr_df = if (is.character(attributes)) df[,attributes] else attributes
    props$attrs = attr_df
  }

  setProperties(upsetjs, props)
}


#'
#' extract the vector of elements
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @return vector of elements
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% getElements()
#'
#' @export
getElements = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs'))
  upsetjs$x$elems
}

#'
#' extract the vector of sets
#' @param upsetjs an object of class \code{upsetjs}
#' @return vector of sets
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% getSets()
#'
#' @export
getSets = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs'))
  upsetjs$x$sets
}

#'
#' extract the vector of combinations
#' @param upsetjs an object of class \code{upsetjs}
#' @return vector of sets
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% getCombinations()
#'
#' @export
getCombinations = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs'))
  upsetjs$x$combinations
}

generateCombinations = function(upsetjs, c_type, min, max, empty, order.by, limit, symbol = '&') {
  checkUpSetArgument(upsetjs)
  stopifnot(is.numeric(min), length(min) == 1)
  stopifnottype('max', max)
  stopifnot(is.logical(empty), length(empty) == 1)
  stopifnot(is.character(order.by), length(order.by) >= 1)
  stopifnot(is.null(limit) || (is.numeric(limit) && length(limit) == 1))

  if(inherits(upsetjs, 'upsetjs')) {
    sets = upsetjs$x$sets
    gen = generateCombinationsImpl(sets, c_type, min, max, empty, order.by, limit, symbol)
  } else {
    # proxy
    gen = cleanNull(list(type=c_type, min=min, max=max, empty=empty, order=order.by, limit=limit))
  }
  setProperty(upsetjs, 'combinations', gen)
}
#'
#' configure the generation of the intersections
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param min minimum number of sets in an intersection
#' @param max maximum number of sets in an intersection
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by cardinality, degree, name or a combination of it
#' @param limit limit the number of intersections to the top N
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% generateIntersections(min=2)
#'
#' @export
generateIntersections = function(upsetjs, min=0, max=NULL, empty=FALSE, order.by="cardinality", limit=NULL) {
  generateCombinations(upsetjs, "intersection", min, max, empty, order.by, limit)
}
#'
#' configure the generation of the distinct intersections
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param min minimum number of sets in an intersection
#' @param max maximum number of sets in an intersection
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by cardinality, degree, name or a combination of it
#' @param limit limit the number of intersections to the top N
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% generateDistinctIntersections(min=2)
#'
#' @export
generateDistinctIntersections = function(upsetjs, min=0, max=NULL, empty=FALSE, order.by="cardinality", limit=NULL) {
  generateCombinations(upsetjs, "distinct", min, max, empty, order.by, limit)
}

#'
#' configure the generation of the unions
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param min minimum number of sets in an union
#' @param max maximum number of sets in an union
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by cardinality, degree, name or a combination of it
#' @param limit limit the number of intersections to the top N
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% generateUnions()
#'
#' @export
generateUnions = function(upsetjs, min=0, max=NULL, empty=FALSE, order.by="cardinality", limit=NULL) {
  generateCombinations(upsetjs, "union", min, max, empty, order.by, limit)
}
