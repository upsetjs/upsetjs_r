#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#


sortSets = function(sets,
                    order.by = 'cardinality',
                    limit = NULL) {
  set_attr = function(order.by.attr) {
    if (order.by.attr == 'cardinality') {
      sapply(sets, function (x)
        if (length(x$elems) == 0)
          x$cardinality * -1
        else
          length(x$elems) * -1)
    } else if (order.by.attr == 'degree') {
      sapply(sets, function (x)
        length(x$setNames))
    } else {
      sapply(sets, function (x)
        x$name)
    }
  }

  if (length(order.by) == 1 && order.by[1] == 'cardinality') {
    order.by = c('cardinality', 'name')
  } else if (length(order.by) == 1 && order.by[1] == 'degree') {
    order.by = c('degree', 'name')
  }
  if (length(sets) > 1) {
    values = lapply(order.by, set_attr)
    o = do.call(order, values)
    r = sets[o]
  } else {
    r = sets
  }
  if (is.null(limit) || length(r) <= limit) {
    r
  } else {
    r[1:limit]
  }
}

colorLookup = function(colors = NULL) {
  if (is.null(colors)) {
    function (c) {
      NULL
    }
  } else {
    color_names = names(colors)
    function (c) {
      if (c %in% color_names) {
        colors[[c]]
      } else {
        NULL
      }
    }
  }
}

generateCombinationsImpl = function(sets,
                                    c_type,
                                    min,
                                    max,
                                    empty,
                                    order.by,
                                    limit,
                                    colors = NULL,
                                    symbol = "&") {
  combinations = list()
  set_f = if (c_type == "union")
    union
  else
    intersect
  distinct = (c_type == 'distinctIntersection')
  lsets = length(sets)
  all_indices = 1:lsets
  cc = colorLookup(colors)

  for (l in min:(if (is.null(max))
    lsets
    else
      max)) {
    combos = combn(all_indices, l, simplify = FALSE)
    for (combo in combos) {
      indices = unlist(combo)
      set_names = sapply(indices, function(i)
        sets[[i]]$name)
      if (is.list(set_names)) {
        set_names = unlist(set_names)
      }
      if (length(indices) == 0) {
        elems = c()
      } else {
        elems = sets[[indices[1]]]$elems
        for (index in indices) {
          elems = set_f(elems, sets[[index]]$elems)
        }
      }
      if (distinct) {
        not_indices = setdiff(all_indices, indices)
        for (index in not_indices) {
          elems = setdiff(elems, sets[[index]]$elems)
        }
      }
      if (empty || length(elems) > 0) {
        c_name = paste(set_names, collapse = symbol)
        combination = structure(
          list(
            name = c_name,
            color = cc(c_name),
            type = c_type,
            elems = elems,
            setNames = set_names
          ),
          class = "upsetjs_combination"
        )
        combinations = c(combinations, list(combination))
      }
    }
  }
  names(combinations) = NULL
  sortSets(combinations, order.by, limit)
}

#'
#' generates the sets from a lists object
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param value the list input value
#' @param order.by order intersections by cardinality or name
#' @param limit limit the ordered sets to the given limit
#' @param shared a crosstalk shared data frame
#' @param shared.mode whether on 'hover' or 'click' (default) is synced
#' @param colors the optional list with set name to color
#' @param c_type the combination type to use or "none" for disabling initial generation
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3)))
#'
#' @export
fromList = function(upsetjs,
                    value,
                    order.by = "cardinality",
                    limit = NULL,
                    shared = NULL,
                    shared.mode = "click",
                    colors = NULL,
                    c_type = NULL) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.list(value))
  stopifnot(order.by == "cardinality" || order.by == "degree")
  stopifnot(is.null(limit) ||
              (is.numeric(limit) && length(limit) == 1))
  stopifnot(shared.mode == "click" || shared.mode == "hover")
  stopifnot(is.null(colors) || is.list(colors))
  stopifnot(
    is.null(c_type) ||
      c_type == "intersection" ||
      c_type == "union" || c_type == "distinctIntersection" ||
      c_type == "none"
  )

  elems = c()
  cc = colorLookup(colors)
  toSet = function(key, value) {
    elems <<- unique(c(elems, value))
    structure(list(
      name = key,
      type = 'set',
      elems = value,
      cardinality = length(value),
      color = cc(key)
    ),
    class = "upsetjs_set")
  }
  sets = mapply(toSet,
                key = names(value),
                value = value,
                SIMPLIFY = FALSE)
  # list of list objects
  names(sets) = NULL
  names(elems) = NULL

  if (!is.null(shared)) {
    upsetjs = enableCrosstalk(upsetjs, shared, mode = shared.mode)
  }

  sorted_sets = sortSets(sets, order.by = order.by, limit = limit)
  gen_sets = if (is.null(limit))
    sets
  else
    sorted_sets

  gen = if (c_type == "none") list() else if (isVennDiagram(upsetjs) || isKarnaughMap(upsetjs)) {
    generateCombinationsImpl(
      gen_sets,
      if_else(is.null(c_type), 'distinctIntersection', c_type),
      0,
      NULL,
      TRUE,
      'degree',
      NULL,
      colors
    )
  } else {
    generateCombinationsImpl(
      gen_sets,
      if_else(is.null(c_type), 'intersection', c_type),
      0,
      NULL,
      FALSE,
      order.by,
      NULL,
      colors
    )
  }
  setProperties(
    upsetjs,
    list(
      sets = sorted_sets,
      combinations = gen,
      elems = elems,
      expressionData = FALSE,
      attrs = list()
    )
  )
}

#'
#' generates the sets from a lists object that contained the cardinalities of both sets and combinations (&)
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param value the expression list input
#' @param symbol the symbol how to split list names to get the sets
#' @param order.by order intersections by cardinality or name
#' @param colors the optional list with set name to color
#' @param type the type of intersections this data represents (intersection,union,distinctIntersection)
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromExpression(list(a=3, b=2, `a&b`=2))
#'
#' @export
fromExpression = function(upsetjs,
                          value,
                          symbol = "&",
                          order.by = "cardinality",
                          colors = NULL,
                          type = 'intersection') {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.list(value))
  stopifnot(order.by == "cardinality" || order.by == "degree")
  stopifnot(is.null(colors) || is.list(colors))
  stopifnot(type == "intersection" ||
              type == "union" || type == "distinctIntersection")

  cc = colorLookup(colors)

  degrees = sapply(names(value), function (x) {
    length(unlist(strsplit(x, symbol)))
  })

  raw_combinations = value

  toCombination = function(key, value, color) {
    structure(
      list(
        name = key,
        type = type,
        elems = c(),
        color = cc(key),
        cardinality = value,
        setNames = unlist(strsplit(key, symbol))
      ),
      class = "upsetjs_combination"
    )
  }
  combinations = mapply(
    toCombination,
    key = names(raw_combinations),
    value = raw_combinations,
    SIMPLIFY = FALSE
  )
  names(combinations) = NULL
  combinations = sortSets(combinations, order.by = order.by)

  sets = list()
  defined_sets = c()
  for (c in combinations) {
    for (s in c$setNames) {
      if (!(s %in% defined_sets)) {
        defined_sets = c(defined_sets, s)
        sets[[s]] = structure(list(
          name = s,
          type = "set",
          color = cc(s),
          elems = c(),
          cardinality = 0
        ),
        class = "upsetjs_set")
      }
      # determine base set based on type and value
      set = sets[[s]]
      if (type == 'distinctIntersection') {
        set$cardinality = set$cardinality + c$cardinality
      } else if (length(c$setNames) == 1) {
        set$cardinality = c$cardinality
      } else if (type == 'intersection') {
        set$cardinality = max(set$cardinality, c$cardinality)
      } else if (type == 'union') {
        set$cardinality = min(set$cardinality, c$cardinality)
      }
      sets[[s]] = set
    }
  }
  names(sets) = NULL
  sets = sortSets(sets, order.by = order.by)


  props = list(
    sets = sets,
    combinations = combinations,
    elems = c(),
    attrs = list(),
    expressionData = TRUE
  )
  setProperties(upsetjs, props)
}

#'
#' extract the sets from a data frame (rows = elems, columns = sets, cell = contained)
#' @param df the data.frame like structure
#' @param attributes the optional column list or data frame
#' @param order.by order intersections by cardinality or degree
#' @param limit limit the ordered sets to the given limit
#' @param colors the optional list with set name to color
#' @param store.elems store the elements in the sets (default TRUE)
#' @export
extractSetsFromDataFrame = function(df,
                         attributes = NULL,
                         order.by = "cardinality",
                         limit = NULL,
                         colors = NULL,
                         c_type = NULL,
                         store.elems = TRUE) {
  stopifnot(is.data.frame(df))
  stopifnot((
    is.null(attributes) ||
      is.data.frame(attributes) ||
      is.list(attributes) || is.character(attributes)
  ))
  stopifnot(order.by == "cardinality" || order.by == "degree")
  stopifnottype("limit", limit)
  stopifnot(is.null(colors) || is.list(colors))

  cc = colorLookup(colors)

  elems = rownames(df)
  toSet = function(key) {
    sub = elems[df[[key]] == TRUE]
    structure(list(
      name = key,
      type = "set",
      color = cc(key),
      cardinality = length(sub),
      elems = if(store.elems) { sub } else { c() }
    ),
    class = "upsetjs_set")
  }

  set_names = setdiff(colnames(df), if (is.character(attributes))
    attributes
    else
      c())
  sets = lapply(set_names, toSet)

  sorted_sets = sortSets(sets, order.by = order.by, limit = limit)
  if (is.null(limit))
    sets
  else
    sorted_sets
}

#'
#' extract the sets from a data frame (rows = elems, columns = sets, cell = contained)
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param df the data.frame like structure
#' @param attributes the optional column list or data frame
#' @param order.by order intersections by cardinality or degree
#' @param limit limit the ordered sets to the given limit
#' @param shared a crosstalk shared data frame
#' @param shared.mode whether on 'hover' or 'click' (default) is synced
#' @param colors the optional list with set name to color
#' @param c_type the combination type to use
#' @return the object given as first argument
#' @examples
#' df <- as.data.frame(list(a=c(1, 1, 1),b=c(0, 1, 1)),row.names=c('a', 'b', 'c'))
#' upsetjs() %>% fromDataFrame(df)
#'
#' @export
fromDataFrame = function(upsetjs,
                         df,
                         attributes = NULL,
                         order.by = "cardinality",
                         limit = NULL,
                         shared = NULL,
                         shared.mode = "click",
                         colors = NULL,
                         c_type = NULL) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.data.frame(df))
  stopifnot((
    is.null(attributes) ||
      is.data.frame(attributes) ||
      is.list(attributes) || is.character(attributes)
  ))
  stopifnot(order.by == "cardinality" || order.by == "degree")
  stopifnottype('limit', limit)
  stopifnot(shared.mode == "click" || shared.mode == "hover")
  stopifnot(is.null(colors) || is.list(colors))
  stopifnot(
    is.null(c_type) ||
      c_type == "intersection" ||
      c_type == "union" || c_type == "distinctIntersection" ||
      c_type == "none"
  )

  cc = colorLookup(colors)

  sorted_sets = extractSetsFromDataFrame(df, attributes, order.by, limit, colors)

  gen_sets = if (is.null(limit))
    sets
  else
    sorted_sets

  elems = rownames(df)
  
  gen = if (c_type == "none") list() else if (isVennDiagram(upsetjs) || isKarnaughMap(upsetjs)) {
    generateCombinationsImpl(
      gen_sets,
      if_else(is.null(c_type), 'distinctIntersection', c_type),
      0,
      NULL,
      TRUE,
      'degree',
      NULL,
      colors
    )
  } else {
    generateCombinationsImpl(
      gen_sets,
      if_else(is.null(c_type), 'intersection', c_type),
      0,
      NULL,
      FALSE,
      order.by,
      NULL,
      colors
    )
  }
  props = list(
    sets = sorted_sets,
    combinations = gen,
    elems = elems,
    expressionData = FALSE
  )

  upsetjs = setProperties(upsetjs, props)

  if (!is.null(attributes)) {
    attr_df = if (is.character(attributes))
      df[, attributes]
    else
      attributes
    upsetjs = setAttributes(upsetjs, attr_df)
  }

  if (!is.null(shared)) {
    upsetjs = enableCrosstalk(upsetjs, shared, mode = shared.mode)
  } else {
    upsetjs = enableCrosstalk(upsetjs, df, mode = shared.mode)
  }

  upsetjs
}


#'
#' extract the vector of elements
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @return vector of elements
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% getElements()
#'
#' @export
getElements = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs_common'))
  upsetjs$x$elems
}

#'
#' extract the vector of sets
#' @param upsetjs an object of class \code{upsetjs}
#' @return vector of sets
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% getSets()
#'
#' @export
getSets = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs_common'))
  upsetjs$x$sets
}

#'
#' extract the vector of combinations
#' @param upsetjs an object of class \code{upsetjs}
#' @return vector of sets
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% getCombinations()
#'
#' @export
getCombinations = function(upsetjs) {
  stopifnot(inherits(upsetjs, 'upsetjs_common'))
  upsetjs$x$combinations
}

generateCombinations = function(upsetjs,
                                c_type,
                                min,
                                max,
                                empty,
                                order.by,
                                limit,
                                colors = NULL,
                                symbol = '&') {
  checkUpSetArgument(upsetjs)
  stopifnot(is.numeric(min), length(min) == 1)
  stopifnottype('max', max)
  stopifnot(is.logical(empty), length(empty) == 1)
  stopifnot(is.character(order.by), length(order.by) >= 1)
  stopifnot(is.null(limit) ||
              (is.numeric(limit) && length(limit) == 1))
  stopifnot(is.null(colors) || is.list(colors))
  stopifnot(c_type == "intersection" ||
              c_type == "union" || c_type == "distinctIntersection")

  if (inherits(upsetjs, 'upsetjs_common')) {
    sets = upsetjs$x$sets
    gen = generateCombinationsImpl(sets, c_type, min, max, empty, order.by, limit, colors, symbol)
  } else {
    # proxy
    gen = cleanNull(list(
      type = c_type,
      min = min,
      max = max,
      empty = empty,
      order = order.by,
      limit = limit
    ))
  }
  setProperty(upsetjs, 'combinations', gen)
}
#'
#' configure the generation of the intersections
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param min minimum number of sets in an intersection
#' @param max maximum number of sets in an intersection
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by cardinality, degree, name or a combination of it
#' @param limit limit the number of intersections to the top N
#' @param colors the optional list with set name to color
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% generateIntersections(min=2)
#'
#' @export
generateIntersections = function(upsetjs,
                                 min = 0,
                                 max = NULL,
                                 empty = FALSE,
                                 order.by = "cardinality",
                                 limit = NULL,
                                 colors = NULL) {
  generateCombinations(upsetjs,
                       "intersection",
                       min,
                       max,
                       empty,
                       order.by,
                       limit,
                       colors)
}
#'
#' configure the generation of the distinct intersections
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param min minimum number of sets in an intersection
#' @param max maximum number of sets in an intersection
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by cardinality, degree, name or a combination of it
#' @param limit limit the number of intersections to the top N
#' @param colors the optional list with set name to color
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% generateDistinctIntersections(min=2)
#'
#' @export
generateDistinctIntersections = function(upsetjs,
                                         min = 0,
                                         max = NULL,
                                         empty = FALSE,
                                         order.by = "cardinality",
                                         limit = NULL,
                                         colors = NULL) {
  generateCombinations(upsetjs,
                       "distinctIntersection",
                       min,
                       max,
                       empty,
                       order.by,
                       limit,
                       colors)
}

#'
#' configure the generation of the unions
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param min minimum number of sets in an union
#' @param max maximum number of sets in an union
#' @param empty whether to include empty intersections or not
#' @param order.by order intersections by cardinality, degree, name or a combination of it
#' @param limit limit the number of intersections to the top N
#' @param colors the optional list with set name to color
#' @return the object given as first argument
#' @examples
#' upsetjs() %>% fromList(list(a=c(1,2,3), b=c(2,3))) %>% generateUnions()
#'
#' @export
generateUnions = function(upsetjs,
                          min = 0,
                          max = NULL,
                          empty = FALSE,
                          order.by = "cardinality",
                          limit = NULL,
                          colors = NULL) {
  generateCombinations(upsetjs, "union", min, max, empty, order.by, limit, colors)
}
