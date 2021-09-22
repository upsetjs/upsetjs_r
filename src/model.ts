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
  KarnaughMapProps,
  UpSetProps,
  VennDiagramProps,
} from '@upsetjs/bundle';
import { layout } from '@upsetjs/venn.js';
import 'core-js';
import 'element-closest-polyfill';
import 'regenerator-runtime/runtime';

export declare type Elem = string;

export declare type RBindingUpSetProps = UpSetProps<Elem> &
  VennDiagramProps<Elem> & {
    renderMode: 'upset' | 'venn' | 'euler' | 'kmap';
    expressionData?: boolean;
    interactive?: boolean;

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
