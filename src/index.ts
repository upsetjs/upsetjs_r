/// <reference path="../types/index.d.ts" />

import 'core-js';
import 'regenerator-runtime/runtime';
import 'element-closest-polyfill';
import { isElemQuery, ISet, ISetCombinations, ISetLike, isSetQuery, renderUpSet, UpSetProps } from '@upsetjs/bundle';
import { fixCombinations, fixSets, resolveSet, resolveSetByElems } from './utils';

declare type CrosstalkOptions = {
  group: string;
  mode: 'click' | 'hover';
};

declare type ShinyUpSetProps = UpSetProps<any> & {
  interactive?: boolean;
  crosstalk?: CrosstalkOptions;
};

declare type CrosstalkHandler = {
  mode: 'click' | 'hover';
  update(options: CrosstalkOptions): void;
  trigger(elems?: ReadonlyArray<string>): void;
};

HTMLWidgets.widget({
  name: 'upsetjs',
  type: 'output',

  factory(el, width, height) {
    const props: ShinyUpSetProps = {
      sets: [],
      width,
      height,
      alternatingBackgroundColor: 'rgba(0,0,0,0.05)',
      exportButtons: false,
    };
    let crosstalkHandler: CrosstalkHandler | null = null;

    function fixProps(props: ShinyUpSetProps, delta: any) {
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
      if (typeof delta.selection === 'string' || Array.isArray(delta.selection)) {
        props.selection = resolveSet(delta.selection, props.sets, props.combinations as ISetCombinations<any>);
      }
      props.onHover = props.interactive || HTMLWidgets.shinyMode ? onHover : undefined;

      if (delta.queries) {
        props.queries!.forEach((query) => {
          if (isSetQuery(query) && (typeof query.set === 'string' || Array.isArray(query.set))) {
            query.set = resolveSet(query.set, props.sets, props.combinations as ISetCombinations<any>)!;
          } else if (isElemQuery(query) && typeof query.elems !== 'undefined' && !Array.isArray(query.elems)) {
            query.elems = [query.elems];
          }
        });
      }
    }

    function update(delta?: any, append = false) {
      if (delta) {
        if (append) {
          Object.keys(delta).forEach((key) => {
            const p = props as any;
            const old = p[key] || [];
            p[key] = old.concat(delta[key]);
          });
        } else {
          Object.assign(props, delta);
        }
        fixProps(props, delta);
      }
      renderUpSet(el, props);
    }

    let bakSelection: ISetLike<any> | null | undefined | ReadonlyArray<any> = null;

    const onHover = (set: ISet<any> | null) => {
      if (HTMLWidgets.shinyMode) {
        Shiny.onInputChange(`${el.id}_hover`, {
          name: set ? set.name : null,
          elems: set ? set.elems || [] : [],
        });
      }
      const crosstalk = crosstalkHandler && crosstalkHandler.mode === 'hover';
      if (!props.interactive && !crosstalk) {
        return;
      }
      if (crosstalk && crosstalkHandler) {
        crosstalkHandler.trigger(set?.elems);
      }
      if (set) {
        // hover on
        bakSelection = props.selection;
        props.selection = set;
      } else {
        // hover off
        props.selection = bakSelection;
        bakSelection = null;
      }
      update();
    };

    function enableCrosstalk(config: CrosstalkOptions): CrosstalkHandler {
      const sel = new crosstalk.SelectionHandle();
      sel.setGroup(config.group);
      sel.on('change', (event) => {
        if (event.sender === sel) {
          return;
        }
        props.selection = !event.value
          ? null
          : resolveSetByElems(event.value, props.sets, props.combinations as ISetCombinations<any>) || event.value;
        update();
      });

      // show current state
      props.selection = !sel.value
        ? null
        : resolveSetByElems(sel.value, props.sets, props.combinations as ISetCombinations<any>) || sel.value;
      update();

      return {
        mode: config.mode,
        update(options) {
          sel.setGroup(options.group);
          this.mode = options.mode;
        },
        trigger(elems?) {
          if (!elems) {
            sel.clear();
          } else {
            sel.set(elems);
          }
        },
      };
    }

    if (HTMLWidgets.shinyMode) {
      props.onClick = (set: ISet<any>) => {
        Shiny.onInputChange(`${el.id}_click`, {
          name: set ? set.name : null,
          elems: set ? set.elems || [] : [],
        });

        if (crosstalkHandler && crosstalkHandler.mode === 'click') {
          crosstalkHandler.trigger(set?.elems);
          props.selection = set;
          update();
        }
      };
    }

    (el as any).__update = update;

    return {
      renderValue(x: ShinyUpSetProps) {
        update(x);
        if (x.crosstalk && (window as any).crosstalk && HTMLWidgets.shinyMode) {
          if (!crosstalkHandler) {
            crosstalkHandler = enableCrosstalk(x.crosstalk);
          } else {
            crosstalkHandler.update(x.crosstalk);
          }
        }
      },
      resize(width: number, height: number) {
        update({
          width: width,
          height: height,
        });
      },
    };
  },
});

if (HTMLWidgets.shinyMode) {
  Shiny.addCustomMessageHandler('upsetjs-update', (msg) => {
    const el = document.getElementById(msg.id);
    const update: (props: any, append: boolean) => void = (el as any)?.__update;
    if (typeof update === 'function') {
      update(msg.props, msg.append);
    }
  });
}
