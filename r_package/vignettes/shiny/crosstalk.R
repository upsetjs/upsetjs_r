#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
library(crosstalk)
library(plotly)
library(upsetjs)

movies <- read.csv( system.file("extdata", "movies.csv", package = "UpSetR"), header=T, sep=";" )
rownames(movies) <- movies$Name

ds <- SharedData$new(movies)

ui <- fluidPage(
  titlePanel("UpSet.js Shiny Example"),
  upsetjsOutput("upsetjs1"),
  plotlyOutput("plotly1")
)

server <- function(input, output, session) {
  # render upsetjs as interactive plot
  output$upsetjs1 <- renderUpsetjs({
    upsetjs() %>% fromDataFrame(movies[,3:16], limit=5, shared=ds)
  })
  output$plotly1 <- renderPlotly({
    plot_ly(ds, x=~AvgRating, y=~Watches, type="scatter", mode="markers")
  })
}

# Run the application
shinyApp(ui = ui, server = server)

