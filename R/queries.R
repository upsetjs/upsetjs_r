

#'
#' set the queries
#' @param upsetjs the upsetjs (proxy) instance
#' @param queries the queries to set
#'
#' @export
setQueries = function(upsetjs, queries = list()) {
  setProperty(upsetjs, "queries", queries)
}

#'
#' adds a new query to the plot
#' @param upsetjs the upsetjs (proxy) instance
#' @param name name of the query
#' @param color color of the query
#' @param elems the list of elems to highlight
#' @param set the set name, similar to the selection
#'
#' @export
addQuery = function(upsetjs, name, color, elems = NULL, set = NULL) {
  appendProperty(upsetjs, "queries", cleanNull(list(name=name, color=color, elems=elems, set=set)))
}


#'
#' clears the list of queries for incremental updates
#' @param upsetjs the upsetjs (proxy) instance
#' @export
clearQueries = function(upsetjs) {
  setProperty(upsetjs, "queries", NULL)
}


#'
#' renders a legend for the queries
#' @param upsetjs the upsetjs (proxy) instance
#' @export
queryLegend = function(upsets, value=TRUE) {
  setProperty(upsetjs, "queryLegend", value)
}
