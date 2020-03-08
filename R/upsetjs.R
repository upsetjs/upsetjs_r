
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
#' @param width width of the element
#' @param height height of the element
#' @param elementId unique element id
#' @param sizingPolicy htmlwidgets sizing policy object. Defaults to \code{\link{upsetjsSizingPolicy}()}
#'
#' @return html upsetjs widget
#'
#' @ example
#' @export
upsetjs = function(width = '100%',
                   height = NULL,
                   elementId = NULL,
                   sizingPolicy = upsetjsSizingPolicy()) {
  # forward options using x
  x = structure(
    mode = 'hover',
    sets = c(),
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

sendMessage = function(upsetjs_proxy, prop, value) {
  session = upsetjs_proxy$session
  id = upsetjs_proxy$id

  props = list()
  props[[prop]] = value

  msg = structure(
    list(
      id = id,
      props = props
    ),
    class = "upsetjs_msg"
  )

  session$sendCustomMessage("upsetjs-update"), msg)

  upsetjs_proxy
}

properySetter = function(prop) {
  function(upsetjs, value) {
    if (inherits(upsetjs, 'upsetjs')) {
      upsetjs$x[[prop]] = value
    } else if (inherits(upsetjs, 'upsetjs_proxy')) {
      sendMessage(upsetjs, prop, value)
    }
    upsetjs
  }
}

#'
#' @ export
# test =
