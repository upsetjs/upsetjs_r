
#' UpSetjs module
#'
#' a htmlwidget wrapper around UpSet.js (\url{https://upsetjs.netlify.com/})
#'


#' upsetjs sizing policy
#'
#' @export
#' @param defaultWidth defaults to \code{"100\%"} of the available width
#' @param defaultHeight defaults to 400px tall
#' @param padding defaults to 0px
#' @param browser.fill defaults to \code{TRUE}
#' @param ... all other arguments supplied to \code{htmlwidgets::\link[htmlwidgets]{sizingPolicy}}
#' @return An \code{htmlwidgets::sizingPolicy} object
upsetjsSizingPolicy = function(
  defaultWidth = "100%",
  defaultHeight = 400,
  padding = 0,
  browser.fill = TRUE,
  ...
  # not adding extra arguments as htmlwidgets::sizingPolicy can change their own args
) {
  htmlwidgets::sizingPolicy(
    defaultWidth = defaultWidth,
    defaultHeight = defaultHeight,
    padding = padding,
    browser.fill = browser.fill,
    ...
  )
}

#' upsetjs - factory for UpSet HTMLWidget
#'
#' @param sets TODO i.e. also crosstalk shared data frame
#' @param combinations TODO i.e. also crosstalk shared data frame
#' @param width width of the element
#' @param height height of the element
#' @param elementId unique element id
#' @param mode interaction mode either "hover" (default) or "click"
#' @param sizingPolicy htmlwidgets sizing policy object. Defaults to \code{\link{upsetjsSizingPolicy}()}
#'
#' @return html upsetjs widget
#'
#' @ example
#' @export
upsetjs = function(sets, combinations,
                   width = '100%',
                   height = NULL,
                   elementId = NULL,
                   mode = 'hover',
                   sizingPolicy = upsetjsSizingPolicy()) {
  if (crosstalk::is.SharedData(data)) {
    # using Crosstalk
    key = data$key()
    group = data$groupName()
    data = data$origData()
    dependencies = crosstalk::crosstalkLibs()
  } else {
    # Not using Crosstalk
    key = NULL
    group = NULL
    dependencies = c()
  }

  # forward options using x
  x = structure(
    crosstalk = list(key = key, group = group),
    mode = mode,
    options = list(),
  )

  htmlwidgets::createWidget(
    'upsetjs',
    x,
    width = width,
    height = height,
    package = 'upsetjs',
    elementId = elementId,
    sizingPolicy = sizingPolicy,
    dependencies = dependencies
  )
}

#'
#' @export
upsetjsProxy = function(outputId, session) {
  structure(
    list(
      session = session,
      id = session$ns(outputId),
      x = structure(
        list()
      )
    ),
    class = "upsetjs_proxy"
  )
}
