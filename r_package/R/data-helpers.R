#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

sortSets <- function(sets,
                     order.by = "cardinality",
                     limit = NULL) {
  setAttr <- function(order.by.attr) {
    if (order.by.attr == "cardinality") {
      sapply(sets, function(x) {
        if (length(x$elems) == 0) {
          x$cardinality * -1
        } else {
          length(x$elems) * -1
        }
      })
    } else if (order.by.attr == "degree") {
      sapply(sets, function(x) {
        length(x$setNames)
      })
    } else {
      sapply(sets, function(x) {
        x$name
      })
    }
  }

  if (length(order.by) == 1 && order.by[1] == "cardinality") {
    order.by <- c("cardinality", "name")
  } else if (length(order.by) == 1 && order.by[1] == "degree") {
    order.by <- c("degree", "name")
  }
  if (length(sets) > 1) {
    values <- lapply(order.by, setAttr)
    o <- do.call(order, values)
    r <- sets[o]
  } else {
    r <- sets
  }
  if (is.null(limit) || length(r) <= limit) {
    r
  } else {
    r[1:limit]
  }
}

colorLookup <- function(colors = NULL) {
  if (is.null(colors)) {
    function(c) {
      NULL
    }
  } else {
    colorNames <- names(colors)
    function(c) {
      if (c %in% colorNames) {
        colors[[c]]
      } else {
        NULL
      }
    }
  }
}

generateCombinationsImpl <- function(sets,
                                     c_type,
                                     min,
                                     max,
                                     empty,
                                     order.by,
                                     limit,
                                     colors = NULL,
                                     symbol = "&",
                                     store.elems = TRUE) {
  combinations <- list()
  distinct <- (c_type == "distinctIntersection")
  cc <- colorLookup(colors)

  mergeUnion <- function(a, b) {
    abSets <- union(a$setNames, b$setNames)
    abName <- paste(abSets, collapse = symbol)
    abElems <- c()
    if (a$cardinality == 0) {
      abElems <- b$elems
    } else if (b$cardinality == 0) {
      abElems <- a$elems
    } else {
      abElems <- union(a$elems, b$elems)
    }
    asCombination(abName, abElems, "union", abSets, color = cc(abName))
  }

  mergeIntersect <- function(a, b) {
    abSets <- union(a$setNames, b$setNames)
    abName <- paste(abSets, collapse = symbol)
    abElems <- c()
    if (a$cardinality > 0 && b$cardinality > 0) {
      abElems <- intersect(a$elems, b$elems)
    }
    asCombination(abName, abElems, "intersect", abSets, color = cc(abName))
  }

  calc <- ifelse(c_type == "union", mergeUnion, mergeIntersect)

  pushCombination <- function(s) {
    if (s$degree < min || (!is.null(max) && s$degree > max) || (s$cardinality == 0 && !empty)) {
      return()
    }
    if (!store.elems) {
      s <<- asCombination(s$name, c(), "distinctIntersection", s$setNames, cardinality = s$cardinality, color = s$color)
    }
    if (!distinct || s$degree == 1) {
      combinations <<- c(combinations, list(s))
      return()
    }
    otherSets <- Filter(function(ss) {
      !(ss$name %in% s$setNames)
    }, sets)
    dElems <- Filter(function(e) {
      for (o in otherSets) {
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

    sDistinct <- asCombination(s$name, if (store.elems) {
      dElems
    } else {
      c()
    }, "distinctIntersection", s$setNames, cardinality = length(dElems), color = s$color)
    if (sDistinct$cardinality > 0 || empty) {
      combinations <<- c(combinations, list(sDistinct))
    }
  }

  generateLevel <- function(arr, degree) {
    if (!is.null(max) && degree > max) {
      return()
    }
    l <- length(arr)
    for (i in 1:l) {
      a <- arr[[i]]
      sub <- list()
      if (i < l) {
        for (j in (i + 1):l) {
          b <- arr[[j]]
          ab <- calc(a, b)
          pushCombination(ab)
          if (c_type == "union" || ab$cardinality > 0 || empty) {
            sub[[length(sub) + 1]] <- ab
          }
        }
      }
      if (length(sub) > 1) {
        generateLevel(sub, degree + 1)
      }
    }
  }

  degree1 <- lapply(seq_along(sets), function(i) {
    s <- sets[[i]]
    sC <- asCombination(s$name, s$elems, c_type, c(s$name), s$cardinality, s$color)
    pushCombination(sC)
    sC
  })
  generateLevel(degree1, 2)

  names(combinations) <- NULL
  sortSets(combinations, order.by, limit)
}

extractCombinationsImpl <- function(df,
                                    sets,
                                    empty,
                                    order.by,
                                    limit = NULL,
                                    colors = NULL,
                                    symbol = "&",
                                    store.elems = TRUE) {
  allSetNames <- sapply(seq_along(sets), function(i) sets[[i]]$name)
  if (is.list(allSetNames)) {
    allSetNames <- unlist(allSetNames)
  }
  cc <- colorLookup(colors)

  elems <- rownames(df)
  dfSets <- df[, allSetNames]
  cName <- apply(dfSets, 1, function(r) {
    nn <- allSetNames[as.logical(r)]
    if (length(nn) == 1) {
      nn
    } else {
      paste(nn, collapse = symbol)
    }
  })
  dd <- aggregate(elems, list(c_name = cName), function(r) {
    r
  })
  setNames <- strsplit(dd$c_name, symbol, fixed = TRUE)
  setColors <- cc(dd$c_name)

  combinations <- lapply(seq_len(nrow(dd)), function(i) {
    elems <- as.character(dd[i, "x"][[1]])
    structure(
      list(
        name = dd[i, "c_name"],
        color = setColors[i],
        type = "distinctIntersection",
        elems = if (store.elems) elems else c(),
        cardinality = length(elems),
        setNames = setNames[i][[1]],
      ),
      class = "upsetjs_combination"
    )
  })
  names(combinations) <- NULL
  sortSets(combinations, order.by, limit)
}
