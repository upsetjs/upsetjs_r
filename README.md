# UpSet.js as R HTMLWidget

[![CRAN][cran-image]][cran-url] [![Github Actions][github-actions-image]][github-actions-url] [![Open in Binder][binder]][binder-r-url] [![Open Docs][docs]][docs-r-url] [![Open example][example]][example-r-url]

This is a [HTMLWidget](http://www.htmlwidgets.org/) wrapper around the JavaScript library [UpSet.js](https://github.com/upsetjs/upsetjs) and an alternative implementation of [UpSetR](https://www.rdocumentation.org/packages/UpSetR).

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

see also [Basic.Rmd](./master/vignettes/basic.Rmd)

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

see also [Shiny Examples](./master/shiny)

## Dev Environment

requirements:

- R with packages: devtools, pkgdown
- pandoc

```sh
npm i -g yarn
yarn set version berry
yarn install
yarn pnpify --sdk
```

### Building

```sh
yarn lint
yarn build
```

### R Package

```sh
yarn check:r
yarn build:r
```

or in R

```R
devtools::check("r_package")
devtools::document("r_package")
devtools::build("r_package")
devtools::load_all("r_package")
```

**R Package Website**

will be automatically updated upon push

```sh
yarn docs:r
```

or in R

```R
devtools::build_site("r_package)
```

## Release

use `release-it`

```sh
yarn release:major
yarn release:minor
yarn release:patch
```

## Privacy Policy

UpSet.js is a client only library. The library or any of its integrations doesn't track you or transfers your data to any server. The uploaded data in the app are stored in your browser only using IndexedDB. The Tableau extension can run in a sandbox environment prohibiting any server requests. However, as soon as you export your session within the app to an external service (e.g., Codepen.io) your data will be transferred.

## License / Terms of Service

### Commercial license

If you want to use Upset.js for a commercial application the commercial license is the appropriate license. Contact [@sgratzl](mailto:sam@sgratzl.com) for details.

### Open-source license

This library is released under the `GNU AGPLv3` version to be used for private and academic purposes. In case of a commercial use, please get in touch regarding a commercial license.

[github-actions-image]: https://github.com/upsetjs/upsetjs_r/workflows/ci/badge.svg
[github-actions-url]: https://github.com/upsetjs/upsetjs_r/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen
[binder]: https://mybinder.org/badge_logo.svg
[binder-r-url]: https://mybinder.org/v2/gh/upsetjs/upsetjs_r/master?urlpath=rstudio
[docs]: https://img.shields.io/badge/API-open-blue
[docs-r-url]: https://upset.js.org/integrations/r
[example]: https://img.shields.io/badge/Example-open-red
[example-r-url]: https://upset.js.org/integrations/r/articles/basic
[cran-image]: https://img.shields.io/cran/v/upsetjs
[cran-url]: https://www.rdocumentation.org/packages/upsetjs
