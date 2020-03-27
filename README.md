# UpSet.js as R HTMLWidget
[![Github Actions][github-actions-image]][github-actions-url]


This is a [HTMLWidget](http://www.htmlwidgets.org/) wrapper around the JavaScript library [UpSet.js](https://github.com/upsetjs/upsetjs) and an alternative implementation of [UpSetR](https://www.rdocumentation.org/packages/UpSetR).

## Installation

```R
devtools::install_github("upsetjs/upsetjs_r")
library(upsetjs)
```

## Example

```R
listInput <- list(one = c(1, 2, 3, 5, 7, 8, 11, 12, 13), two = c(1, 2, 4, 5, 10), three = c(1, 5, 6, 7, 8, 9, 10, 12, 13))
upsetjs() %>% fromList(listInput) %>% interactiveChart()
```

![image](https://user-images.githubusercontent.com/4129778/77757309-4a458580-7031-11ea-972a-226a6058777c.png)


see also Basic.Rmd


## Shiny Example

```R
library(shiny)
library(upsetjs)

listInput <- list(one = c(1, 2, 3, 5, 7, 8, 11, 12, 13),
                  two = c(1, 2, 4, 5, 10),
                  three = c(1, 5, 6, 7, 8, 9, 10, 12, 13))

ui <- fluidPage(
  titlePanel("UpSet.js Shiny Example"),
  upsetjsOutput("upsetjs1"),
)

server <- function(input, output, session) {
  # render upsetjs as interactive plot
  output$upsetjs1 <- renderUpsetjs({
    upsetjs() %>% fromList(listInput) %>% interactiveChart()
  })
}

# Run the application
shinyApp(ui = ui, server = server)

```

## Dev Environment

```sh
npm i -g yarn
yarn set version berry
yarn install
yarn pnpify --sdk
```

### Building

```
yarn lint
yarn build
```

### R Package

```R
devtools::document()
devtools::build_vignettes()

devtools::load_all()
```

## License

### Commercial license

If you want to use Upset.js for a commercial application the commercial license is the appropriate license. With this option, your source code is kept proprietary. Contact @sgratzl for details

### Open-source license

GNU AGPLv3

[github-actions-image]: https://github.com/sgratzl/upsetjs_r/workflows/ci/badge.svg
[github-actions-url]: https://github.com/sgratzl/upsetjs_r/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen
