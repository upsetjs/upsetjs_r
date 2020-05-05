#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
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
#' upsetjs(sizingPolicy=upsetjsSizingPolicy(padding=20)) %>% fromList(list(a=c(1,2,3), b=c(2,3)))
#'
#' @export
upsetjsSizingPolicy = function(
  defaultWidth="100%",
  defaultHeight=400,
  padding=0,
  browser.fill=TRUE,
  ...
  # not adding extra arguments as htmlwidgets::sizingPolicy can change their own args
) {
  htmlwidgets::sizingPolicy(
    defaultWidth=defaultWidth,
    defaultHeight=defaultHeight,
    padding=padding,
    browser.fill=browser.fill,
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
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3)))
#' @export
upsetjs = function(width='100%',
                   height=NULL,
                   elementId=NULL,
                   sizingPolicy=upsetjsSizingPolicy()) {
  # forward options using x
  x = structure(
    list(
      mode='hover',
      sets=c()
    )
  )

  dependencies = c()

  htmlwidgets::createWidget(
    'upsetjs',
    x,
    width=width,
    height=height,
    package='upsetjs',
    elementId=elementId,
    sizingPolicy=sizingPolicy,
    dependencies=dependencies
  )
}

#'
#' reactive helper to update an upsetjs inplace
#' @param outputId the id of the upsetjs widget
#' @param session current shiny session
#' @return an object of class \code{upsetjs_proxy}
#' @examples
#' upsetjsProxy() %>% setSelection('a')
#'
#' @export
upsetjsProxy = function(outputId, session) {
  structure(
    list(
      session=session,
      id=session$ns(outputId),
      x=structure(
        list()
      )
    ),
    class="upsetjs_proxy"
  )
}
