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
  distinct = (c_type == 'distinctIntersection')
  cc = colorLookup(colors)

  mergeUnion = function(a, b) {
    ab_sets = union(a$setNames, b$setNames)
    ab_name = paste(ab_sets, collapse = symbol)
    ab_elems = c()
    if (a$cardinality == 0) {
      ab_elems = b$elems
    } else if (b$cardinality == 0) {
      ab_elems = a$elems
    } else {
      ab_elems = union(a$elems, b$elems)
    }
    asCombination(ab_name, ab_elems, 'union', ab_sets, color=cc(ab_name))
  }

  mergeIntersect = function(a, b) {
    ab_sets = union(a$setNames, b$setNames)
    ab_name = paste(ab_sets, collapse = symbol)
    ab_elems = c()
    if (a$cardinality > 0 && b$cardinality > 0) {
      ab_elems = intersect(a$elems, b$elems)
    }
    asCombination(ab_name, ab_elems, 'intersect', ab_sets, color=cc(ab_name))
  }

  calc = ifelse(c_type == "union", mergeUnion, mergeIntersect)

  push_combination = function(s) {
    if (s$degree < min || (!is.null(max) && s$degree > max) || (s$cardinality == 0 && !empty)) {
      return()
    }
    if (!store.elems) {
      s <<- asCombination(s$name, c(), 'distinctIntersection', s$setNames, cardinality=s$cardinality, color=s$color)
    }
    if (!distinct || s$degree == 1) {
      combinations <<- c(combinations, list(s))
      return()
    }
    otherSets = Filter(function(ss) {
      !(ss$name %in% s$setNames)
    }, sets)
    dElems = Filter(function(e) {
      for(o in otherSets) {
        if (e %in% o$elems) {
          return(FALSE)
        }
      }
      TRUE
     }, s$elems)

    if (s$cardinality == length(dElems)) {
      combinations <<- c(combinations, list(s))
      return()
    }

    sDistinct = asCombination(s$name, if (store.elems) { dElems } else { c() }, 'distinctIntersection', s$setNames, cardinality=length(dElems), color=s$color)
    if (sDistinct$cardinality > 0 || empty) {
      combinations <<- c(combinations, list(sDistinct))
    }
  }

  generateLevel = function(arr, degree) {
    if (!is.null(max) && degree > max) {
      return()
    }
    l = length(arr)
    for(i in 1:l) {
      a = arr[[i]]
      sub = list()
      if (i < l) {
        for(j in (i+1):l) {
          b = arr[[j]]
          ab = calc(a,b)
          push_combination(ab)
          if (c_type == 'union' || ab$cardinality > 0 || empty) {
            sub[[length(sub) + 1]] = ab
          }
        }
      }
      if (length(sub) > 1) {
        generateLevel(sub, degree + 1)
      }
    }
  }

  degree1 = lapply(1:length(sets), function(i) {
    s = sets[[i]]
    s_c = asCombination(s$name, s$elems, c_type, c(s$name), s$cardinality, s$color)
    push_combination(s_c)
    s_c
  })
  generateLevel(degree1, 2)

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
  c_name = apply(df_sets, 1, function(r) {
    nn = all_set_names[as.logical(r)]
    if (length(nn) == 1) {
      nn
    } else {
      paste(nn, collapse=symbol)
    }
  })
  dd = aggregate(elems, list(c_name = c_name), function(r) {
    r
  })
  set_names = strsplit(dd$c_name, symbol, fixed = TRUE)
  set_colors = cc(dd$c_name)

  combinations = lapply(1:nrow(dd), function(i) {
    elems = as.character(dd[i, 'x'][[1]])
    structure(
      list(
        name = dd[i, 'c_name'],
        color = set_colors[i],
        type = 'distinctIntersection',
        elems = if (store.elems) elems else c(),
        cardinality = length(elems),
        setNames = set_names[i][[1]]
      ),
      class = "upsetjs_combination"
    )
  })
  names(combinations) = NULL
  sortSets(combinations, order.by, limit)
}
