library(tidyverse)
library(UpSetR)
library(upsetjs)

# loading example files
toyset_1 <- read_delim(
  file = gzfile("./r_package/tests/testthat/data/toyset_1.tsv.gz"),
  delim = "\t",
  escape_double = FALSE,
  trim_ws = TRUE
) %>%
  data.frame()

toyset_2 <- read_delim(
  file = gzfile("./r_package/tests/testthat/data/toyset_2.tsv.gz"),
  delim = "\t",
  escape_double = FALSE,
  trim_ws = TRUE
) %>%
  data.frame()

# for upsetR aesthetics
count <- toyset_1 %>%
  group_by(attribute1) %>%
  count() %>%
  arrange(attribute1)

# upsetR version of toyset_1
## basic
start <- Sys.time()
upset(
  data = toyset_1,
  sets = c(
    "toy1",
    "toy2",
    "toy3",
    "toy4",
    "toy5",
    "toy6"
  ),
  order.by = "freq",
  set_size.show = TRUE,
  set_size.scale_max = 20000,
)
end <- Sys.time()
cat("Plotted  in", format(end - start), "\n")

## advanced (would be really nice to have such coloring options)
start <- Sys.time()
upset(
  data = toyset_1,
  sets = c(
    "toy1",
    "toy2",
    "toy3",
    "toy4",
    "toy5",
    "toy6"
  ),
  query.legend = "top",
  queries = list(
    list(
      query = elements,
      params = list(
        "attribute1",
        c(
          count[1, 1],
          count[2, 1],
          count[3, 1]
        )
      ),
      active = TRUE,
      color = "#b2df8a",
      query.name = "kin"
    ),
    list(
      query = elements,
      params = list(
        "attribute1",
        c(
          count[3, 1],
          count[2, 1]
        )
      ),
      active = TRUE,
      color = "#1f78b4",
      query.name = "ord"
    ),
    list(
      query = elements,
      params = list(
        "attribute1",
        c(count[3, 1])
      ),
      active = TRUE,
      color = "#a6cee3",
      query.name = "spe"
    )
  ),
  order.by = "freq",
  set_size.show = TRUE,
  set_size.scale_max = 20000
)
end <- Sys.time()
cat("Plotted  in", format(end - start), "\n")

## bigger matrix () 209'301 x 33 (still not that big imho)
start <- Sys.time()
upset(
  toyset_2,
  order.by = "freq",
  set_size.show = TRUE,
  set_size.scale_max = 250000
)
end <- Sys.time()
cat("Plotted  in", format(end - start), "\n")

# upsetjs version of toyset_1
## works nicely
start <- Sys.time()
upsetjs() %>%
  fromDataFrame(toyset_1[,1:6], c_type="distinctIntersection") %>%
  interactiveChart()
end <- Sys.time()
cat("Plotted  in", format(end - start), "\n")

start <- Sys.time()
upset(
 toyset_2,
   order.by = "freq",
   set_size.show = TRUE,
   set_size.scale_max = 250000,
   nsets = 33
)
end <- Sys.time()
cat("Plotted  in", format(end - start), "\n")

# upsetjs version of toyset_2
## last for ages, no idea why... never had the patience to wait until the end
start <- Sys.time()

upsetjs() %>%
  fromDataFrame(toyset_2, c_type="distinctIntersection", store.elems=FALSE, limit = 40) %>%
  interactiveChart()

end <- Sys.time()
cat("Plotted  in", format(end - start), "\n")

# Thanks a lot
