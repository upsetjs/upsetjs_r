
library(shiny)
library(crosstalk)
library(upsetjs)

listInput <- list(
  one = c(1, 2, 3, 5, 7, 8, 11, 12, 13),
  two = c(1, 2, 4, 5, 10),
  three = c(1, 5, 6, 7, 8, 9, 10, 12, 13)
)
 # create `crosstalk` R6 object
shared_listInput <- crosstalk::SharedData$new(listInput)

ui <- fluidPage(
  titlePanel("UpSet.js Shiny `crosstalk` Example"),
  upsetjsOutput("upsetjs_upset"),
  upsetjsOutput("upsetjs_euler"),
  upsetjsOutput("upsetjs_venn"),
  upsetjsOutput("upsetjs_karnaugh"),
)

server <- function(input, output, session) {

  shared.mode <- "hover" # otherwise default is "click"

  output$upsetjs_upset <- renderUpsetjs({
    upsetjs() %>%
      fromList(listInput,
               shared.mode = shared.mode,
               shared = shared_listInput
               ) %>%
      interactiveChart()
  })
  output$upsetjs_euler <- renderUpsetjs({
    upsetjsEulerDiagram() %>%
      fromList(listInput,
               shared.mode = shared.mode,
               shared = shared_listInput
               ) %>%
      interactiveChart()
  })
  output$upsetjs_venn <- renderUpsetjs({
    upsetjsVennDiagram() %>%
      fromList(listInput,
               shared.mode = shared.mode,
               shared = shared_listInput
               ) %>%
      interactiveChart()
  })
  output$upsetjs_karnaugh <- renderUpsetjs({
    upsetjsKarnaughMap() %>%
      fromList(listInput,
               shared.mode = shared.mode,
               shared = shared_listInput
               ) %>%
      interactiveChart()
  })
}

# Run the application
shinyApp(ui = ui, server = server)