/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */

/// <reference path="../types/index.d.ts" />

import 'core-js';
import 'regenerator-runtime/runtime';
import 'element-closest-polyfill';
import { layout } from '@upsetjs/venn.js';
import {
  isElemQuery,
  ISetCombinations,
  ISetLike,
  isSetQuery,
  render,
  UpSetProps,
  boxplotAddon,
  renderVennDiagram,
  renderKarnaughMap,
  VennDiagramProps,
  categoricalAddon,
  createVennJSAdapter,
  KarnaughMapProps,
  ISets,
} from '@upsetjs/bundle';
import { fixCombinations, fixSets, resolveSet, resolveSetByElems, fromExpression } from './utils';

declare type CrosstalkOptions = {
  group: string;
  mode: 'click' | 'hover' | 'contextMenu';
};

declare type IElem = string;

declare type ShinyUpSetProps = UpSetProps<IElem> &
  VennDiagramProps<IElem> & {
    renderMode: 'upset' | 'venn' | 'euler' | 'kmap';
    expressionData?: boolean;
    interactive?: boolean;
    crosstalk?: CrosstalkOptions;

    elems: ReadonlyArray<IElem>;
    attrs: ReadonlyArray<UpSetAttrSpec>;
  };

declare type CrosstalkHandler = {
  mode: 'click' | 'hover' | 'contextMenu';
  update(options: CrosstalkOptions): void;
  trigger(elems?: ReadonlyArray<string>): void;
};

declare type UpSetNumericAttrSpec = {
  type: 'number';
  name: string;
  domain: [number, number];
  values: ReadonlyArray<number>;
  elems?: ReadonlyArray<IElem>;
};
declare type UpSetCategoricalAttrSpec = {
  type: 'categorical';
  name: string;
  categories: ReadonlyArray<string>;
  values: ReadonlyArray<string>;
  elems?: ReadonlyArray<IElem>;
};

declare type UpSetAttrSpec = UpSetNumericAttrSpec | UpSetCategoricalAttrSpec;

const adapter = createVennJSAdapter(layout);

HTMLWidgets.widget({
  name: 'upsetjs',
  type: 'output',

  factory(el, width, height) {
    let interactive = false;
    let renderMode: 'upset' | 'venn' | 'euler' | 'kmap' = 'upset';
    const elemToIndex = new Map<IElem, number>();
    let attrs: UpSetAttrSpec[] = [];
    const props: UpSetProps<IElem> & VennDiagramProps<IElem> & KarnaughMapProps<IElem> = {
      sets: [],
      width,
      height,
      exportButtons: HTMLWidgets.shinyMode,
    };
    let crosstalkHandler: CrosstalkHandler | null = null;

    function syncAddons() {
      if (attrs.length === 0) {
        delete props.setAddons;
        delete props.combinationAddons;
        return;
      }
      const toAddon = (attr: UpSetAttrSpec, vertical = false) => {
        const lookup = attr.elems ? new Map(attr.elems.map((e, i) => [e, i])) : elemToIndex;
        if (attr.type === 'number') {
          return boxplotAddon<IElem>(
            (v) => (lookup.has(v) ? attr.values[lookup.get(v)!] : Number.NaN),
            { min: attr.domain[0], max: attr.domain[1] },
            {
              name: attr.name,
              quantiles: 'hinges',
              orient: vertical ? 'vertical' : 'horizontal',
            }
          );
        }
        return categoricalAddon<IElem>(
          (v) => (lookup.has(v) ? attr.values[lookup.get(v)!] : ''),
          {
            categories: attr.categories,
          },
          {
            name: attr.name,
            orient: vertical ? 'vertical' : 'horizontal',
          }
        );
      };
      props.setAddons = attrs.map((attr) => toAddon(attr, false));
      props.combinationAddons = attrs.map((attr) => toAddon(attr, true));
    }

    function fixProps(props: UpSetProps<IElem> & VennDiagramProps<IElem>, delta: any) {
      if (typeof delta.interactive === 'boolean') {
        interactive = delta.interactive;
      }
      const expressionData = delta.expressionData;
      if (typeof delta.renderMode === 'string') {
        renderMode = delta.renderMode;
      }
      delete (props as any).renderMode;
      delete (props as any).interactive;
      delete (props as any).expressionData;
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
        if (expressionData) {
          const r = fromExpression(delta.combinations);
          props.combinations = r.combinations as ISetCombinations<string>;
          props.sets = r.sets as ISets<string>;
        } else {
          const c = fixCombinations(delta.combinations, props.sets);
          if (c == null) {
            delete props.combinations;
          } else {
            props.combinations = c;
          }
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
      if (renderMode === 'venn') {
        delete props.layout;
        renderVennDiagram(el, props);
      } else if (renderMode === 'kmap') {
        renderKarnaughMap(el, props);
      } else if (renderMode === 'euler') {
        props.layout = adapter;
        renderVennDiagram(el, props);
      } else {
        render(el, props);
      }
    }

    let bakSelection:
      | ISetLike<IElem>
      | null
      | undefined
      | ReadonlyArray<IElem>
      | ((s: ISetLike<string>) => number) = null;

    const onHover = (set: ISetLike<IElem> | null) => {
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
      props.onClick = (set: ISetLike<IElem> | null) => {
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
      props.onContextMenu = (set: ISetLike<IElem> | null) => {
        Shiny.onInputChange(`${el.id}_contextMenu`, {
          name: set ? set.name : null,
          elems: set ? set.elems || [] : [],
        });

        if (crosstalkHandler && crosstalkHandler.mode === 'contextMenu') {
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
