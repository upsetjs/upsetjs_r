library(shiny)
library(upsetjs)
library(purrr)
library(dplyr)

set_list_2_combinations <- function(set_list) {
  set_list <- set_list[
    order(purrr::map_int(set_list, length), decreasing = TRUE)
    ]
  set_names <- names(set_list)
  purrr::map(seq_along(set_names), ~{
    lst <- combn(set_names, .x) %>% as.data.frame() %>% as.list()
    names(lst) <- purrr::map_chr(lst, ~paste0(.x, collapse = "&"))
    lst
  }) %>% unlist(recursive = FALSE)
}

set_list <- list("A" = c(1,2,3,4,5),"B" = c(1,2,3),"C" = c(2,6,7,8))
combinations <- c(list("none" = ""), set_list_2_combinations(set_list))

# reactive values ----
# I next tried a compromise still re-rendering the plot in place of proxy
# but with a reactive value that would respond to clicks in place of a direct
# input - this also did not work
ui <- fluidPage(
  shiny::sidebarLayout(
    shiny::sidebarPanel(
      actionButton("reset_selection", "Reset Selection"),
      verbatimTextOutput("selection")
    ),
    shiny::mainPanel(
      upsetjs::upsetjsOutput("upset_plot")
    )
  )
)

server <- function(input, output, session) {

  output$upset_plot <- upsetjs::renderUpsetjs({
    upsetjs::upsetjs() %>%
      upsetjs::fromList(set_list) %>%
      upsetjs::interactiveChart('click', events_nonce = TRUE)
  })

  upset_selection <- reactiveValues(selected_sets = '')

  observeEvent(upset_selection$selected_sets, {
    upsetjs::upsetjsProxy('upset_plot', session) %>%
      upsetjs::setSelection(upset_selection$selected_sets)
  })


  observeEvent(input$upset_plot_click, {
    if(isTRUE(input$upset_plot_click[['isSelected']])) {
      upset_selection$selected_sets <- ''
    } else {
      upset_selection$selected_sets <- input$upset_plot_click
    }
  })

  observeEvent(input$reset_selection, {
    upset_selection$selected_sets <- ''
  })

  # debug info
  output$selection <- renderText({
    jsonlite::toJSON(upset_selection$selected_sets)
  })
}

shinyApp(ui, server)
