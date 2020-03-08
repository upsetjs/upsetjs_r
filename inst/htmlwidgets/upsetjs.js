(function () {
  function assign(target, source1, source2) {
    for (var key in source1) {
      target[key] = source1[key];
    }
    if (source2) {
      return assign(target, source2);
    }
    return target;
  }

  // HTMLWidgets.shinyMode
  // HTMLWidgets.viewerMode

  HTMLWidgets.widget({
    name: 'upsetjs',
    type: 'output',

    factory: function(el, width, height) {
      const props = {
        sets: UpSetJS.extractSets([{sets: ['A']}, {sets: ['A', 'B']}]),
        width: width,
        height: height
      };

      const update = function(delta) {
        assign(props, delta);
        props.sets = UpSetJS.extractSets([{ sets: ['A'] }, { sets: ['A', 'B'] }]);
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
          // TODO update data
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

