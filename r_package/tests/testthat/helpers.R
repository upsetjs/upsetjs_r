#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
#

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