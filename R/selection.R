#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#



#'
#' sets the selection of the chart
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param name the name of the set to select or a list with name and type
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   setSelection("b")
#' @export
setSelection <- function(upsetjs, name = NULL) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.null(name) ||
    (is.character(name) && length(name) >= 1) ||
    (is.list(name) && "name" %in% names(name) && "type" %in% names(name)))

  # NULL won't be transmitted
  if (is.null(name)) {
    setProperty(upsetjs, "selection", "")
  } else {
    setProperty(upsetjs, "selection", name)
  }
}

#'
#' make it an interactive chart
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param value whether to enable or disable or set the mode: hover, click, contextMenu
#' @param events_nonce whether to enable send a unique once (event date) for each event to prevent deduplication
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   interactiveChart()
#' @export
interactiveChart <- function(upsetjs, value = TRUE, events_nonce = FALSE) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.logical(value) || (value %in% c("hover", "click", "contextMenu")), length(value) == 1)

  setProperties(
    upsetjs,
    list(
      interactive = value,
      events_nonce = events_nonce
    )
  )
}
