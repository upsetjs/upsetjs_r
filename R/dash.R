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
  props <- list(
    children = children, id = id, height = height, width = width,
    renderMode = "upset"
  )
  if (length(props) > 0) {
    props <- props[!vapply(props, is.null, logical(1))]
  }
  component <- list(
    props = props,
    type = "DashUpSetJS",
    namespace = "upsetjs",
    propNames = c(
      "children", "id", "height", "width", "renderMode", "mode",
      "attrs", "sets", "combinations", "queryLegend", "queries", "interactive", "selection",
      "heightRatios", "widthRatios", "padding", "barPadding", "dotPadding", "numericalScale", "bandScale",
      "title", "description", "setName", "combinationName", "combinationNameAxisOffset", "barLabelOffset", "setNameAxisOffset",
      "fontFamily", "fontSizes", "exportButtons", "className",
      "theme", "selectionColor", "alternatingBackgroundColor", "color",
      "hasSelectionColor", "textColor", "hoverHintColor", "notMemberColor", "valueTextColor", "strokeColor", "opacity", "hasSelectionOpacity", "filled"),
    package = "upsetjs"
  )

  structure(component, class = c("dash_component", "upsetjs_upset_dash", "upsetjs_common_dash", "list"))
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
