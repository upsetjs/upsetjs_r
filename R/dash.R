#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

#'
#' create a new upsetjs dash adapter
#' @export
upsetjsDash <- function(children = NULL, id = NULL, width = NULL, height = NULL) {
  props <- list(children = children, id = id, height = height, width = width)
  if (length(props) > 0) {
    props <- props[!vapply(props, is.null, logical(1))]
  }
  component <- list(
    props = props,
    type = "DashUpSetJS",
    namespace = "upsetjs",
    propNames = c("children", "id", "height", "width"),
    package = "upsetjs"
  )

  structure(component, class = c("dash_component", "list"))
}


.dash_upsetjs_js_metadata <- function() {
  deps_metadata <- list(
    `upsetjs` = structure(list(
      name = "upsetjs",
      version = "1.9.0",
      src = list(
        href = NULL,
        file = "dash"
      ),
      meta = NULL,
      script = "upsetjs.js",
      stylesheet = NULL,
      head = NULL,
      attachment = NULL,
      package = "upsetjs",
      all_files = FALSE
    ), class = "html_dependency")
  )
  return(deps_metadata)
}
