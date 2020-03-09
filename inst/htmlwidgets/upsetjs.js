(function() {
  // HTMLWidgets.shinyMode
  // HTMLWidgets.viewerMode

  function fixSets(sets) {
    if (!sets) {
      return [];
    }
    return UpSetJS.asSets(
      sets.map(function(set) {
        if (!Array.isArray(set.elems)) {
          set.elems = set.elems == null ? [] : [set.elems];
        }
        return set;
      })
    );
  }

  function generateCombinations(options, sets) {
    const gen =
      options.mode === "union"
        ? UpSetJS.generateUnions
        : UpSetJS.generateIntersections;

    const combinations = gen(sets, options);
    if (options.order == "freq") {
      combinations.sort(function(a, b) {
        return b.cardinality - a.cardinality;
      });
    } else if (options.order == "degree") {
      combinations.sort(function(a, b) {
        return b.degree - a.degree;
      });
    }

    if (options.limit) {
      return combinations.slice(0, options.limit);
    }

    return combinations;
  }

  function fixCombinations(combinations, sets) {
    if (
      !combinations ||
      (Array.isArray(combinations) && combinations.length === 0)
    ) {
      return null;
    }
    if (!Array.isArray(combinations)) {
      // generator mode
      return generateCombinations(combinations, sets);
    }
    const lookup = new Map(
      sets.map(function(s) {
        return [s.name, s];
      })
    );
    return UpSetJS.asCombinations(
      combinations.map(function(set) {
        if (!Array.isArray(set.elems)) {
          set.elems = set.elems == null ? [] : [set.elems];
        }
        if (!Array.isArray(set.setNames)) {
          set.setNames = set.setNames == null ? [] : [set.setNames];
        }
        return set;
      }),
      "composite",
      function(s) {
        return s.setNames
          .map(function(si) {
            return lookup.get(si);
          })
          .filter(Boolean);
      }
    );
  }

  function resolveSelection(selection, sets, combinations) {
    const s = sets.find(function(s) {
      return s.name === selection;
    });
    if (s) {
      return s;
    }
    const combinedNames = Array.isArray(selection)
      ? selection
          .slice()
          .sort()
          .join("&")
      : null;
    const c = combinations.find(function(c) {
      return (
        c.name === selection ||
        (combinedNames &&
          combinedNames ===
            Array.from(c.sets)
              .sort()
              .join("&"))
      );
    });
  }

  HTMLWidgets.widget({
    name: "upsetjs",
    type: "output",

    factory: function(el, width, height) {
      const props = {
        sets: [],
        width: width,
        height: height
      };

      const fixProps = function(props, delta) {
        if (delta.sets != null) {
          props.sets = fixSets(props.sets);
        }
        if (delta.combinations != null) {
          const c = fixCombinations(props.combinations, props.sets);
          if (c == null) {
            delete props.combinations;
          } else {
            props.combinations = c;
          }
        }
        if (typeof props.selection === "string") {
          props.selection = resolveSelection(
            props.selection,
            props.sets,
            props.combinations
          );
        }
      };

      const update = function(delta) {
        Object.assign(props, delta);
        fixProps(props, delta);
        UpSetJS.renderUpSet(el, props);
      };

      if (HTMLWidgets.shinyMode) {
        // TODO register event handlers
        props.onClick = function(set) {
          Shiny.onInputChange(outputId + "_click", set ? set.namk : null);
        };
        props.onHover = function(set) {
          Shiny.onInputChange(outputId + "_hover", set ? set.name : null);
        };
      }

      el.__update = update;

      return {
        renderValue: function(x) {
          update(x);
        },

        update: update,

        resize: function(width, height) {
          update({
            width: width,
            height: height
          });
        }
      };
    }
  });

  if (HTMLWidgets.shinyMode) {
    Shiny.addCustomMessageHandler("upsetjs-update", function(msg) {
      const el = document.getElementById(msg.id);
      if (typeof el.__update === "function") {
        el.__update(msg.props);
      }
    });
  }
})();
