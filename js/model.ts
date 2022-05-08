/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */
import {
  boxplotAddon,
  categoricalAddon,
  createVennJSAdapter,
  isElemQuery,
  ISetCombinations,
  ISets,
  isSetQuery,
  KarnaughMapProps,
  UpSetProps,
  VennDiagramProps,
} from '@upsetjs/bundle';
import { layout } from '@upsetjs/venn.js';
import { fixCombinations, fixSets, fromExpression, resolveSet } from './utils';

export declare type Elem = string;

export declare type RBindingUpSetProps = UpSetProps<Elem> &
  VennDiagramProps<Elem> & {
    renderMode: 'upset' | 'venn' | 'euler' | 'kmap';
    expressionData?: boolean;
    interactive?: boolean | 'hover' | 'click' | 'contextMenu';

    elems: ReadonlyArray<Elem>;
    attrs: ReadonlyArray<UpSetAttrSpec>;
  };

declare type UpSetNumericAttrSpec = {
  type: 'number';
  name: string;
  domain: [number, number];
  values: ReadonlyArray<number>;
  elems?: ReadonlyArray<Elem>;
};
declare type UpSetCategoricalAttrSpec = {
  type: 'categorical';
  name: string;
  categories: ReadonlyArray<string>;
  values: ReadonlyArray<string>;
  elems?: ReadonlyArray<Elem>;
};

export declare type UpSetAttrSpec = UpSetNumericAttrSpec | UpSetCategoricalAttrSpec;

export const adapter = createVennJSAdapter(layout);

export function syncAddons(
  props: UpSetProps<Elem> & VennDiagramProps<Elem> & KarnaughMapProps<Elem>,
  elemToIndex: Map<Elem, number>,
  attrs: UpSetAttrSpec[]
) {
  if (attrs.length === 0) {
    delete props.setAddons;
    delete props.combinationAddons;
    return;
  }
  const toAddon = (attr: UpSetAttrSpec, vertical = false) => {
    const lookup = attr.elems ? new Map(attr.elems.map((e, i) => [e, i])) : elemToIndex;
    if (attr.type === 'number') {
      return boxplotAddon<Elem>(
        (v) => (lookup.has(v) ? attr.values[lookup.get(v)!] : Number.NaN),
        { min: attr.domain[0], max: attr.domain[1] },
        {
          name: attr.name,
          quantiles: 'hinges',
          orient: vertical ? 'vertical' : 'horizontal',
        }
      );
    }
    return categoricalAddon<Elem>(
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

export interface RenderContext {
  props: UpSetProps<Elem> & VennDiagramProps<Elem> & KarnaughMapProps<Elem>;
  elemToIndex: Map<Elem, number>;
  attrs: UpSetAttrSpec[];
  interactive: false | 'hover' | 'click' | 'contextMenu';
  renderMode: 'upset' | 'venn' | 'euler' | 'kmap';
}

export function createContext(
  width: number,
  height: number,
  interactive: boolean,
  extra: Partial<RenderContext['props']> = {}
): RenderContext {
  return {
    interactive: interactive ? 'hover' : false,
    renderMode: 'upset',
    elemToIndex: new Map<Elem, number>(),
    attrs: [],
    props: {
      sets: [],
      width,
      height,
      ...extra,
    },
  };
}

export function fixProps(context: RenderContext, delta: any, append = false) {
  if (append) {
    Object.keys(delta).forEach((key) => {
      const p = context.props as any;
      const old = p[key] || [];
      p[key] = old.concat(delta[key]);
    });
  } else {
    Object.assign(context.props, delta);
  }

  if (typeof delta.interactive === 'boolean' || typeof delta.interactive === 'string') {
    context.interactive = typeof delta.interactive === 'boolean' ? 'hover' : delta.interactive;
  }
  const expressionData = delta.expressionData;
  if (typeof delta.renderMode === 'string') {
    context.renderMode = delta.renderMode;
  }
  delete (context.props as any).renderMode;
  delete (context.props as any).interactive;
  delete (context.props as any).expressionData;
  delete (context.props as any).crosstalk;
  if (delta.elems) {
    // elems = delta.elems;
    context.elemToIndex.clear();
    delta.elems.forEach((elem: Elem, i: number) => context.elemToIndex.set(elem, i));
  }
  delete (context.props as any).elems;
  if (delta.attrs) {
    context.attrs = delta.attrs;
    syncAddons(context.props, context.elemToIndex, context.attrs);
  }
  delete (context.props as any).attrs;

  if (delta.sets != null) {
    context.props.sets = fixSets(context.props.sets);
  }
  if (delta.combinations != null) {
    if (expressionData) {
      const r = fromExpression(delta.combinations);
      context.props.combinations = r.combinations as ISetCombinations<string>;
      context.props.sets = r.sets as ISets<string>;
    } else {
      const c = fixCombinations(delta.combinations, context.props.sets);
      if (c == null) {
        delete context.props.combinations;
      } else {
        context.props.combinations = c;
      }
    }
  }
  if (typeof delta.selection === null || delta.selection === '') {
    context.props.selection = null;
  } else if (typeof delta.selection === 'string' || Array.isArray(delta.selection)) {
    context.props.selection = resolveSet(
      delta.selection,
      context.props.sets,
      context.props.combinations as ISetCombinations<Elem>
    );
  } else if (typeof delta.selection?.name === 'string') {
    context.props.selection = resolveSet(
      delta.selection.name,
      context.props.sets,
      context.props.combinations as ISetCombinations<Elem>
    );
  }

  if (delta.queries) {
    context.props.queries = delta.queries.map((query: any) => {
      const base = Object.assign({}, query);
      if (isSetQuery(query) && (typeof query.set === 'string' || Array.isArray(query.set))) {
        base.set = resolveSet(query.set, context.props.sets, context.props.combinations as ISetCombinations<Elem>)!;
      } else if (isElemQuery(query) && typeof query.elems !== 'undefined' && !Array.isArray(query.elems)) {
        base.elems = [query.elems];
      }
      return base;
    });
  }
}
