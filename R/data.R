
sortSets = function(sets, order.by = 'freq') {
  if (order.by == 'freq') {
    o = order(sapply(sets, function (x) { x$cardinality }), decreasing=T)
  } else if (order.by == 'degree') {
    o = order(sapply(sets, function (x) { x$degree }), decreasing=T)
  }
  sets[o]
}

#'
#' generates the sets from a lists object
#' @param upsetjs the upsetjs (proxy) instance
#' @param value the list input value
#' @param order.by order intersections by frequency (freq) or degree (deg)
#'
#' @export
fromList = function(upsetjs, value, order.by = "freq") {
  toSet = function(key, value) {
    list(name=key, elems=value, cardinality=length(value))
  }
  sets = mapply(toSet, key=names(value), value=value, SIMPLIFY=F)
  # list of list objects
  names(sets) = NULL

  sets = sortSets(sets, order.by = order.by)
  setProperties(upsetjs, list(sets=sets, combinations=list(mode="intersections", order=order.by)))
}

#'
#' generates the sets from a lists object that contained the cardinalties of both sets and combinations (&)
#' @param upsetjs the upsetjs (proxy) instance
#' @param value the expression list input
#' @param symbol the symbol how to split list names to get the sets
#' @param order.by order intersections by frequency (freq) or degree (deg)
#'
#' @export
fromExpression = function(upsetjs, value, symbol = "&", order.by = "freq") {
  degrees = sapply(names(value), function (x) { length(unlist(strsplit(x, symbol))) })

  combinations = value
  sets = value[degrees == 1]

  toSet = function(key, value) {
    list(name=key, elems=c(), cardinality=value)
  }
  sets = mapply(toSet, key=names(sets), value=sets, SIMPLIFY=F)
  names(sets) = NULL
  sets = sortSets(sets, order.by = order.by)

  toCombination = function(key, value, degree) {
    list(name=key, elems=c(), cardinality=value, degree=degree, setNames=unlist(strsplit(key, symbol)))
  }
  combinations = mapply(toCombination, key=names(combinations), value=combinations, degree=degrees, SIMPLIFY=F)
  names(combinations) = NULL
  combinations = sortSets(combinations, order.by = order.by)

  props = list(sets = sets, combinations = combinations)
  setProperties(upsetjs, props)
}


#'
#' extract the sets from a data frame (rows = elems, columns = sets, cell = contained)
#' @param upsetjs the upsetjs (proxy) instance
#' @param df the data.frame like structure
#' @param order.by order intersections by frequency (freq) or degree (deg)
#'
#' @export
fromDataFrame = function(upsetjs, df, order.by = "freq") {
  elems = rownames(df)
  toSet = function(key) {
    sub = elems[df[[key]] == T]
    list(name=key, elems=sub, cardinality=length(sub))
  }
  sets = lapply(colnames(df), toSet)

  sets = sortSets(sets, order.by = order.by)
  setProperties(upsetjs, list(sets=sets, combinations=list(mode="intersections", order=order.by)))
}

#'
#' generate intersections
#' @param upsetjs the upsetjs (proxy) instance
#' @param min minimum number of sets in an intersection
#' @param max maximum number of sets in an intersection
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by frequency (freq) or degree (deg)
#' @param limit limit the number of intersections to the top N
#'
#' @export
generateIntersections = function(upsetjs, min=NULL, max=NULL, empty=NULL, order.by = "freq", limit=NULL) {
  gen = list(mode="intersection", min=min, max=max, empty=empty, order=order.by, limit=limit)
  setProperty(upsetjs, 'combinations', cleanNull(gen))
}

#'
#' generate unions
#' @param min minimum number of sets in an union
#' @param max maximum number of sets in an union
#' @param upsetjs the upsetjs (proxy) instance
#' @param order.by order intersections by frequency (freq) or degree (deg)
#' @param limit limit the number of intersections to the top N
#'
#' @export
generateUnions = function(upsetjs, min=NULL, max=NULL, order.by = "freq", limit=NULL) {
  gen = list(mode="union", min=min, max=max, order=order.by, limit=limit)
  setProperty(upsetjs, 'combinations', cleanNull(gen))
}
