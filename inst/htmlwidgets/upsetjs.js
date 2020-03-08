(function () {
  // HTMLWidgets.shinyMode
  // HTMLWidgets.viewerMode

  function fixSets(sets) {
    if (!sets) {
      return [];
    }
    return UpSetJS.asSets(sets.map(function (set) {
      if (Array.isArray(set.name)) {
        set.name = set.name[0];
      }
      if (Array.isArray(set.cardinality)) {
        set.cardinality = set.cardinality[0];
      }
      if (!Array.isArray(set.elems)) {
        set.elems = [];
      }
      return set;
    }));
  }

  function fixCombinations(combinations, sets) {
    if (!combinations || (Array.isArray(combinations) && combinations.length === 0)) {
      return null;
    }
    return UpSetJS.asCombinations(combinations.map(function (c) {
      if (Array.isArray(c.name)) {
        c.name = c.name[0];
      }
      if (Array.isArray(c.cardinality)) {
        c.cardinality = c.cardinality[0];
      }
      if (Array.isArray(c.degree)) {
        c.degree = c.degree[0];
      }
      if (!Array.isArray(c.elems)) {
        c.elems = [];
      }
      return c;
    }), 'intersection', UpSetJS.fromSetName(sets, '+'));
  }

  HTMLWidgets.widget({
    name: 'upsetjs',
    type: 'output',

    factory: function(el, width, height) {
      const props = {
        sets: [],
        width: width,
        height: height
      };

      const fixProps = function (props, delta) {
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
      }

      const update = function(delta) {
        Object.assign(props, delta);
        fixProps(props, delta);
        UpSetJS.renderUpSet(el, props);
      }

      if (HTMLWidgets.shinyMode) {
        // TODO register event handlers
        props.onClick = function (set) {
          Shiny.onInputChange(outputId + "_click", set ? set.name : null);
        };
        props.onHover = function (set) {
          Shiny.onInputChange(outputId + "_hover", set ? set.name : null);
        };
      }

      el.__update = update;

      return {
        renderValue: function(x) {
          update(x);
        },

        update: update,

        resize: function (width, height) {
          update({
            width: width,
            height: height
          });
        }

      };
    }
  });


  if (HTMLWidgets.shinyMode) {
    Shiny.addCustomMessageHandler("upsetjs-update", function (msg) {
      const el = document.getElementById(msg.id);
      if (typeof el.__update === 'function') {
        el.__update(msg.props);
      }
    });
  }
})();

