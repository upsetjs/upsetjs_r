# UpSet.js as R HTMLWidget

[![Github Actions][github-actions-image]][github-actions-url]

This is a [HTMLWidget](http://www.htmlwidgets.org/) wrapper around the JavaScript library [UpSet.js](https://github.com/upsetjs/upsetjs) and an alternative implementation of [UpSetR](https://www.rdocumentation.org/packages/UpSetR).

This package is part of the UpSet.js ecosystem located at the main [Github Monorepo](https://github.com/upsetjs/upsetjs).

## Installation

```R
devtools::install_github("upsetjs/upsetjs_r")
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

see also [Shiny Examples](./master/vignettes/shiny)

## Dev Environment

```sh
npm i -g yarn
yarn set version berry
yarn install
yarn pnpify --sdk
```

### Building

```
yarn lint
yarn build
```

### R Package

Notes:

- in windows it requires the R tools. e.g., `$env:PATH="C:/Users/sam/Anaconda3/Rtools/mingw_64/bin;C:/Users/sam/Anaconda3/Rtools/bin;$env:PATH"`
- R is stupid when coming to ignoring files during build. Thus `.yarn` and `node_modules` directories need to removed prior to the build. e.g.,
  ```sh
  mkdir ../upsetjs_r_t
  mv .yarn ../upsetjs_r_t/
  mv node_modules ../upsetjs_r_t/
  ```

```R
devtools::check()
devtools::build()

devtools::load_all()
```

**R Package Website**

```R
devtools::build_site()
```

checkout the gh-pages branch or switch to its worktree

```sh`
git worktree add ../upsetjs_r_pages -b gh-pages

````

update the website

```sh
cd ../upsetjs_r_pages
rm *
cp ../upsetjs_r/docs .
git commit -am 'update website'
git push
````

## License

### Commercial license

If you want to use Upset.js for a commercial application the commercial license is the appropriate license. Contact [@sgratzl](mailto:sam@sgratzl.com) for details.

### Open-source license

This library is released under the `GNU AGPLv3` version to be used for private and academic purposes. In case of a commercial use, please get in touch regarding a commercial license.

[github-actions-image]: https://github.com/upsetjs/upsetjs_r/workflows/ci/badge.svg
[github-actions-url]: https://github.com/upsetjs/upsetjs_r/actions
[codepen]: https://img.shields.io/badge/CodePen-open-blue?logo=codepen
