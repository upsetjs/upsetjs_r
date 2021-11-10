#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

#' upsetjs sizing policy
#'
#' @param defaultWidth defaults to \code{"100\%"} of the available width
#' @param defaultHeight defaults to 400px tall
#' @param padding defaults to 0px
#' @param browser.fill defaults to \code{TRUE}
#' @param ... all other arguments supplied to \code{htmlwidgets::\link[htmlwidgets]{sizingPolicy}}
#' @return An \code{htmlwidgets::sizingPolicy} object
#' @examples
#' upsetjs(sizingPolicy = upsetjsSizingPolicy(padding = 20)) %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3)))
#' @importFrom htmlwidgets sizingPolicy
#'
#' @export
upsetjsSizingPolicy <- function(defaultWidth = "100%",
                                defaultHeight = 400,
                                padding = 0,
                                browser.fill = TRUE,
                                ...) {
  # not adding extra arguments as htmlwidgets::sizingPolicy can change their own args) {
  htmlwidgets::sizingPolicy(
    defaultWidth = defaultWidth,
    defaultHeight = defaultHeight,
    padding = padding,
    browser.fill = browser.fill,
    ...
  )
}

#' upsetjs - factory for UpSet.js HTMLWidget
#'
#' @param width width of the element
#' @param height height of the element
#' @param elementId unique element id
#' @param sizingPolicy htmlwidgets sizing policy object. Defaults to \code{\link{upsetjsSizingPolicy}()}
#'
#' @return An object of class \code{upsetjs} and \code{htmlwidget}
#' @examples
#' upsetjs() %>% fromList(list(a = c(1, 2, 3), b = c(2, 3)))
#' @importFrom htmlwidgets createWidget
#' @export
upsetjs <- function(width = "100%",
                    height = NULL,
                    elementId = NULL,
                    sizingPolicy = upsetjsSizingPolicy()) {
  # forward options using x
  x <- structure(list(
    sets = c()
  ))

  dependencies <- c()

  r <- htmlwidgets::createWidget(
    "upsetjs",
    x,
    width = width,
    height = height,
    package = "upsetjs",
    elementId = elementId,
    sizingPolicy = sizingPolicy,
    dependencies = dependencies
  )
  class(r) <- c(class(r), "upsetjs_common", "upsetjs_upset")
  r
}

#'
#' reactive helper to update an upsetjs inplace
#' @param outputId the id of the upsetjs widget
#' @param session current shiny session
#' @return an object of class \code{upsetjs_proxy}
#' @examples
#' \dontrun{
#' upsetjsProxy("upsetjs1", session) %>% setSelection("a")
#' }
#' @export
upsetjsProxy <- function(outputId, session) {
  structure(
    list(
      session = session,
      id = session$ns(outputId),
      x = structure(list())
    ),
    class = c("upsetjs_proxy", "upsetjs_upset_proxy", "upsetjs_common_proxy")
  )
}


#' upsetjs - factory for UpSet.js Venn Diagram HTMLWidget
#'
#' @param width width of the element
#' @param height height of the element
#' @param elementId unique element id
#' @param sizingPolicy htmlwidgets sizing policy object. Defaults to \code{\link{upsetjsSizingPolicy}()}
#'
#' @return An object of class \code{upsetjs_venn} and \code{htmlwidget}
#' @examples
#' upsetjs() %>% fromList(list(a = c(1, 2, 3), b = c(2, 3)))
#' @importFrom htmlwidgets createWidget
#' @export
upsetjsVennDiagram <- function(width = "100%",
                               height = NULL,
                               elementId = NULL,
                               sizingPolicy = upsetjsSizingPolicy()) {
  # forward options using x
  x <- structure(list(
    renderMode = "venn",
    sets = c()
  ))

  dependencies <- c()

  r <- htmlwidgets::createWidget(
    "upsetjs",
    x,
    width = width,
    height = height,
    package = "upsetjs",
    elementId = elementId,
    sizingPolicy = sizingPolicy,
    dependencies = dependencies
  )
  class(r) <- c(class(r), "upsetjs_common", "upsetjs_venn")
  r
}

#'
#' reactive helper to update an upsetjs venn diagram in place
#' @param outputId the id of the upsetjs widget
#' @param session current shiny session
#' @return an object of class \code{upsetjs_proxy}
#' @examples
#' \dontrun{
#' upsetjsVennDiagramProxy("upsetjs1", session) %>% setSelection("a")
#' }
#' @export
upsetjsVennDiagramProxy <- function(outputId, session) {
  structure(
    list(
      session = session,
      id = session$ns(outputId),
      x = structure(list(renderMode = "venn"))
    ),
    class = c("upsetjs_proxy", "upsetjs_venn_proxy", "upsetjs_common_proxy")
  )
}


#' upsetjs - factory for UpSet.js Euler Diagram HTMLWidget
#'
#' @param width width of the element
#' @param height height of the element
#' @param elementId unique element id
#' @param sizingPolicy htmlwidgets sizing policy object. Defaults to \code{\link{upsetjsSizingPolicy}()}
#'
#' @return An object of class \code{upsetjs_venn} and \code{htmlwidget}
#' @examples
#' upsetjs() %>% fromList(list(a = c(1, 2, 3), b = c(2, 3)))
#' @importFrom htmlwidgets createWidget
#' @export
upsetjsEulerDiagram <- function(width = "100%",
                                height = NULL,
                                elementId = NULL,
                                sizingPolicy = upsetjsSizingPolicy()) {
  # forward options using x
  x <- structure(list(
    renderMode = "euler",
    sets = c()
  ))

  dependencies <- c()

  r <- htmlwidgets::createWidget(
    "upsetjs",
    x,
    width = width,
    height = height,
    package = "upsetjs",
    elementId = elementId,
    sizingPolicy = sizingPolicy,
    dependencies = dependencies
  )
  class(r) <- c(class(r), "upsetjs_common", "upsetjs_venn")
  r
}

#'
#' reactive helper to update an upsetjs euler diagram in place
#' @param outputId the id of the upsetjs widget
#' @param session current shiny session
#' @return an object of class \code{upsetjs_proxy}
#' @examples
#' \dontrun{
#' upsetjsEulerDiagramProxy("upsetjs1", session) %>% setSelection("a")
#' }
#' @export
upsetjsEulerDiagramProxy <- function(outputId, session) {
  structure(
    list(
      session = session,
      id = session$ns(outputId),
      x = structure(list(renderMode = "euler"))
    ),
    class = c("upsetjs_proxy", "upsetjs_venn_proxy", "upsetjs_common_proxy")
  )
}


#' upsetjs - factory for UpSet.js Karnaugh Map HTMLWidget
#'
#' @param width width of the element
#' @param height height of the element
#' @param elementId unique element id
#' @param sizingPolicy htmlwidgets sizing policy object. Defaults to \code{\link{upsetjsSizingPolicy}()}
#'
#' @return An object of class \code{upsetjs_venn} and \code{htmlwidget}
#' @examples
#' upsetjsKarnaughMap() %>% fromList(list(a = c(1, 2, 3), b = c(2, 3)))
#' @importFrom htmlwidgets createWidget
#' @export
upsetjsKarnaughMap <- function(width = "100%",
                               height = NULL,
                               elementId = NULL,
                               sizingPolicy = upsetjsSizingPolicy()) {
  # forward options using x
  x <- structure(list(
    renderMode = "kmap",
    sets = c()
  ))

  dependencies <- c()

  r <- htmlwidgets::createWidget(
    "upsetjs",
    x,
    width = width,
    height = height,
    package = "upsetjs",
    elementId = elementId,
    sizingPolicy = sizingPolicy,
    dependencies = dependencies
  )
  class(r) <- c(class(r), "upsetjs_common", "upsetjs_kmap")
  r
}

#'
#' reactive helper to update an upsetjs karnaugh map diagram in place
#' @param outputId the id of the upsetjs widget
#' @param session current shiny session
#' @return an object of class \code{upsetjs_proxy}
#' @examples
#' \dontrun{
#' upsetjsKarnaughMapProxy("upsetjs1", session) %>% setSelection("a")
#' }
#' @export
upsetjsKarnaughMapProxy <- function(outputId, session) {
  structure(
    list(
      session = session,
      id = session$ns(outputId),
      x = structure(list(renderMode = "kmap"))
    ),
    class = c("upsetjs_proxy", "upsetjs_kmap_proxy", "upsetjs_common_proxy")
  )
}
