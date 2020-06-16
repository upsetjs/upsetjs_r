#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
#

checkUpSetArgument = function(upsetjs) {
  if (!inherits(upsetjs, 'upsetjs') &&
      !inherits(upsetjs, 'upsetjs_proxy')) {
    stop('first argument needs to be an upsetjs instance')
  }
}

checkVennDiagramArgument = function(upsetjs) {
  if (!inherits(upsetjs, 'upsetjs_venn') &&
      !inherits(upsetjs, 'upsetjs_venn_proxy')) {
    stop('first argument needs to be an upsetjs_venn instance')
  }
}

checkUpSetOrVennArgument = function(upsetjs) {
  if (!inherits(upsetjs, 'upsetjs_common') &&
      !inherits(upsetjs, 'upsetjs_common_proxy')) {
    stop('first argument needs to be an upsetjs or upsetjs_venn instance')
  }
}

isVennDiagram = function(upsetjs) {
  checkUpSetOrVennArgument(upsetjs)
  inherits(upsetjs, 'upsetjs_venn') ||
    inherits(upsetjs, 'upsetjs_venn_proxy')
}

stopifnottype = function(name,
                         value,
                         type_f = is.numeric,
                         type_s = 'number') {
  if (!is.null(value) && !(type_f(value) && length(value) == 1)) {
    stop(paste0("argument ", name, " is not a ", type_s))
  }
}

sendMessage = function(upsetjs_proxy, props, ...) {
  session = upsetjs_proxy$session
  id = upsetjs_proxy$id

  msg = structure(list(id = id,
                       props = props,
                       ...),
                  class = "upsetjs_msg")

  session$sendCustomMessage("upsetjs-update", msg)

  upsetjs_proxy
}

enableCrosstalk = function(upsetjs, shared, mode) {
  if (inherits(upsetjs, 'upsetjs_common') &&
      requireNamespace("crosstalk", quietly = TRUE) &&
      crosstalk::is.SharedData(shared)) {
    upsetjs$dependencies = c(upsetjs$dependencies, crosstalk::crosstalkLibs())
    upsetjs$x$crosstalk = list(group = shared$groupName(), mode = mode)
  }
  upsetjs
}

setProperty = function(upsetjs, prop, value) {
  checkUpSetOrVennArgument(upsetjs)

  if (inherits(upsetjs, 'upsetjs_common')) {
    upsetjs$x[[prop]] = value
  } else if (inherits(upsetjs, 'upsetjs_common_proxy')) {
    props = list()
    props[[prop]] = value
    sendMessage(upsetjs, props)
  }
  upsetjs
}

appendProperty = function(upsetjs, prop, value) {
  checkUpSetOrVennArgument(upsetjs)

  if (inherits(upsetjs, 'upsetjs_common')) {
    if (is.null(upsetjs$x[[prop]])) {
      upsetjs$x[[prop]] = list(value)
    } else {
      upsetjs$x[[prop]] = c(upsetjs$x[[prop]], list(value))
    }
  } else if (inherits(upsetjs, 'upsetjs_common_proxy')) {
    props = list()
    props[[prop]] = value
    sendMessage(upsetjs, props, append = TRUE)
  }
  upsetjs
}

setProperties = function(upsetjs, props, clean = F) {
  checkUpSetOrVennArgument(upsetjs)

  if (clean) {
    props = cleanNull(props)
  }
  if (inherits(upsetjs, 'upsetjs_common')) {
    for (prop in names(props)) {
      upsetjs$x[[prop]] = props[[prop]]
    }
  } else if (inherits(upsetjs, 'upsetjs_common_proxy')) {
    sendMessage(upsetjs, props)
  }
  upsetjs
}

cleanNull = function(l) {
  l[!sapply(l, is.null)]
}
