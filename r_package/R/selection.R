

#'
#' sets the selection of the chart
#' @param upsetjs the upsetjs (proxy) instance
#' @param name the name of the set to select
#' @return upsetjs
#'
#' @export
setSelection = function(upsetjs, name=NULL) {
  stopifnotupset(upsetjs)
  stopifnot(is.character(value), length(name) >= 1)

  setProperty(upsetjs, "selection", name)
}

#'
#' make it an interactive chart
#' @param upsetjs the upsetjs (proxy) instance
#' @param value whether to enable or disable
#' @return upsetjs
#'
#' @export
interactiveChart = function(upsetjs, value=TRUE) {
  stopifnotupset(upsetjs)
  stopifnot(is.logical(value), length(value) == 1)

  setProperty(upsetjs, "interactive", value)
}
