
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
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% labels(combinations.y.label = "Test")
#' @export
upsetjs = function(width = '100%',
                   height = NULL,
                   elementId = NULL,
                   sizingPolicy = upsetjsSizingPolicy()) {
  # forward options using x
  x = structure(
    list(
      mode = 'hover',
      sets = c()
    )
  )

  dependencies = c()

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
#' reactive helper to update an upsetjs inplace
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


# empty.intersections = "on"
# list(query = intersects, params = list("Drama", "Comedy", "Action"), color = "orange", active = T)


# sets = c("PTEN", "TP53", "EGFR", "PIK3R1", "RB1")
# mainbar.y.label = "Genre Intersections", sets.x.label = "Movies Per Genre",
# nsets

