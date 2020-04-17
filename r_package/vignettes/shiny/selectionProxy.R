#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
library(upsetjs)

listInput <- list(one = c(1, 2, 3, 5, 7, 8, 11, 12, 13),
                  two = c(1, 2, 4, 5, 10),
                  three = c(1, 5, 6, 7, 8, 9, 10, 12, 13))

ui <- fluidPage(
  titlePanel("UpSet.js Shiny Example"),
  radioButtons("set", label = "Set to highlight", choices = c("one", "two", "three")),
  upsetjsOutput("upsetjs1")
)

server <- function(input, output, session) {

  observeEvent(input$set, {
    # using a proxy for inline updates
    upsetjsProxy("upsetjs1", session) %>% setSelection(input$set)
  })

  # render upsetjs as interactive plot
  output$upsetjs1 <- renderUpsetjs({
    upsetjs() %>% fromList(listInput)
  })
}

# Run the application
shinyApp(ui = ui, server = server)

