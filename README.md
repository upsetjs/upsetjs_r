# UpSet.js as R HTMLWidget

[![CRAN][cran-image]][cran-url] [![Github Actions][github-actions-image]][github-actions-url] [![Open in Binder][binder]][binder-r-url] [![Open Docs][docs]][docs-r-url] [![Open example][example]][example-r-url]

This is a [HTMLWidget](https://www.htmlwidgets.org/) and [Plot.ly Dash](https://dash.plotly.com/r) wrapper around the JavaScript library [UpSet.js](https://github.com/upsetjs/upsetjs) and an alternative implementation of [UpSetR](https://www.rdocumentation.org/packages/UpSetR).

This package is part of the UpSet.js ecosystem located at the main [Github Monorepo](https://github.com/upsetjs/upsetjs).

## Installation

```R
# CRAN version
install.packages('upsetjs')
# or
devtools::install_url("https://github.com/upsetjs/upsetjs_r/releases/latest/download/upsetjs.tar.gz")

library(upsetjs)
```

## Example

```R
listInput <- list(one = c(1, 2, 3, 5, 7, 8, 11, 12, 13), two = c(1, 2, 4, 5, 10), three = c(1, 5, 6, 7, 8, 9, 10, 12, 13))
upsetjs() %>% fromList(listInput) %>% interactiveChart()
```

![List Input Example](https://user-images.githubusercontent.com/4129778/79375541-10dda700-7f59-11ea-933a-a3ffbca1bfd2.png)

see also [UpSetJS.Rmd](./master/vignettes/upsetjs.Rmd)

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

![shiny](https://user-images.githubusercontent.com/4129778/79375695-51d5bb80-7f59-11ea-8437-40fa60ce425c.png)

see also [Shiny Examples](./main/shiny)

## Dash Example

```R
library(dash)
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
```

TODO

see also [Dash Examples](./main/dash)

## Documentation

the package documentation is located at [![Open Docs][docs]][docs-r-url]. An introduction vignette is at [![Open Vignette][example]][example-r-url].

## Venn Diagram

Besides the main UpSet.js plot also Venn Diagrams for up to five sets are supported. It uses the same input formats and has similar functionality in terms of interaction.

```R
listInput <- list(one = c(1, 2, 3, 5, 7, 8, 11, 12, 13), two = c(1, 2, 4, 5, 10), three = c(1, 5, 6, 7, 8, 9, 10, 12, 13))
upsetjsVennDiagram() %>% fromList(listInput) %>% interactiveChart()
```

![image](https://user-images.githubusercontent.com/4129778/84817608-8a574b80-b015-11ea-91b8-2ff17bb533e4.png)

see also [Venn.Rmd](./master/vignettes/venn.Rmd)

## Karnaugh Maps Diagram

Besides the main UpSet.js plot also a variant of a Karnaugh Map is supported. It uses the same input formats and has similar functionality in terms of interaction.

```R
listInput <- list(one = c(1, 2, 3, 5, 7, 8, 11, 12, 13), two = c(1, 2, 4, 5, 10), three = c(1, 5, 6, 7, 8, 9, 10, 12, 13))
upsetjsKarnaughMap() %>% fromList(listInput) %>% interactiveChart()
```

![image](https://user-images.githubusercontent.com/4129778/86348506-09789080-bc60-11ea-9ed0-be0560269f7f.png)

see also [KMap.Rmd](./master/vignettes/kmap.Rmd)

## Dev Environment

requirements:

- R with packages: devtools, pkgdown
- pandoc

```sh
npm i -g yarn
yarn install
yarn sdks vscode
```

### Building

```sh
yarn lint
yarn build
```

### R Package

```sh
yarn style:r
yarn lint:r
yarn check:r
yarn build:r
```

or in R

```R
devtools::load_all()
styler::style_pkg()
lintr::lint_pkg()
devtools::check()
devtools::document()
devtools::build()
```

**R Package Website**

will be automatically updated upon push

```sh
yarn docs:r
```

or in R

```R
devtools::build_site()
```

## Release

use `release-it`

```sh
yarn release
Rscript -e "devtools::release()"
```

## Privacy Policy

UpSet.js is a client only library. The library or any of its integrations doesn't track you or transfers your data to any server. The uploaded data in the app are stored in your browser only using IndexedDB. The Tableau extension can run in a sandbox environment prohibiting any server requests. However, as soon as you export your session within the app to an external service (e.g., Codepen.io) your data will be transferred.

## License / Terms of Service

### Commercial license

If you want to use UpSet.js for a commercial application or in a commercial environment, the commercial license is the appropriate license. Contact [@sgratzl](mailto:sam@sgratzl.com) for details.

### Open-source license

This library is released under the `GNU AGPLv3` version to be used for private and academic purposes.
In case of a commercial use, please get in touch regarding a commercial license.

[github-actions-image]: https://github.com/upsetjs/upsetjs_r/workflows/ci/badge.svg
[github-actions-url]: https://github.com/upsetjs/upsetjs_r/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen
[binder]: https://mybinder.org/badge_logo.svg
[binder-r-url]: https://mybinder.org/v2/gh/upsetjs/upsetjs_r/master?urlpath=rstudio
[docs]: https://img.shields.io/badge/API-open-blue
[docs-r-url]: https://upset.js.org/integrations/r/
[example]: https://img.shields.io/badge/Example-open-red
[example-r-url]: https://upset.js.org/integrations/r/articles/upsetjs.html
[cran-image]: https://img.shields.io/cran/v/upsetjs
[cran-url]: https://www.rdocumentation.org/packages/upsetjs
