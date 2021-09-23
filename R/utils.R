#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

checkUpSetCommonArgument <- function(upsetjs) {
  if (!inherits(upsetjs, "upsetjs_common") &&
    !inherits(upsetjs, "upsetjs_common_proxy") &&
    !inherits(upsetjs, "upsetjs_common_dash")) {
    stop("first argument needs to be an upsetjs or upsetjs_venn or upsetjs_kmap instance")
  }
}

checkUpSetArgument <- function(upsetjs) {
  if (!inherits(upsetjs, "upsetjs_upset") &&
    !inherits(upsetjs, "upsetjs_upset_proxy") &&
    !inherits(upsetjs, "upsetjs_upset_dash")) {
    stop("first argument needs to be an upsetjs instance")
  }
}

checkVennDiagramArgument <- function(upsetjs) {
  if (!inherits(upsetjs, "upsetjs_venn") &&
    !inherits(upsetjs, "upsetjs_venn_proxy") &&
    !inherits(upsetjs, "upsetjs_venn_dash")) {
    stop("first argument needs to be an upsetjs_venn instance")
  }
}

checkKarnaughMapArgument <- function(upsetjs) {
  if (!inherits(upsetjs, "upsetjs_kmap") &&
    !inherits(upsetjs, "upsetjs_kmap_proxy") &&
    !inherits(upsetjs, "upsetjs_kmap_dash")) {
    stop("first argument needs to be an upsetjs_kmap instance")
  }
}

isVennDiagram <- function(upsetjs) {
  checkUpSetCommonArgument(upsetjs)
  inherits(upsetjs, "upsetjs_venn") ||
    inherits(upsetjs, "upsetjs_venn_proxy") ||
      inherits(upsetjs, "upsetjs_venn_dash")
}

isKarnaughMap <- function(upsetjs) {
  checkUpSetCommonArgument(upsetjs)
  inherits(upsetjs, "upsetjs_kmap") ||
    inherits(upsetjs, "upsetjs_kmap_proxy") ||
      inherits(upsetjs, "upsetjs_kmap_dash")
}

stopIfNotType <- function(name,
                          value,
                          type_f = is.numeric,
                          type_s = "number") {
  if (!is.null(value) && !(type_f(value) && length(value) == 1)) {
    stop(paste0("argument ", name, " is not a ", type_s))
  }
}

sendMessage <- function(upsetjsProxy, props, ...) {
  session <- upsetjsProxy$session
  id <- upsetjsProxy$id

  msg <- structure(list(
    id = id,
    props = props,
    ...
  ),
  class = "upsetjs_msg"
  )

  session$sendCustomMessage("upsetjs-update", msg)

  upsetjsProxy
}

enableCrosstalk <- function(upsetjs, shared, mode) {
  if (inherits(upsetjs, "upsetjs_common") &&
    requireNamespace("crosstalk", quietly = TRUE) &&
    crosstalk::is.SharedData(shared)) {
    upsetjs$dependencies <- c(upsetjs$dependencies, crosstalk::crosstalkLibs())
    upsetjs$x$crosstalk <- list(group = shared$groupName(), mode = mode)
  }
  upsetjs
}

setProperty <- function(upsetjs, prop, value) {
  checkUpSetCommonArgument(upsetjs)

  if (inherits(upsetjs, "upsetjs_common")) {
    upsetjs$x[[prop]] <- value
  } else if (inherits(upsetjs, "upsetjs_common_proxy")) {
    props <- list()
    props[[prop]] <- value
    sendMessage(upsetjs, props)
  } else if (inherits(upsetjs, "upsetjs_common_dash")) {
    upsetjs$props[[prop]] <- value
  }
  upsetjs
}

appendProperty <- function(upsetjs, prop, value) {
  checkUpSetCommonArgument(upsetjs)

  if (inherits(upsetjs, "upsetjs_common")) {
    if (is.null(upsetjs$x[[prop]])) {
      upsetjs$x[[prop]] <- list(value)
    } else {
      upsetjs$x[[prop]] <- c(upsetjs$x[[prop]], list(value))
    }
  } else if (inherits(upsetjs, "upsetjs_common_proxy")) {
    props <- list()
    props[[prop]] <- value
    sendMessage(upsetjs, props, append = TRUE)
  } else if (inherits(upsetjs, "upsetjs_common_dash")) {
    if (is.null(upsetjs$x[[prop]])) {
      upsetjs$props[[prop]] <- list(value)
    } else {
      upsetjs$props[[prop]] <- c(upsetjs$props[[prop]], list(value))
    }
  }
  upsetjs
}

setProperties <- function(upsetjs, props, clean = FALSE) {
  checkUpSetCommonArgument(upsetjs)

  if (clean) {
    props <- cleanNull(props)
  }
  if (inherits(upsetjs, "upsetjs_common")) {
    for (prop in names(props)) {
      upsetjs$x[[prop]] <- props[[prop]]
    }
  } else if (inherits(upsetjs, "upsetjs_common_proxy")) {
    sendMessage(upsetjs, props)
  } else if (inherits(upsetjs, "upsetjs_common_dash")) {
    for (prop in names(props)) {
      upsetjs$props[[prop]] <- props[[prop]]
    }
  }
  upsetjs
}

cleanNull <- function(l) {
  l[!sapply(l, is.null)]
}
