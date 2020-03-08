
#'
#' specify the chart layout
#' @param upsetjs the upsetjs (proxy) instance
#'
#' @export
chartLayout = function(upsetjs,
                      height.ratios = NULL,
                      width.ratios = NULL,
                      padding = NULL,
                      bar.padding = NULL) {
  props = list(heightRatios = height.ratios,
               widthRatios = width.ratios,
               padding = padding,
               barPadding = bar.padding
               )
  setProperties(upsetjs, props, clean=TRUE)
}

#'
#' specify chart labels
#' @param upsetjs the upsetjs (proxy) instance
#'
#' @export
chartLabels = function(upsetjs,
                       combinations.y.label = NULL,
                       sets.x.label = NULL) {
  props = list(setName = sets.x.label,
               combinationName = combinations.y.label
               )
  setProperties(upsetjs, props, clean=TRUE)
}
