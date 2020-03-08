
#'
#' specify the ratios between the intersection and set plot
#' @export
heightRatios = function(upsetjs, ratios) {
  setProperty(upsetjs, 'heightRatios', ratios)
}

#'
#' specify chart labels
#' @export
chartLabels = function(upsetjs, combinations.y.label = NULL, sets.x.label = NULL) {
  props = list(setName = sets.x.label, combinationName = combinations.y.label)
  props = props[!sapply(props, is.null)]
  setProperties(upsetjs, props)
}
