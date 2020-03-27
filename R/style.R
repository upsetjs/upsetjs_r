
#'
#' specify the chart layout
#' @param upsetjs the upsetjs (proxy) instance
#' @param height.ratios a vector of length 2 for the ratios between the combination and set plot, e.g. c(0.6, 0.4)
#' @param width.ratios a vector of length 3 for the ratios between set, label, and combination plot, e.g. c(0.3,0.2,0.5)
#' @param padding padding around the plot
#' @param bar.padding padding ratio (e.g., 0.2) for the bar charts
#' @export
chartLayout = function(upsetjs,
                      height.ratios=NULL,
                      width.ratios=NULL,
                      padding=NULL,
                      bar.padding=NULL) {
  props = list(heightRatios=height.ratios,
               widthRatios=width.ratios,
               padding=padding,
               barPadding=bar.padding
               )
  setProperties(upsetjs, props, clean=TRUE)
}

#'
#' specify chart labels
#' @param upsetjs the upsetjs (proxy) instance
#' @param combinations.y.label the label for the combination chart
#' @param sets.x.label the label for the set chart
#'
#' @export
chartLabels = function(upsetjs,
                       combinations.y.label=NULL,
                       sets.x.label=NULL) {
  props = list(setName=sets.x.label,
               combinationName=combinations.y.label
               )
  setProperties(upsetjs, props, clean=TRUE)
}
