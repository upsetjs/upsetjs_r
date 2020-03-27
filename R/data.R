
sortSets = function(sets, order.by='cardinality', limit=NULL) {
  if (order.by == 'cardinality') {
    o = order(sapply(sets, function (x) { x$cardinality }), decreasing=T)
  } else if (order.by == 'degree') {
    o = order(sapply(sets, function (x) { x$degree }), decreasing=T)
  }
  r = sets[o]
  if (is.null(limit)) {
    r
  } else {
    r[1:limit]
  }
}

#'
#' generates the sets from a lists object
#' @param upsetjs the upsetjs (proxy) instance
#' @param value the list input value
#' @param order.by order intersections by cardinality or degree
#' @param limit limit the ordered sets to the given limit
#'
#' @export
fromList = function(upsetjs, value, order.by="cardinality", limit=NULL) {
  toSet = function(key, value) {
    list(name=key, elems=value, cardinality=length(value))
  }
  sets = mapply(toSet, key=names(value), value=value, SIMPLIFY=F)
  # list of list objects
  names(sets) = NULL

  sets = sortSets(sets, order.by=order.by, limit=limit)
  setProperties(upsetjs, list(sets=sets, combinations=list(type="intersection", order=order.by)))
}

#'
#' generates the sets from a lists object that contained the cardinalties of both sets and combinations (&)
#' @param upsetjs the upsetjs (proxy) instance
#' @param value the expression list input
#' @param symbol the symbol how to split list names to get the sets
#' @param order.by order intersections by cardinality or degree
#'
#' @export
fromExpression = function(upsetjs, value, symbol="&", order.by="cardinality") {
  degrees = sapply(names(value), function (x) { length(unlist(strsplit(x, symbol))) })

  combinations = value
  sets = value[degrees == 1]

  toSet = function(key, value) {
    list(name=key, elems=c(), cardinality=value)
  }
  sets = mapply(toSet, key=names(sets), value=sets, SIMPLIFY=F)
  names(sets) = NULL
  sets = sortSets(sets, order.by=order.by)

  toCombination = function(key, value, degree) {
    list(name=key, elems=c(), cardinality=value, degree=degree, setNames=unlist(strsplit(key, symbol)))
  }
  combinations = mapply(toCombination, key=names(combinations), value=combinations, degree=degrees, SIMPLIFY=F)
  names(combinations) = NULL
  combinations = sortSets(combinations, order.by=order.by)

  props = list(sets = sets, combinations = combinations)
  setProperties(upsetjs, props)
}


#'
#' extract the sets from a data frame (rows = elems, columns = sets, cell = contained)
#' @param upsetjs the upsetjs (proxy) instance
#' @param df the data.frame like structure
#' @param order.by order intersections by cardinality or degree
#' @param limit limit the ordered sets to the given limit
#'
#' @export
fromDataFrame = function(upsetjs, df, order.by="cardinality", limit=NULL) {
  elems = rownames(df)
  toSet = function(key) {
    sub = elems[df[[key]] == T]
    list(name=key, elems=sub, cardinality=length(sub))
  }
  sets = lapply(colnames(df), toSet)

  sets = sortSets(sets, order.by=order.by, limit=limit)
  setProperties(upsetjs, list(sets=sets, combinations=list(type="intersection", order=order.by)))
}

#'
#' generate intersections
#' @param upsetjs the upsetjs (proxy) instance
#' @param min minimum number of sets in an intersection
#' @param max maximum number of sets in an intersection
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by cardinality or degree
#' @param limit limit the number of intersections to the top N
#'
#' @export
generateIntersections = function(upsetjs, min=NULL, max=NULL, empty=NULL, order.by="cardinality", limit=NULL) {
  gen = list(type="intersection", min=min, max=max, empty=empty, order=order.by, limit=limit)
  setProperty(upsetjs, 'combinations', cleanNull(gen))
}

#'
#' generate unions
#' @param min minimum number of sets in an union
#' @param max maximum number of sets in an union
#' @param upsetjs the upsetjs (proxy) instance
#' @param order.by order intersections by cardinality or degree
#' @param limit limit the number of intersections to the top N
#'
#' @export
generateUnions = function(upsetjs, min=NULL, max=NULL, order.by="cardinality", limit=NULL) {
  gen = list(type="union", min=min, max=max, order=order.by, limit=limit)
  setProperty(upsetjs, 'combinations', cleanNull(gen))
}
