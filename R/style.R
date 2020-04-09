
#'
#' specify the chart layout
#' @param upsetjs the upsetjs (proxy) instance
#' @param height.ratios a vector of length 2 for the ratios between the combination and set plot, e.g. c(0.6, 0.4)
#' @param width.ratios a vector of length 3 for the ratios between set, label, and combination plot, e.g. c(0.3,0.2,0.5)
#' @param padding padding around the plot
#' @param bar.padding padding ratio (default 0.1) for the bar charts
#' @param dot.padding padding facotr (default 0.7) for the dots
#' @return upsetjs
#'
#' @export
chartLayout = function(upsetjs,
                       height.ratios=NULL,
                       width.ratios=NULL,
                       padding=NULL,
                       bar.padding=NULL,
                       dot.padding=NULL) {
  props = list(heightRatios=height.ratios,
               widthRatios=width.ratios,
               padding=padding,
               barPadding=bar.padding,
               dotPadding=dot.padding,
               )
  setProperties(upsetjs, props, clean=TRUE)
}

#'
#' specify chart labels
#' @param upsetjs the upsetjs (proxy) instance
#' @param combinations.y.label the label for the combination chart
#' @param combinations.y.axis.offset the offset of the combination label from the axis in pixel
#' @param sets.x.label the label for the set chart
#' @param sets.x.axis.offset the offset of the set label from the axis in pixel
#' @param bar.label.offset the offset of the bar label from the bar in pixel
#' @return upsetjs
#'
#' @export
chartLabels = function(upsetjs,
                       combinations.y.label=NULL,
                       combinations.y.axis.offset=NULL,
                       sets.x.label=NULL,
                       sets.x.axis.offset=NULL,
                       bar.label.offset=NULL) {
  props = list(setName=sets.x.label,
               combinationName=combinations.y.label,
               combinationNameAxisOffset=combinations.y.axis.offset,
               barLabelOffset=bar.label.offset,
               setNameAxisOffset=sets.x.axis.offset
               )
  setProperties(upsetjs, props, clean=TRUE)
}

#'
#' specify chart font sizes
#' @param upsetjs the upsetjs (proxy) instance
#' @param font.family specify the font family to render
#' @param chart.label font size of the chart label, default: 16px
#' @param set.label font size of the set label, default: 10px
#' @param axis.tick font size of the axis tick, default: 16px
#' @param bar.label font size of the bar label, default: 10px
#' @param legend font size of the legend label, default: 10px
#' @return upsetjs
#'
#' @export
chartFontSizes = function(upsetjs,
                          font.family=NULL,
                          chart.label=NULL,
                          set.label=NULL,
                          axis.tick=NULL,
                          bar.label=NULL,
                          legend=NULL) {
  font.sizes = list(
    chartLabel=chart.label,
    axisTick=axis.tick,
    setLabel=set.label,
    barLabel=bar.label,
    legend=legend
  )
  props = list(fontFamily=font.family,
               fontSizes=cleanNull(font.sizes)
               )
  setProperties(upsetjs, props, clean=TRUE)
}


#'
#' specify chart flags
#' @param upsetjs the upsetjs (proxy) instance
#' @param query.legend show query legend if needed
#' @param export.buttons show export SVG and PNG buttons
#' @param class.name extra CSS class name to the root element
#' @return upsetjs
#'
#' @export
chartStyleFlags = function(upsetjs,
                           query.legend=NULL,
                           export.buttons=NULL,
                           class.name=NULL) {
  props = list(queryLegend=query.legend,
               exportButtons=export.buttons,
               className=class.name
               )
  setProperties(upsetjs, props, clean=TRUE)
}


#'
#' specify theming options
#' @param upsetjs the upsetjs (proxy) instance
#' @param theme theme to use 'dark' or 'light'
#' @param color main bar color
#' @param text.color main text color
#' @param hover.hint.color color of the hover hint
#' @param not.member.color color of the dot if not a member
#' @param selection.color selection color
#' @param alternating.color alternating background color
#' @return upsetjs
#'
#' @export
chartTheme = function(upsetjs,
                      theme=NULL,
                      selection.color=NULL,
                      alternating.color=NULL,
                      color=NULL,
                      text.color=NULL,
                      hover.hint.color=NULL,
                      not.member.color=NULL) {
  props = list(theme=theme,
               selectionColor=selection.color,
               alternatingBackgroundColor=alternating.color,
               color=color,
               textColor=text.color,
               hoverHintColor=hover.hint.color,
               notMemberColor=not.member.color
               )
  setProperties(upsetjs, props, clean=TRUE)
}
