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
  upsetjsOutput("upsetjs1"),
  fluidRow(
    column(2, "Hovered Set"),
    column(2, textOutput("hovered")),
    column(8, textOutput("hoveredElements"))
  ),
  fluidRow(
    column(2, "Clicked Set"),
    column(2, textOutput("clicked")),
    column(8, textOutput("clickedElements"))
  )
)

server <- function(input, output, session) {

  output$hovered <- renderText({
    # hover event: <id>_hover -> list(name="NAME" or NULL, elems=c(...))
    input$upsetjs1_hover$name
  })
  output$hoveredElements <- renderText({
    as.numeric(input$upsetjs1_hover$elems)
  })
  output$clicked <- renderText({
    # click event: <id>_hover -> list(name="NAME" or NULL, elems=c(...))
    input$upsetjs1_click$name
  })
  output$clickedElements <- renderText({
    as.numeric(input$upsetjs1_click$elems)
  })

  # render upsetjs as interactive plot
  output$upsetjs1 <- renderUpsetjs({
    upsetjs() %>% fromList(listInput) %>% interactiveChart()
  })
}

# Run the application
shinyApp(ui = ui, server = server)

