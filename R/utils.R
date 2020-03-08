
sendMessage = function(upsetjs_proxy, props) {
  session = upsetjs_proxy$session
  id = upsetjs_proxy$id

  msg = structure(
    list(
      id = id,
      props = props
    ),
    class = "upsetjs_msg"
  )

  session$sendCustomMessage("upsetjs-update", msg)

  upsetjs_proxy
}

setProperty = function(upsetjs, prop, value) {
  if (inherits(upsetjs, 'upsetjs')) {
    upsetjs$x[[prop]] = value
  } else if (inherits(upsetjs, 'upsetjs_proxy')) {
    props = list()
    props[[prop]] = value
    sendMessage(upsetjs, props)
  }
  upsetjs
}

setProperties = function(upsetjs, props) {
  if (inherits(upsetjs, 'upsetjs')) {
    for(prop in names(props)) {
      upsetjs$x[[prop]] = props[[prop]]
    }
  } else if (inherits(upsetjs, 'upsetjs_proxy')) {
    sendMessage(upsetjs, props)
  }
  upsetjs
}
