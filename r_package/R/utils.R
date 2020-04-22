
stopifnotupset = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs') || inherits(upsetjs, 'upsetjs_proxy'))
}

stopifnottype = function(value, type_f = is.numeric, l = 1) {
  stopifnot(is.null(value) || (type_f(value) && length(value) == l))
}

sendMessage = function(upsetjs_proxy, props, ...) {
  session = upsetjs_proxy$session
  id = upsetjs_proxy$id

  msg = structure(
    list(
      id=id,
      props=props,
      ...
    ),
    class="upsetjs_msg"
  )

  session$sendCustomMessage("upsetjs-update", msg)

  upsetjs_proxy
}

enableCrosstalk = function(upsetjs, shared, mode) {
  if (inherits(upsetjs, 'upsetjs') && "crosstalk" %in% rownames(installed.packages()) && crosstalk::is.SharedData(shared)) {
    upsetjs$dependencies = c(upsetjs$dependencies, crosstalk::crosstalkLibs())
    upsetjs$x$crosstalk = list(group=shared$groupName(), mode=mode)
  }
  upsetjs
}

setProperty = function(upsetjs, prop, value) {
  stopifnotupset(upsetjs)

  if (inherits(upsetjs, 'upsetjs')) {
    upsetjs$x[[prop]] = value
  } else if (inherits(upsetjs, 'upsetjs_proxy')) {
    props = list()
    props[[prop]] = value
    sendMessage(upsetjs, props)
  }
  upsetjs
}

appendProperty = function(upsetjs, prop, value) {
  stopifnotupset(upsetjs)

  if (inherits(upsetjs, 'upsetjs')) {
    if (is.null(upsetjs$x[[prop]])) {
      upsetjs$x[[prop]] = list(value)
    } else {
      upsetjs$x[[prop]] = c(upsetjs$x[[prop]], list(value))
    }
  } else if (inherits(upsetjs, 'upsetjs_proxy')) {
    props = list()
    props[[prop]] = value
    sendMessage(upsetjs, props, append=TRUE)
  }
  upsetjs
}

setProperties = function(upsetjs, props, clean=F) {
  stopifnotupset(upsetjs)

  if (clean) {
    props = cleanNull(props)
  }
  if (inherits(upsetjs, 'upsetjs')) {
    for(prop in names(props)) {
      upsetjs$x[[prop]] = props[[prop]]
    }
  } else if (inherits(upsetjs, 'upsetjs_proxy')) {
    sendMessage(upsetjs, props)
  }
  upsetjs
}

cleanNull = function(l) {
  l[!sapply(l, is.null)]
}
