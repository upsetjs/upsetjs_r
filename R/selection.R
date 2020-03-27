

#'
#' sets the selection of the chart
#' @param upsetjs the upsetjs (proxy) instance
#' @param name the selection to set
#'
#' @export
setSelection = function(upsetjs, name=NULL) {
  setProperty(upsetjs, "selection", name)
}

#'
#' interactive
#' @param upsetjs the upsetjs (proxy) instance
#' @param value whether to enable or disable
#'
#' @export
interactiveChart = function(upsetjs, value=TRUE) {
  setProperty(upsetjs, "interactive", value)
}
