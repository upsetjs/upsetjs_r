/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
 */

/// <reference path="../types/index.d.ts" />

import 'core-js';
import 'regenerator-runtime/runtime';
import 'element-closest-polyfill';
import {
  isElemQuery,
  ISet,
  ISetCombinations,
  ISetLike,
  isSetQuery,
  renderUpSet,
  UpSetProps,
  boxplotAddon,
} from '@upsetjs/bundle';
import { fixCombinations, fixSets, resolveSet, resolveSetByElems } from './utils';

declare type CrosstalkOptions = {
  group: string;
  mode: 'click' | 'hover';
};

declare type IElem = string;

declare type ShinyUpSetProps = UpSetProps<IElem> & {
  interactive?: boolean;
  crosstalk?: CrosstalkOptions;

  elems: ReadonlyArray<IElem>;
  attrs: { [attr: string]: ReadonlyArray<number> };
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
    let interactive = false;
    const elemToIndex = new Map<IElem, number>();
    let attrs: { [key: string]: ReadonlyArray<number> } = {};
    const props: UpSetProps<IElem> = {
      sets: [],
      width,
      height,
      alternatingBackgroundColor: 'rgba(0,0,0,0.05)',
      exportButtons: HTMLWidgets.shinyMode,
    };
    let crosstalkHandler: CrosstalkHandler | null = null;

    function syncAddons() {
      const keys = Object.keys(attrs);
      if (keys.length === 0) {
        delete props.setAddons;
        delete props.combinationAddons;
        return;
      }
      const minmax = keys.map((key) =>
        attrs[key].reduce(([min, max], v) => [Math.min(min, v), Math.max(max, v)] as [number, number], [
          Number.POSITIVE_INFINITY,
          Number.NEGATIVE_INFINITY,
        ] as [number, number])
      );
      props.setAddons = keys.map((key, i) =>
        boxplotAddon(
          (v) => attrs[key]![elemToIndex.get(v)!],
          {
            min: minmax[i][0],
            max: minmax[i][1],
          },
          {
            name: key,
          }
        )
      );
      props.combinationAddons = keys.map((key, i) =>
        boxplotAddon(
          (v) => attrs[key]![elemToIndex.get(v)!],
          {
            min: minmax[i][0],
            max: minmax[i][1],
          },
          {
            name: key,
            orient: 'vertical',
          }
        )
      );
    }

    function fixProps(props: UpSetProps<IElem>, delta: any) {
      if (typeof delta.interactive === 'boolean') {
        interactive = delta.interactive;
      }
      delete (props as any).interactive;
      delete (props as any).crosstalk;
      if (delta.elems) {
        // elems = delta.elems;
        elemToIndex.clear();
        delta.elems.forEach((elem: IElem, i: number) => elemToIndex.set(elem, i));
      }
      delete (props as any).elems;
      if (delta.attrs) {
        attrs = delta.attrs;
        syncAddons();
      }
      delete (props as any).attrs;

      if (delta.sets != null) {
        props.sets = fixSets(props.sets);
      }
      if (delta.combinations != null) {
        const c = fixCombinations(delta.combinations, props.sets);
        if (c == null) {
          delete props.combinations;
        } else {
          props.combinations = c;
        }
      }
      if (typeof delta.selection === 'string' || Array.isArray(delta.selection)) {
        props.selection = resolveSet(delta.selection, props.sets, props.combinations as ISetCombinations<IElem>);
      }
      props.onHover = interactive || HTMLWidgets.shinyMode ? onHover : undefined;

      if (delta.queries) {
        props.queries = delta.queries.map((query: any) => {
          const base = Object.assign({}, query);
          if (isSetQuery(query) && (typeof query.set === 'string' || Array.isArray(query.set))) {
            base.set = resolveSet(query.set, props.sets, props.combinations as ISetCombinations<IElem>)!;
          } else if (isElemQuery(query) && typeof query.elems !== 'undefined' && !Array.isArray(query.elems)) {
            base.elems = [query.elems];
          }
          return base;
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

    let bakSelection: ISetLike<IElem> | null | undefined | ReadonlyArray<IElem> = null;

    const onHover = (set: ISet<IElem> | null) => {
      if (HTMLWidgets.shinyMode) {
        Shiny.onInputChange(`${el.id}_hover`, {
          name: set ? set.name : null,
          elems: set ? set.elems || [] : [],
        });
      }
      const crosstalk = crosstalkHandler && crosstalkHandler.mode === 'hover';
      if (!interactive && !crosstalk) {
        return;
      }
      if (crosstalk && crosstalkHandler) {
        crosstalkHandler.trigger(set?.elems as string[]);
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
          : resolveSetByElems(event.value, props.sets, props.combinations as ISetCombinations<IElem>) || event.value;
        update();
      });

      // show current state
      props.selection = !sel.value
        ? null
        : resolveSetByElems(sel.value, props.sets, props.combinations as ISetCombinations<IElem>) || sel.value;
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
      props.onClick = (set: ISet<IElem>) => {
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
