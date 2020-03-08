(function () {
  // HTMLWidgets.shinyMode
  // HTMLWidgets.viewerMode

  function fixSets(props) {
    if (!props.sets) {
      props.sets = [];
      return;
    }
    if (!Array.isArray(props.sets)) {
      props.sets = UpSetJS.asSets(Object.keys(props.sets).map(function (key) {
        return {
          name: key,
          elems: props.sets[key]
        }
      }));
    }
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

      const fixProps = function (props) {
        fixSets(props);
      }

      const update = function(delta) {
        Object.assign(props, delta);
        fixProps(props);
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

