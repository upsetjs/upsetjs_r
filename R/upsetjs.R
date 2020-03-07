
#' UpSetjs module
#'
#' a htmlwidget wrapper around UpSet.js (\url{https://upsetjs.netlify.com/})
#'


.upsetjsDefaultOptions = list(
  mode = 'hover',
)

#' upsetjs - factory for UpSet HTMLWidget
#'
#' @param sets TODO i.e. also crosstalk shared data frame
#' @param combinations TODO i.e. also crosstalk shared data frame
#' @param width width of the element
#' @param height height of the element
#' @param elementId unique element id
#' @param options UpSet.js options
#'  \describe{
#'    \item{X}{desc (default: xx)}
#'  }
#' @param mode interaction mode either "hover" (default) or "click"
#' @param dependencies include crosstalk dependencies
#'
#' @return html upsetjs widget
#'
#' @examples
#'
#' @export
upsetjs = function(sets, combinations,
                  width = '100%',
                  height = NULL,
                  elementId = NULL,
                  mode = 'hover',
                  dependencies = crosstalk::crosstalkLibs()) {
  # extend with all the default options
  options = c(options, .upsetjsDefaultOptions[!(names(.upsetjsDefaultOptions) %in% names(options))])

  if (crosstalk::is.SharedData(data)) {
    # using Crosstalk
    key = data$key()
    group = data$groupName()
    data = data$origData()
  } else {
    # Not using Crosstalk
    key = NULL
    group = NULL

  # forward options using x
  x = list(
    crosstalk = list(key = key, group = group),
    mode = mode,
    options = options,
  )
  # create widget
  htmlwidgets::createWidget(
    name = 'upsetjs',
    x,
    width = width,
    height = height,
    package = 'upsetjs',
    elementId = elementId,
    dependencies = dependencies
  )
}

#' Shiny bindings for upsetjs
#'
#' Output and render functions for using UpSet.js within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'800px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#'
#' @name upsetjs-shiny
#'
#' @export
upsetjsOutput = function(outputId,
                        width = '100%',
                        height = '800px') {
  htmlwidgets::shinyWidgetOutput(outputId, 'upsetjs', width, height, package = 'upsetjs')
}

#' Shiny render bindings for upsetjs
#'
#' @param expr An expression that generates an upset
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @rdname upsetjs-shiny
#' @export
renderUpSetJS = function(expr,
                        env = parent.frame(),
                        quoted = FALSE) {
  if (!quoted) {
    expr = substitute(expr)
  } # force quoted
  htmlwidgets::shinyRenderWidget(expr, upsetjsOutput, env, quoted = TRUE)
}
