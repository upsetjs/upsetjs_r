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


test_that("fromList", {
  listInput <- list(one = c('a', 'b', 'c', 'e', 'g', 'h', 'k', 'l', 'm'), two = c('a', 'b', 'd', 'e', 'j'), three = c('a', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm'))

  sets <- upsetjs_mock() %>% fromList(listInput) %>% getSets()
  expect_equal(length(sets), 0)
  expect_equal(2, 2)
})
