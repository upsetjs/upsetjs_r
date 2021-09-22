#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

toyset_2 <- as.data.frame(read.delim(
  file = testthat::test_path("data", "toyset_2.tsv.gz"),
  sep = "\t"
))

# test_that("toyset_2 distinct", {
#   u = upsetjs_mock() %>% fromDataFrame(toyset_2, c_type = 'distinctIntersection')
#   sets = u %>% getSets()
#   expect_equal(length(sets), 7)
# })

# test_that("toyset_2 intersection", {
#   u = upsetjs_mock() %>% fromDataFrame(toyset_2, c_type = 'intersection')
#   sets = u %>% getSets()
#   expect_equal(length(sets), 7)
# })
