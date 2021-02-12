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
                                    symbol = "&",
                                    store.elems = TRUE) {
  combinations = list()
  set_f = if (c_type == "union")
    union
  else
    intersect
  distinct = (c_type == 'distinctIntersection')
  lsets = length(sets)
  all_indices = 1:lsets
  cc = colorLookup(colors)
  max_sets = ifelse(is.null(max), lsets, max)

  for (l in min:max_sets) {
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
            elems = ifelse(store.elems, elems, c()),
            cardinality = length(elems),
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

extractCombinationsImpl = function(df, 
                                   sets,
                                   empty,
                                   order.by,
                                   limit = NULL,
                                   colors = NULL,
                                   symbol = "&",
                                   store.elems = TRUE) {
  combination_names = c()
  lookup = new.env(hash=TRUE, parent=emptyenv())
  all_set_names = sapply(1:length(sets), function(i) sets[[i]]$name)
  if (is.list(all_set_names)) {
    all_set_names = unlist(all_set_names)
  }
  cc = colorLookup(colors)

  elems = rownames(df)
  df_sets = df[, all_set_names]
  c_name = apply(df_sets, 1, function(r) paste(all_set_names[as.logical(r)], collapse=symbol))

  dd = aggregate(elems, list(c_name = c_name), function(r) {
    r
  })
  set_names = strsplit(dd$c_name, symbol, fixed = TRUE)
  set_colors = cc(dd$c_name)

  combinations = lapply(1:nrow(dd), function(i) {
    elems = as.character(unlist(dd[i, 'x']))
    structure(
      list(
        name = dd[i, 'c_name'],
        color = set_colors[i],
        type = 'distinctIntersection',
        elems = elems,
        cardinality = length(elems),
        setNames = unlist(set_names[i])
      ),
      class = "upsetjs_combination"
    )
  })
  names(combinations) = NULL
  sortSets(combinations, order.by, limit)
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
