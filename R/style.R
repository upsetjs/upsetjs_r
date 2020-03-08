
#'
#' specify the chart layout
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
  props = props[!sapply(props, is.null)]
  setProperties(upsetjs, props)
}

#'
#' specify chart labels
#' @export
chartLabels = function(upsetjs,
                       combinations.y.label = NULL,
                       sets.x.label = NULL) {
  props = list(setName = sets.x.label,
               combinationName = combinations.y.label
               )
  props = props[!sapply(props, is.null)]
  setProperties(upsetjs, props)
}
