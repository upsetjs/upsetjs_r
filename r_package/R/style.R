#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
#


#'
#' specify the chart layout
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param height.ratios a vector of length 2 for the ratios between the combination and set plot, e.g. c(0.6, 0.4)
#' @param width.ratios a vector of length 3 for the ratios between set, label, and combination plot, e.g. c(0.3,0.2,0.5)
#' @param padding padding around the plot
#' @param bar.padding padding ratio (default 0.1) for the bar charts
#' @param dot.padding padding factor (default 0.7) for the dots
#' @param numerical.scale numerical scale: linear (default) or log
#' @param band.scale band scale: band (default)
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartLayout(width.ratios=c(0.4, 0.2, 0.4))
#'
#' @export
chartLayout = function(upsetjs,
                       height.ratios = NULL,
                       width.ratios = NULL,
                       padding = NULL,
                       bar.padding = NULL,
                       dot.padding = NULL,
                       numerical.scale = NULL,
                       band.scale = NULL) {
  checkUpSetArgument(upsetjs)
  stopifnot(is.null(height.ratios) ||
              (is.numeric(height.ratios) &&
                 length(height.ratios) == 2))
  stopifnot(is.null(width.ratios) ||
              (is.numeric(width.ratios) &&
                 length(width.ratios) == 3))
  stopifnottype('padding', padding)
  stopifnottype('bar.padding', bar.padding)
  stopifnottype('dot.padding', dot.padding)
  stopifnot(
    is.null(numerical.scale) ||
      (numerical.scale == 'linear' || numerical.scale == 'log')
  )
  stopifnot(is.null(band.scale) || band.scale == 'band')


  props = list(
    heightRatios = height.ratios,
    widthRatios = width.ratios,
    padding = padding,
    barPadding = bar.padding,
    dotPadding = dot.padding,
    numericalScale = numerical.scale,
    bandScale = band.scale
  )
  setProperties(upsetjs, props, clean = TRUE)
}

#'
#' specify the chart venn layout
#' @param upsetjs an object of class \code{upsetjs_venn} or \code{upsetjs_venn_proxy}
#' @param padding padding around the plot
#' @return the object given as first argument
#' @examples
#' upsetjsVennDiagram() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartVennLayout(padding=10)
#'
#' @export
chartVennLayout = function(upsetjs,
                           padding = NULL) {
  checkVennDiagramArgument(upsetjs)
  stopifnottype('padding', padding)

  props = list(padding = padding)
  setProperties(upsetjs, props, clean = TRUE)
}

#'
#' specify the chart karnaugh map layout
#' @param upsetjs an object of class \code{upsetjs_kmap} or \code{upsetjs_kmap_proxy}
#' @param padding padding around the plot
#' @param numerical.scale numerical scale: linear (default) or log
#' @param bar.padding padding ratio (default 0.1) for the bar charts
#' @return the object given as first argument
#' @examples
#' upsetjsKarnaughMap() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartKarnaughMapLayout(padding=10)
#'
#' @export
chartKarnaughMapLayout = function(upsetjs,
                           padding = NULL,
                           bar.padding = NULL,
                           numerical.scale = NULL) {
  checkKarnaughMapArgument(upsetjs)
  stopifnottype('padding', padding)
  stopifnottype('bar.padding', bar.padding)
  stopifnot(
    is.null(numerical.scale) ||
      (numerical.scale == 'linear' || numerical.scale == 'log')
  )

  props = list(padding = padding,
               numericalScale = numerical.scale,
               barPadding = bar.padding)
  setProperties(upsetjs, props, clean = TRUE)
}

#'
#' specify chart labels
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param title the chart title
#' @param description the chart description
#' @param combination.name the label for the combination chart
#' @param combination.name.axis.offset the offset of the combination label from the axis in pixel
#' @param set.name the label for the set chart
#' @param set.name.axis.offset the offset of the set label from the axis in pixel
#' @param bar.label.offset the offset of the bar label from the bar in pixel
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartLabels(set.name="Test")
#'
#' @export
chartLabels = function(upsetjs,
                       title = NULL,
                       description = NULL,
                       combination.name = NULL,
                       combination.name.axis.offset = NULL,
                       set.name = NULL,
                       set.name.axis.offset = NULL,
                       bar.label.offset = NULL) {
  checkUpSetArgument(upsetjs)
  stopifnottype('title', title, is.character, 'string')
  stopifnottype('description', description, is.character, 'string')
  stopifnottype('combination.name',
                combination.name,
                is.character,
                'string')
  stopifnottype('combination.name.axis.offset',
                combination.name.axis.offset)
  stopifnottype('set.name', set.name, is.character, 'string')
  stopifnottype('set.name.axis.offset', set.name.axis.offset)
  stopifnottype('bar.label.offset', bar.label.offset)

  props = list(
    title = title,
    description = description,
    setName = set.name,
    combinationName = combination.name,
    combinationNameAxisOffset = combination.name.axis.offset,
    barLabelOffset = bar.label.offset,
    setNameAxisOffset = set.name.axis.offset
  )
  setProperties(upsetjs, props, clean = TRUE)
}

#'
#' specify chart labels
#' @param upsetjs an object of class \code{upsetjs_venn} or \code{upsetjs_venn_proxy}
#' @param title the chart title
#' @param description the chart description
#' @return the object given as first argument
#' @examples
#' upsetjsVennDiagram() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartVennLabels(title="Test")
#'
#' @export
chartVennLabels = function(upsetjs,
                           title = NULL,
                           description = NULL) {
  checkVennDiagramArgument(upsetjs)
  stopifnottype('title', title, is.character, 'string')
  stopifnottype('description', description, is.character, 'string')

  props = list(title = title,
               description = description)
  setProperties(upsetjs, props, clean = TRUE)
}

#'
#' specify chart labels
#' @param upsetjs an object of class \code{upsetjs_kamp} or \code{upsetjs_kmap_proxy}
#' @param title the chart title
#' @param description the chart description
#' @return the object given as first argument
#' @examples
#' upsetjsKanaughMap() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartKarnaughMapLabels(title="Test")
#'
#' @export
chartKarnaughMapLabels = function(upsetjs,
                           title = NULL,
                           description = NULL) {
  checkKanaughMapArgument(upsetjs)
  stopifnottype('title', title, is.character, 'string')
  stopifnottype('description', description, is.character, 'string')

  props = list(title = title,
               description = description)
  setProperties(upsetjs, props, clean = TRUE)
}

#'
#' specify chart font sizes
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param font.family specify the font family to render
#' @param chart.label font size of the chart label, default: 16px
#' @param set.label font size of the set label, default: 10px
#' @param axis.tick font size of the axis tick, default: 16px
#' @param bar.label font size of the bar label, default: 10px
#' @param legend font size of the legend label, default: 10px
#' @param title font size of the chart title, default: 24px
#' @param description font size of the chart description, default: 16px
#' @param export.label font size of the export label, default: 10px
#' @param value.label font size of the value label, (venn diagram only) default: 12px
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartFontSizes(font.family="serif")
#'
#' @export
chartFontSizes = function(upsetjs,
                          font.family = NULL,
                          chart.label = NULL,
                          set.label = NULL,
                          axis.tick = NULL,
                          bar.label = NULL,
                          legend = NULL,
                          title = NULL,
                          description = NULL,
                          export.label = NULL,
                          value.label = NULL) {
  checkUpSetCommonArgument(upsetjs)
  stopifnottype('font.family', font.family, is.character, 'string')
  stopifnottype('chart.label', chart.label, is.character, 'string')
  stopifnottype('set.label', set.label, is.character, 'string')
  stopifnottype('axis.tick', axis.tick, is.character, 'string')
  stopifnottype('bar.label', bar.label, is.character, 'string')
  stopifnottype('legend', legend, is.character, 'string')
  stopifnottype('title', title, is.character, 'string')
  stopifnottype('description', description, is.character, 'string')
  stopifnottype('export.label', export.label, is.character, 'string')
  stopifnottype('value.label', value.label, is.character, 'string')

  font.sizes = list(
    chartLabel = chart.label,
    axisTick = axis.tick,
    setLabel = set.label,
    barLabel = bar.label,
    legend = legend,
    title = title,
    description = description,
    exportLabel = export.label,
    valueLabel = value.label
  )
  props = list(fontFamily = font.family,
               fontSizes = cleanNull(font.sizes))
  setProperties(upsetjs, props, clean = TRUE)
}


#'
#' specify chart flags
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param id the optional HTML ID
#' @param export.buttons show export SVG and PNG buttons
#' @param class.name extra CSS class name to the root element
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartStyleFlags(id="test")
#'
#' @export
chartStyleFlags = function(upsetjs,
                           id = NULL,
                           export.buttons = NULL,
                           class.name = NULL) {
  checkUpSetCommonArgument(upsetjs)
  stopifnottype('export.buttons', export.buttons, is.logical, 'boolean')
  stopifnottype('class.name', class.name, is.character, 'string')
  stopifnottype('id', id, is.character, 'string')

  props = list(exportButtons = export.buttons,
               className = class.name)
  setProperties(upsetjs, props, clean = TRUE)
}


#'
#' specify theming options
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param theme theme to use 'dark' or 'light'
#' @param color main bar color
#' @param has.selection.color main color used when a selection is present
#' @param opacity main bar opacity
#' @param has.selection.opacity main opacity used when a selection is present
#' @param text.color main text color
#' @param hover.hint.color color of the hover hint
#' @param not.member.color color of the dot if not a member
#' @param selection.color selection color
#' @param alternating.color alternating background color
#' @param value.text.color value text color (venn diagram only)
#' @param stroke.color circle stroke color (venn diagram and karnaugh map only)
#' @param filled enforce filled circles (venn diagram only)
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartTheme(theme="dark")
#'
#' @export
chartTheme = function(upsetjs,
                      theme = NULL,
                      selection.color = NULL,
                      alternating.color = NULL,
                      color = NULL,
                      has.selection.color = NULL,
                      text.color = NULL,
                      hover.hint.color = NULL,
                      not.member.color = NULL,
                      value.text.color = NULL,
                      stroke.color = NULL,
                      has.selection.opacity = NULL,
                      opacity = NULL,
                      filled = NULL) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.null(theme) ||
              theme == 'light' ||
              theme == 'dark' || theme == 'vega')
  stopifnottype('selection.color', selection.color, is.character, 'string')
  stopifnottype('alternating.color',
                alternating.color,
                is.character,
                'string')
  stopifnottype('color', color, is.character, 'string')
  stopifnottype('has.selection.color',
                has.selection.color,
                is.character,
                'string')
  stopifnottype('text.color', text.color, is.character, 'string')
  stopifnottype('hover.hint.color',
                hover.hint.color,
                is.character,
                'string')
  stopifnottype('not.member.color',
                not.member.color,
                is.character,
                'string')
  stopifnottype('value.text.color',
                value.text.color,
                is.character,
                'string')
  stopifnottype('stroke.color', stroke.color, is.character, 'string')
  stopifnottype('opacity', opacity)
  stopifnottype('has.selection.opacity', has.selection.opacity)
  stopifnottype('filled', filled, is.logical, 'logical')

  props = list(
    theme = theme,
    selectionColor = selection.color,
    alternatingBackgroundColor = alternating.color,
    color = color,
    hasSelectionColor = has.selection.color,
    textColor = text.color,
    hoverHintColor = hover.hint.color,
    notMemberColor = not.member.color,
    valueTextColor = value.text.color,
    strokeColor = stroke.color,
    opacity = opacity,
    hasSelectionOpacity = has.selection.opacity,
    filled = filled
  )
  setProperties(upsetjs, props, clean = TRUE)
}

#'
#' generic set chart props
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param ... all upsetjs properties in R name notation
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% chartProps(theme="dark")
#'
#' @export
chartProps = function(upsetjs,
                      ...) {
  props = list(...)
  names(props) = gsub('\\.([a-z])', '\\U\\1', names(props), perl = TRUE)
  setProperties(upsetjs, props, clean = TRUE)
}
