#
# @upsetjs/r
# https://github.com/upsetjs/upsetjs_r
#
# Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
#

got = as.data.frame(read.csv('./data-raw/got.csv', row.names=1))
usethis::use_data(got, compress="bzip2", overwrite = TRUE)
