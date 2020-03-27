UpSet.js as R HTMLWidget
========================


UpSet.s is an TODO
This is a [HTMLWidget](http://www.htmlwidgets.org/) wrapper around the JavaScript library [UpSet.js](https://github.com/upsetjs/upsetjs). 

It can be used within standalone [R Shiny](https://shiny.rstudio.com/) apps or [R Markdown](http://rmarkdown.rstudio.com/) files. 
[Crosstalk](https://rstudio.github.io/crosstalk/) is supported for synching selections and filtering among widgets.

Set, Map, Symbol, Symbol.iterator, Array.from, Object.assign, Array.prototype.find
required polyfills: https://polyfill.io/v3/polyfill.min.js?features=Set%2CMap%2CSymbol%2CSymbol.iterator%2CArray.from%2CObject.assign%2CArray.prototype.find

Installation
------------

```R
devtools::install_github("upsetjs/upsetjs_r")
library(upsetjs)
```

Examples
--------

```R

```

```R

```



Advanced Example
----------------

```R

```


Crosstalk Example
-------------

```R
devtools::install_github("jcheng5/d3scatter")
library(d3scatter)
library(crosstalk)

shared_iris = SharedData$new(iris)

d3scatter(shared_iris, ~Petal.Length, ~Petal.Width, ~Species, width="100%")
```

```R

```



Shiny Example
-------------
```R
library(shiny)
library(crosstalk)
library(upsetjs)
library(d3scatter)

# Define UI for application that draws a histogram
ui <- fluidPage(
  titlePanel("UpSet Shiny Example"),

  fluidRow(
    column(5, d3scatterOutput("scatter1")),
    column(7, upsetjsOutput("upset1"))
  )
)

# Define server logic required to draw a histogram
server <- function(input, output) {
  shared_iris <- SharedData$new(iris)

  output$scatter1 <- renderD3scatter({
    d3scatter(shared_iris, ~Petal.Length, ~Petal.Width, ~Species, width = "100%")
  })

  output$upsetjs1 <- renderUpSetJS({
    upsetjs(shared_iris, width = "100%")
  })
}

# Run the application
shinyApp(ui = ui, server = server)
```

