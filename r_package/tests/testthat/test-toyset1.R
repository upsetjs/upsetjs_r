#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

toyset_1 = as.data.frame(read.delim(
  file = testthat::test_path("data", "toyset_1.tsv.gz"),
  sep = "\t"
))[,1:6]


test_that("toyset1 distinct", {
  expect_equal(nrow(toyset_1), 24152)
  expect_equal(ncol(toyset_1), 6)

  u = upsetjs_mock() %>% fromDataFrame(toyset_1, c_type = 'distinctIntersection')

  sets = u %>% getSets()
  expect_equal(length(sets), 6)

  combinations = u %>% getCombinations()
  expect_equal(length(combinations), 37)
})

test_that("toyset1 intersection", {
  expect_equal(nrow(toyset_1), 24152)
  expect_equal(ncol(toyset_1), 6)

  u = upsetjs_mock() %>% fromDataFrame(toyset_1, c_type = 'intersection')

  sets = u %>% getSets()
  expect_equal(length(sets), 6)

  combinations = u %>% getCombinations()
  expect_equal(length(combinations), 63)
})
