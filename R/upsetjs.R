
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
    upsetjs$x[[prop]] = value
  } else if (inherits(upsetjs, 'upsetjs_proxy')) {
    sendMessage(upsetjs, props)
  }
  upsetjs
}

sortSets = function(sets, order.by = 'freq') {
  if (order.by == 'freq') {
    o = order(sapply(sets, function (x) { x$cardinality }), decreasing=T)
  } else if (order.by == 'degree') {
    o = order(sapply(sets, function (x) { x$degree }), decreasing=T)
  }
  sets[o]
}

#'
#' generates the sets from a lists object
#' @ export
fromList = function(upsetjs, value, order.by = "freq") {
  toSet = function(key, value) {
    list(name=key, elems=value, cardinality=length(value))
  }
  sets = mapply(toSet, key=names(value), value=value, SIMPLIFY=F)
  # list of list objects
  names(sets) = NULL

  sets = sortSets(sets, order.by = order.by)
  setProperty(upsetjs, 'sets', sets)
}

#'
#' generates the sets from a lists object
#' @ export
fromExpression = function(upsetjs, value, order.by = "freq") {
  degrees = sapply(names(value), function (x) { length(unlist(strsplit(x, '+'))) })

  combinations = value
  sets = value[degrees == 1]

  toSet = function(key, value) {
    list(name=key, elems=c(), cardinality=value)
  }
  sets = mapply(toSet, key=names(sets), value=sets, SIMPLIFY=F)
  names(sets) = NULL
  sets = sortSets(sets, order.by = order.by)

  toCombination = function(key, value, degree) {
    list(name=key, elems=c(), cardinality=value, degree=degree)
  }
  combinations = mapply(toCombination, key=names(combinations), value=combinations, degree=degrees, SIMPLIFY=F)
  names(combinations) = NULL
  combinations = sortSets(combinations, order.by = order.by)

  props = list(sets = sets, combinations = combinations)
  setProperties(upsetjs, props)
}

# order.by = c("degree", "freq"))
# empty.intersections = "on"
# list(query = intersects, params = list("Drama", "Comedy", "Action"), color = "orange", active = T)


# sets = c("PTEN", "TP53", "EGFR", "PIK3R1", "RB1")
# mainbar.y.label = "Genre Intersections", sets.x.label = "Movies Per Genre",
# nsets
# mb.ratio = c(0.55, 0.45)

heightRatios = function(upsetjs, ratios) {
  setProperty(upsetjs, 'heightRatios', ratios)
}

fromDataFrame = function(upsetjs, df, order.by = "freq") {
  toSet = function(key) {
    list(name=key, elems=c(), cardinality=0)
  }
  elems = rownames(df)
  sets = lapply(toSet, colnames(df))


  sets = sortSets(sets, order.by = order.by)
  setProperty(upsetjs, 'sets', sets)
}
