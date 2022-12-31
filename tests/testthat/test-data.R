#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

test_that("fromList", {
  listInput <- list(one = c("a", "b", "c", "e", "g", "h", "k", "l", "m"), two = c("a", "b", "d", "e", "j"), three = c("a", "e", "f", "g", "h", "i", "j", "l", "m"))

  u <- upsetjs_mock() %>% fromList(listInput, order.by = "degree")
  sets <- u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], "one", 9)
  expect_set(sets[[2]], "three", 9)
  expect_set(sets[[3]], "two", 5)

  cc <- u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], "one", 9)
  expect_set(cc[[2]], "three", 9)
  expect_set(cc[[3]], "two", 5)
  expect_set(cc[[4]], "one&three", 6)
  expect_set(cc[[5]], "one&two", 3)
  expect_set(cc[[6]], "three&two", 3)
  expect_set(cc[[7]], "one&three&two", 2)
})

test_that("fromList - union", {
  listInput <- list(one = c("a", "b", "c", "e", "g", "h", "k", "l", "m"), two = c("a", "b", "d", "e", "j"), three = c("a", "e", "f", "g", "h", "i", "j", "l", "m"))

  u <- upsetjs_mock() %>% fromList(listInput, order.by = "degree", c_type = "union")
  sets <- u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], "one", 9)
  expect_set(sets[[2]], "three", 9)
  expect_set(sets[[3]], "two", 5)

  cc <- u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], "one", 9)
  expect_set(cc[[2]], "three", 9)
  expect_set(cc[[3]], "two", 5)
  expect_set(cc[[4]], "one&three", 12)
  expect_set(cc[[5]], "one&two", 11)
  expect_set(cc[[6]], "three&two", 11)
  expect_set(cc[[7]], "one&three&two", 13)
})

test_that("fromList - distinctIntersection", {
  listInput <- list(one = c("a", "b", "c", "e", "g", "h", "k", "l", "m"), two = c("a", "b", "d", "e", "j"), three = c("a", "e", "f", "g", "h", "i", "j", "l", "m"))

  u <- upsetjs_mock() %>% fromList(listInput, order.by = "degree", c_type = "distinctIntersection")
  sets <- u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], "one", 9)
  expect_set(sets[[2]], "three", 9)
  expect_set(sets[[3]], "two", 5)

  cc <- u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], "one", 2)
  expect_set(cc[[2]], "three", 2)
  expect_set(cc[[3]], "two", 1)
  expect_set(cc[[4]], "one&three", 4)
  expect_set(cc[[5]], "one&two", 1)
  expect_set(cc[[6]], "three&two", 1)
  expect_set(cc[[7]], "one&three&two", 2)
})

test_that("fromExpression", {
  expressionInput <- list(one = 9, two = 5, three = 9, `one&two` = 3, `one&three` = 6, `two&three` = 3, `one&two&three` = 2)

  u <- upsetjs_mock() %>% fromExpression(expressionInput, order.by = "degree")
  sets <- u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], "one", 9, check.length = FALSE)
  expect_set(sets[[2]], "three", 9, check.length = FALSE)
  expect_set(sets[[3]], "two", 5, check.length = FALSE)

  cc <- u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], "one", 9, check.length = FALSE)
  expect_set(cc[[2]], "three", 9, check.length = FALSE)
  expect_set(cc[[3]], "two", 5, check.length = FALSE)
  expect_set(cc[[4]], "one&three", 6, check.length = FALSE)
  expect_set(cc[[5]], "one&two", 3, check.length = FALSE)
  expect_set(cc[[6]], "two&three", 3, check.length = FALSE)
  expect_set(cc[[7]], "one&two&three", 2, check.length = FALSE)
})

test_that("fromDataFrame", {
  dataFrame <- as.data.frame(
    list(
      one = c(1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1),
      two = c(1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0),
      three = c(1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1)
    ),
    row.names = c("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m")
  )

  u <- upsetjs_mock() %>% fromDataFrame(dataFrame, order.by = "degree")
  sets <- u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], "one", 9)
  expect_set(sets[[2]], "three", 9)
  expect_set(sets[[3]], "two", 5)

  cc <- u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], "one", 9)
  expect_set(cc[[2]], "three", 9)
  expect_set(cc[[3]], "two", 5)
  expect_set(cc[[4]], "one&three", 6)
  expect_set(cc[[5]], "one&two", 3)
  expect_set(cc[[6]], "three&two", 3)
  expect_set(cc[[7]], "one&three&two", 2)
})

test_that("fromDataFrame - union", {
  dataFrame <- as.data.frame(
    list(
      one = c(1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1),
      two = c(1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0),
      three = c(1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1)
    ),
    row.names = c("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m")
  )

  u <- upsetjs_mock() %>% fromDataFrame(dataFrame, order.by = "degree", c_type = "union")
  sets <- u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], "one", 9)
  expect_set(sets[[2]], "three", 9)
  expect_set(sets[[3]], "two", 5)

  cc <- u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], "one", 9)
  expect_set(cc[[2]], "three", 9)
  expect_set(cc[[3]], "two", 5)
  expect_set(cc[[4]], "one&three", 12)
  expect_set(cc[[5]], "one&two", 11)
  expect_set(cc[[6]], "three&two", 11)
  expect_set(cc[[7]], "one&three&two", 13)
})

test_that("fromDataFrame - distinctIntersection", {
  dataFrame <- as.data.frame(
    list(
      one = c(1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1),
      two = c(1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0),
      three = c(1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1)
    ),
    row.names = c("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m")
  )

  u <- upsetjs_mock() %>% fromDataFrame(dataFrame, c_type = "distinctIntersection", order.by = "degree")
  sets <- u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], "one", 9)
  expect_set(sets[[2]], "three", 9)
  expect_set(sets[[3]], "two", 5)

  cc <- u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], "one", 2)
  expect_set(cc[[2]], "three", 2)
  expect_set(cc[[3]], "two", 1)
  expect_set(cc[[4]], "one&three", 4)
  expect_set(cc[[5]], "one&two", 1)
  expect_set(cc[[6]], "three&two", 1)
  expect_set(cc[[7]], "one&three&two", 2)
})
