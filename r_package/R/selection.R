

#'
#' sets the selection of the chart
#' @param upsetjs the upsetjs (proxy) instance
#' @param name the name of the set to select
#' @return upsetjs
#'
#' @export
setSelection = function(upsetjs, name=NULL) {
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
  setProperty(upsetjs, "interactive", value)
}
