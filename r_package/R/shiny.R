#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#


#' Output and render functions for using UpSet.js within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'800px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param height see width
#' @importFrom htmlwidgets shinyWidgetOutput
#' @return An output or render function that enables the use of the widget
#'   within Shiny applications.
#'
#' @export
upsetjsOutput = function(outputId,
                         width = '100%',
                         height = '400px') {
  htmlwidgets::shinyWidgetOutput(outputId, 'upsetjs', width, height, 'upsetjs')
}

#' Shiny render bindings for upsetjs
#'
#' @param expr An expression that generates an upset
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#' @importFrom htmlwidgets shinyRenderWidget
#' @return The output of shinyRenderWidget function
#'
#' @export
renderUpsetjs = function(expr,
                         env = parent.frame(),
                         quoted = FALSE) {
  if (!quoted) {
    expr = substitute(expr)
  } # force quoted
  htmlwidgets::shinyRenderWidget(expr, upsetjsOutput, env, quoted = TRUE)
}
