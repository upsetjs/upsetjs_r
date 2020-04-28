#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
#


#' reexport operator
#'
#' @importFrom magrittr %>%
#' @param lhs	A value or the magrittr placeholder.
#' @param rhs	A function call using the magrittr semantics.
#'
#' @export
`%>%` <- magrittr::`%>%`
