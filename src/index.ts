import 'core-js';
import 'regenerator-runtime/runtime';
import {
  asSets,
  asCombinations,
  GenerateSetCombinationsOptions,
  ISet,
  ISets,
  UpSetProps,
  renderUpSet,
  ISetCombinations,
  ISetCombination,
  generateCombinations,
  isSetQuery,
  isElemQuery,
  ISetLike,
} from '@upsetjs/bundle';

declare type HTMLWidget = {
  name: string;
  type: 'output';
  factory(
    el: HTMLElement,
    width: number,
    height: number
  ): {
    renderValue(x: any): void;
    resize(width: number, height: number): void;
  };
};

declare const HTMLWidgets: {
  shinyMode: boolean;
  viewerMode: boolean;
  widget(widget: HTMLWidget): void;
};

declare const Shiny: {
  onInputChange(event: string, msg: any): void;
  addCustomMessageHandler(type: string, callback: (msg: any) => void): void;
};

function fixSets(sets: ISets<any>) {
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

function fixCombinations(
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

function resolveSet(set: string | string[], sets: ISets<any>, combinations: ISetCombinations<any>) {
  const s = sets.find((s) => s.name === set);
  if (s) {
    return s;
  }
  const combinedNames = Array.isArray(set) ? set.slice().sort().join('&') : null;
  return combinations.find(function (c) {
    return c.name === set || (combinedNames && combinedNames === toUnifiedCombinationName(c));
  });
}

HTMLWidgets.widget({
  name: 'upsetjs',
  type: 'output',

  factory(el, width, height) {
    const props: UpSetProps<any> & { interactive?: boolean } = {
      sets: [],
      width,
      height,
    };

    if (HTMLWidgets.shinyMode) {
      props.onClick = (set: ISet<any>) => {
        Shiny.onInputChange(`${el.id}_click`, {
          name: set ? set.name : null,
          elems: set ? set.elems || [] : [],
        });
      };
    }

    function fixProps(props: UpSetProps<any> & { interactive?: boolean }, delta: any) {
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

    let bakSelection: ISetLike<any> | null | undefined = null;

    const onHover = (set: ISet<any> | null) => {
      if (HTMLWidgets.shinyMode) {
        Shiny.onInputChange(`${el.id}_hover`, {
          name: set ? set.name : null,
          elems: set ? set.elems || [] : [],
        });
      }
      if (!props.interactive) {
        return;
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

    (el as any).__update = update;

    return {
      renderValue(x: any) {
        update(x);
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
  Shiny.addCustomMessageHandler('upsetjs-update', function (msg) {
    const el = document.getElementById(msg.id);
    const update: (props: any, append: boolean) => void = (el as any)?.__update;
    if (typeof update === 'function') {
      update(msg.props, msg.append);
    }
  });
}
