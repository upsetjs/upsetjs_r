#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
#



#'
#' set the queries
#' @param upsetjs the upsetjs (proxy) instance
#' @param queries the queries to set
#' @return upsetjs
#'
#' @export
setQueries = function(upsetjs, queries=list()) {
  checkUpSetArgument(upsetjs)
  stopifnot(is.list(queries))
  setProperty(upsetjs, "queries", queries)
}

#'
#' adds a new query to the plot
#' @param upsetjs the upsetjs (proxy) instance
#' @param name name of the query
#' @param color color of the query
#' @param elems the list of elems to highlight
#' @param set the set name, similar to the selection
#' @return upsetjs
#'
#' @export
addQuery = function(upsetjs, name, color, elems=NULL, set=NULL) {
  checkUpSetArgument(upsetjs)
  stopifnot(is.character(name), length(name) == 1)
  stopifnot(is.character(color), length(color) == 1)
  stopifnot((is.character(set) && length(set) >= 1) || is.vector(elems))

  appendProperty(upsetjs, "queries", cleanNull(list(name=name, color=color, elems=elems, set=set)))
}


#'
#' clears the list of queries for incremental updates
#' @param upsetjs the upsetjs (proxy) instance
#' @return upsetjs
#'
#' @export
clearQueries = function(upsetjs) {
  checkUpSetArgument(upsetjs)

  setProperty(upsetjs, "queries", NULL)
}


#'
#' renders a legend for the queries
#' @param upsetjs the upsetjs (proxy) instance
#' @param value whether to enable or disable
#' @return upsetjs
#'
#' @export
queryLegend = function(upsetjs, value=TRUE) {
  checkUpSetArgument(upsetjs)
  stopifnot(is.logical(value), length(value) == 1)

  setProperty(upsetjs, "queryLegend", value)
}
