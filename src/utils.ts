/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
 */

import {
  asCombinations,
  asSets,
  generateCombinations,
  GenerateSetCombinationsOptions,
  ISetCombination,
  ISetCombinations,
  ISets,
  ISetLike,
  extractFromExpression,
  SetCombinationType,
} from '@upsetjs/bundle';

export function fixSets(sets: ISets<any>) {
  if (!sets) {
    return [];
  }
  return asSets(
    sets.map((set) => {
      if (!Array.isArray(set.elems)) {
        (set as any).elems = set.elems == null ? [] : [set.elems];
      }
      return set;
    })
  );
}

export function fromExpression(
  combinations: { name: string; cardinality: number; setNames: string[]; type: SetCombinationType }[]
) {
  const type = combinations[0].type;
  return extractFromExpression(
    combinations.map((set) => ({
      name: set.name,
      setNames: Array.isArray(set.setNames) ? set.setNames : set.setNames == null ? [] : [set.setNames],
      cardinality: set.cardinality,
    })),
    (c) => c.setNames,
    {
      type,
    }
  );
}

export function fixCombinations(
  combinations: GenerateSetCombinationsOptions | ISetCombinations<any> | undefined,
  sets: ISets<any>
) {
  if (!combinations || (Array.isArray(combinations) && combinations.length === 0)) {
    return null;
  }
  if (!Array.isArray(combinations)) {
    return generateCombinations(sets, combinations as GenerateSetCombinationsOptions);
  }
  const lookup = new Map(sets.map((s) => [s.name, s]));
  return asCombinations(
    combinations.map((set) => {
      if (!Array.isArray(set.elems)) {
        (set as any).elems = set.elems == null ? [] : [set.elems];
      }
      if (!Array.isArray(set.setNames)) {
        set.setNames = set.setNames == null ? [] : [set.setNames];
      }
      return set;
    }),
    'composite',
    (s: any) => s.setNames.map((si: string) => lookup.get(si)).filter(Boolean)
  );
}

function toUnifiedCombinationName(c: ISetCombination<any>) {
  return Array.from(c.sets)
    .map((s) => s.name)
    .sort()
    .join('&');
}

export function resolveSet(set: string | string[], sets: ISets<any>, combinations: ISetCombinations<any>) {
  const s = sets.find((s) => s.name === set);
  if (s) {
    return s;
  }
  const combinedNames = Array.isArray(set) ? set.slice().sort().join('&') : null;
  return combinations.find((c) => {
    return c.name === set || (combinedNames && combinedNames === toUnifiedCombinationName(c));
  });
}

export function resolveSetByElems(elems: ReadonlyArray<any>, sets: ISets<any>, combinations: ISetCombinations<any>) {
  const set = new Set(elems);
  const sameElems = (s: ISetLike<any>) => {
    if (!s.elems || s.elems.length !== set.size) {
      return false;
    }
    return s.elems.every((v) => set.has(v));
  };

  const r = sets.find(sameElems);
  if (r) {
    return r;
  }
  return combinations.find(sameElems);
}
