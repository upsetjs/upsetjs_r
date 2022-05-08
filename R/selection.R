#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#



#'
#' sets the selection of the chart
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param name the name of the set to select
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   setSelection("b")
#' @export
setSelection <- function(upsetjs, name = NULL) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.null(name) ||
    (is.character(name) && length(name) >= 1))

  # NULL won't be transmitted
  setProperty(upsetjs, "selection", ifelse(is.null(name), '', name))
}

#'
#' make it an interactive chart
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param value whether to enable or disable or set the mode: hover, click, contextMenu
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   interactiveChart()
#' @export
interactiveChart <- function(upsetjs, value = TRUE) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.logical(value) || (value %in% c("hover", "click", "contextMenu")), length(value) == 1)

  setProperty(upsetjs, "interactive", value)
}
