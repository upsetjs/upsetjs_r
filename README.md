UpSet.js as R HTMLWidget
========================

This is a [HTMLWidget](http://www.htmlwidgets.org/) wrapper around the JavaScript library [UpSet.js](https://github.com/upsetjs/upsetjs). 

[Crosstalk](https://rstudio.github.io/crosstalk/) is supported for synching selections and filtering among widgets.

Installation
------------

```R
devtools::install_github("upsetjs/upsetjs_r")
library(upsetjs)
```

Examples
--------

```R
listInput <- list(one = c(1, 2, 3, 5, 7, 8, 11, 12, 13), two = c(1, 2, 4, 5, 10), three = c(1, 5, 6, 7, 8, 9, 10, 12, 13))
upsetjs() %>% fromList(listInput)
```

see Basic.Rmd


Shiny Example
-------------
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

Development Environment
-----------------------

```sh
npm i -g yarn
yarn set version berry
yarn
yarn lint
yarn build
```

```R
devtools::load_all()
```

