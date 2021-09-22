#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

cleanAttrName <- function(col) {
  # escape remove .
  gsub("[.]", "_", col)
}


#'
#' set the attributes
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param attrs the attributes to set
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   setAttributes(list(attr = runif(3), cat = as.factor(sample(c("male", "female"), 3, replace = TRUE))))
#' @export
setAttributes <- function(upsetjs, attrs = list()) {
  checkUpSetCommonArgument(upsetjs)
  stopifnot(is.list(attrs) || is.data.frame(attrs))
  rows <- if (is.list(attrs)) {
    NULL
  } else {
    rownames(attrs)
  }
  df <- as.data.frame(attrs)

  toDescription <- function(col, colname) {
    clazz <- class(col)
    if (clazz == "numeric") {
      list(
        type = "number",
        name = colname,
        domain = c(min(col, na.rm = TRUE), max(col, na.rm = TRUE)),
        values = col,
        rows = rows
      )
    } else if (clazz == "factor") {
      list(
        type = "categorical",
        name = colname,
        categories = levels(col),
        values = col,
        rows = rows
      )
    } else {
      stop("attr must be numeric or factor")
    }
  }
  # convert columns
  data <- mapply(toDescription, df, colnames(df), SIMPLIFY = FALSE)
  names(data) <- NULL
  setProperty(upsetjs, "attrs", data)
}

#'
#' adds a new numeric attribute to the plot
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param name name of the attribute
#' @param values the values as a numeric vector
#' @param min_value optional min domain value
#' @param max_value optional max domain value
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   addNumericAttribute("attr", runif(3))
#' @export
addNumericAttribute <- function(upsetjs,
                                name,
                                values,
                                min_value = NULL,
                                max_value = NULL) {
  checkUpSetArgument(upsetjs)
  stopifnot(is.character(name), length(name) == 1)
  stopifnot(is.numeric(values))

  appendProperty(
    upsetjs,
    "attrs",
    list(
      name = name,
      type = "numeric",
      domain = c(if (is.null(min_value)) {
        min(values, na.rm = TRUE)
      } else {
        min_value
      }, if (is.null(max_value)) {
        max(values, na.rm = TRUE)
      } else {
        max_value
      }),
      values = values
    )
  )
}

#'
#' adds a new query to the plot
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @param name name of the attribute
#' @param values the values as a factor
#' @param categories optional categories otherweise the levels are used
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   addCategoricalAttribute("attr", as.factor(sample(c("male", "female"), 3, replace = TRUE)))
#' @export
addCategoricalAttribute <- function(upsetjs,
                                    name,
                                    values, categories = NULL) {
  checkUpSetArgument(upsetjs)
  stopifnot(is.character(name), length(name) == 1)
  stopifnot(is.factor(values))

  appendProperty(
    upsetjs,
    "attrs",
    list(
      name = name,
      type = "categorical",
      categories = if (is.null(categories)) {
        levels(values)
      } else {
        categories
      },
      values = values
    )
  )
}


#'
#' clears the list of attributes for incremental updates
#' @param upsetjs an object of class \code{upsetjs} or \code{upsetjs_proxy}
#' @return the object given as first argument
#' @examples
#' upsetjs() %>%
#'   fromList(list(a = c(1, 2, 3), b = c(2, 3))) %>%
#'   clearAttributes()
#' @export
clearAttributes <- function(upsetjs) {
  checkUpSetArgument(upsetjs)

  setProperty(upsetjs, "attrs", NULL)
}
