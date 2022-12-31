library(dash)
library(dashCoreComponents)
library(dashHtmlComponents)
library(upsetjs)

app <- Dash$new()

app$layout(
  htmlDiv(
    list(
      htmlH1("Hello UpSet.js + Dash"),
      upsetjsDash(id = "upset") %>% fromList(list(a = c(1, 2, 3), b = c(2, 3)))
        %>% interactiveChart(),
      htmlDiv(id = "output")
    )
  )
)
app$callback(
  output = list(id = "output", property = "children"),
  params = list(input(id = "upset", property = "selection")),
  function(selection) {
    sprintf("You selected \"%s\"", selection$name)
  }
)

app$run_server()
