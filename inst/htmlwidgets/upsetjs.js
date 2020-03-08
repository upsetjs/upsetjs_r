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

  const arrayEquals = function (a, b) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every(function (ai, i) {
      return ai === b[i];
    });
  };

  // HTMLWidgets.shinyMode
  // HTMLWidgets.viewerMode

  HTMLWidgets.widget({
    name: 'upsetjs',
    type: 'output',

    crossTalk: function(data) {
      const selectionHandle = new crosstalk.SelectionHandle();
      selectionHandle.on('change', function (e) {
        if (e.sender === selectionHandle) {
          return; // ignore self
        }
        if (!e.value) {
          // TODO clear selection
          return;
        }
        const indices = [];
        e.value.forEach(function(key) {
          if (key2index.has(key)) {
            indices.push(key2index.get(key));
          }
        });
        data.setSelection(indices);
      });

      data.on('selectionChanged.crosstalk', function(indices) {
        const keys = indices.map(function(index) {
          return index2key.get(index);
        }).sort();
        const old = (selectionHandle.value || []).sort();
        if (arrayEquals(keys, old)) {
          return;
        }
        if (keys.length === 0) {
          selectionHandle.clear();
        } else {
          selectionHandle.set(keys);
        }
      });

      const filterHandle = new crosstalk.FilterHandle();
      filterHandle.on('change', function (e) {
        if (e.sender === filterHandle) {
          return;
        }
        if (!e.value) {
          // reset
        } else {
          //e.value  ... array of keys
        }
      });
      data.on('orderChanged.crosstalk', function(_oldOrder, newOrder) {
        const old = (filterHandle.filteredKeys || []).sort();
        if (arrayEquals(keys, old)) {
          return;
        }
        if (keys.length === 0) {
          // all visible
          filterHandle.clear();
        } else {
          filterHandle.set(keys);
        }
      });

      return function(group, key) {
        selectionHandle.setGroup(group);
        filterHandle.setGroup(group);
        key2index.clear();
        index2key.clear();

        key.forEach(function(k, i) {
          key2index.set(k, i);
          index2key.set(i, k);
        });
      };
    },

    factory: function(el, width, height) {
      const that = this;
      var crossTalk = null;

      const props = {
        sets: [],
        width: width,
        height: height
      };

      const update = function(delta) {
        assign(props, delta);
        UpSetJS.renderUpSet(el, props);
      }

      return {
        renderValue: function(x) {
          // update cross talk
          if (x.crosstalk.group && x.crosstalk.key) {
            if (!crossTalk) {
              crossTalk = that.crossTalk(data);
            }
            crossTalk(x.crosstalk.group, x.crosstalk.key);
          }
          // TODO update data
          update(x.options);
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
})();

