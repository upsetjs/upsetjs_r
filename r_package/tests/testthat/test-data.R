upsetjs_mock = function() {
  x = structure(list(mode = 'hover',
                     sets = c()))

  r = list(
    x=x,
    package = 'upsetjs'
  )
  class(r) = c(class(r), 'upsetjs_common', 'upsetjs_upset')
  r
}

expect_set = function(s, name, cardinality) {
  expect_equal(s$name, name)
  expect_equal(s$cardinality, cardinality)
}


test_that("fromList", {
  listInput = list(one = c('a', 'b', 'c', 'e', 'g', 'h', 'k', 'l', 'm'), two = c('a', 'b', 'd', 'e', 'j'), three = c('a', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm'))

  u = upsetjs_mock() %>% fromList(listInput, order.by='degree')
  sets = u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], 'one', 9)
  expect_set(sets[[2]], 'three', 9)
  expect_set(sets[[3]], 'two', 5)

  cc = u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], 'one', 9)
  expect_set(cc[[2]], 'three', 9)
  expect_set(cc[[3]], 'two', 5)
  expect_set(cc[[4]], 'one&three', 6)
  expect_set(cc[[5]], 'one&two', 3)
  expect_set(cc[[6]], 'two&three', 3)
  expect_set(cc[[7]], 'one&two&three', 2)  
})

test_that("fromExpression", {
  expressionInput <- list(one = 9, two = 5, three = 9, `one&two` = 3, `one&three` = 6, `two&three` = 3, `one&two&three` = 2)

  u = upsetjs_mock() %>% fromExpression(expressionInput, order.by='degree')
  sets = u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], 'one', 9)
  expect_set(sets[[2]], 'three', 9)
  expect_set(sets[[3]], 'two', 5)

  cc = u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], 'one', 9)
  expect_set(cc[[2]], 'three', 9)
  expect_set(cc[[3]], 'two', 5)
  expect_set(cc[[4]], 'one&three', 6)
  expect_set(cc[[5]], 'one&two', 3)
  expect_set(cc[[6]], 'two&three', 3)
  expect_set(cc[[7]], 'one&two&three', 2)  
})

test_that("fromDataFrame", {
  dataFrame <- as.data.frame(list(
    one=c(1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1),
    two=c(1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0),
    three=c(1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1)),
    row.names=c('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'))

  u = upsetjs_mock() %>% fromDataFrame(dataFrame, order.by='degree')
  sets = u %>% getSets()
  expect_equal(length(sets), 3)
  expect_set(sets[[1]], 'one', 9)
  expect_set(sets[[2]], 'three', 9)
  expect_set(sets[[3]], 'two', 5)

  cc = u %>% getCombinations()
  expect_equal(length(cc), 7)
  expect_set(cc[[1]], 'one', 9)
  expect_set(cc[[2]], 'two', 9)
  expect_set(cc[[3]], 'three', 5)
  expect_set(cc[[4]], 'one&three', 6)
  expect_set(cc[[5]], 'one&two', 3)
  expect_set(cc[[6]], 'three&two', 3)
  expect_set(cc[[7]], 'one&three&two', 2)  
})
