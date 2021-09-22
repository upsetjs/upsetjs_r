#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#



#'
#' set the queries
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param queries the queries to set
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   setQueries(list(list(name = "Q1", color = "red", set = "b")))
#' @export
setQueries <- function(upsetjs, queries = list()) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.list(queries))
  setProperty(upsetjs, "queries", queries)
}

#'
#' adds a new query to the plot
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param name name of the query
#' @param color color of the query
#' @param elems the list of elems to highlight
#' @param set the set name, similar to the selection
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   addQuery(name = "Q1", color = "red", set = "b")
#' @export
addQuery <- function(upsetjs,
                     name,
                     color,
                     elems = NULL,
                     set = NULL) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.character(name), length(name) == 1)
  stopifnot(is.character(color), length(color) == 1)
  stopifnot((is.character(set) &&
    length(set) >= 1) || is.vector(elems))

  appendProperty(upsetjs, "queries", cleanNull(list(
    name = name,
    color = color,
    elems = elems,
    set = set
  )))
}


#'
#' clears the list of queries for incremental updates
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   addQuery(name = "Q1", color = "red", set = "b") %>%
#'   clearQueries()
#' @export
clearQueries <- function(upsetjs) {
  checkUpSetCommonArgument(upsetjs)

  setProperty(upsetjs, "queries", NULL)
}


#'
#' renders a legend for the queries
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param value whether to enable or disable
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   addQuery(name = "Q1", color = "red", set = "b") %>%
#'   queryLegend(FALSE)
#' @export
queryLegend <- function(upsetjs, value = TRUE) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.logical(value), length(value) == 1)

  setProperty(upsetjs, "queryLegend", value)
}
