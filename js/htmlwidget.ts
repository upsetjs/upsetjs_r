/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */

/// <reference path="../types/index.d.ts" />

import './_polyfills';
import { ISetCombinations, ISetLike, render, renderKarnaughMap, renderVennDiagram } from '@upsetjs/bundle';
import { adapter, createContext, Elem, fixProps, RBindingUpSetProps } from './model';
import { resolveSetByElems } from './utils';

declare type CrosstalkOptions = {
  group: string;
  mode: 'click' | 'hover' | 'contextMenu';
};

declare type ShinyUpSetProps = RBindingUpSetProps & {
  crosstalk?: CrosstalkOptions;
  events_nonce?: boolean;
};

declare type CrosstalkHandler = {
  mode: 'click' | 'hover' | 'contextMenu';
  update(options: CrosstalkOptions): void;
  trigger(elems?: ReadonlyArray<string>): void;
};

function isShinyMode(): boolean {
  return HTMLWidgets && HTMLWidgets.shinyMode;
}

function toShinyEventData(
  set: (ISetLike<string> & { setNames?: string[] | undefined }) | null,
  selected?: ISetLike<string> | readonly string[] | null,
  events_nonce = false
): any {
  const nonce = events_nonce ? Date.now() : null;
  if (!set) {
    return {
      name: null,
      setNames: [],
      cardinality: null,
      isSelected: selected == null,
      type: null,
      elems: [],
      nonce,
    };
  }

  const cleanSelected =
    Array.isArray(selected) || typeof selected === 'function' ? null : (selected as ISetLike<string> | null);

  return {
    name: set.name,
    setNames: Array.isArray(set.setNames) ? set.setNames : set.setNames == null ? [] : [set.setNames],
    cardinality: set.cardinality,
    isSelected:
      cleanSelected &&
      cleanSelected.name == set.name &&
      cleanSelected.type === set.type &&
      cleanSelected.cardinality === set.cardinality,
    type: set.type,
    elems: set.elems || [],
    nonce,
  };
}

HTMLWidgets.widget({
  name: 'upsetjs',
  type: 'output',

  factory(el, width, height) {
    const context = createContext(width, height, isShinyMode(), {
      exportButtons: isShinyMode(),
    });
    let crosstalkHandler: CrosstalkHandler | null = null;

    function update(delta?: any, append = false) {
      if (delta) {
        fixProps(context, delta, append);
      }
      if (context.renderMode === 'venn') {
        delete context.props.layout;
        renderVennDiagram(el, context.props);
      } else if (context.renderMode === 'kmap') {
        renderKarnaughMap(el, context.props);
      } else if (context.renderMode === 'euler') {
        context.props.layout = adapter;
        renderVennDiagram(el, context.props);
      } else {
        render(el, context.props);
      }
    }

    let bakSelection: ISetLike<Elem> | null | undefined | ReadonlyArray<Elem> | ((s: ISetLike<string>) => number) =
      null;

    function createHandler(mode: 'hover' | 'click' | 'contextMenu') {
      return (set: (ISetLike<Elem> & { setNames?: string[] }) | null) => {
        if (isShinyMode()) {
          Shiny.onInputChange(
            `${el.id}_${mode}`,
            toShinyEventData(set, context.props.selection as ISetLike<string>, context.useNonce)
          );
        }
        const crosstalk = crosstalkHandler && crosstalkHandler.mode === mode;
        if (crosstalk && crosstalkHandler) {
          crosstalkHandler.trigger(set?.elems as string[]);
        }
        if (context.interactive !== mode) {
          return;
        }
        if (mode === 'hover') {
          if (set) {
            // hover on
            bakSelection = context.props.selection;
            context.props.selection = set;
          } else {
            // hover off
            context.props.selection = bakSelection;
            bakSelection = null;
          }
        } else {
          context.props.selection = set;
        }
        update();
      };
    }

    context.props.onHover = createHandler('hover');
    context.props.onClick = createHandler('click');
    context.props.onContextMenu = createHandler('contextMenu');

    function enableCrosstalk(config: CrosstalkOptions): CrosstalkHandler {
      const sel = new crosstalk.SelectionHandle();
      sel.setGroup(config.group);
      sel.on('change', (event) => {
        if (event.sender === sel) {
          return;
        }
        context.props.selection = !event.value
          ? null
          : resolveSetByElems(event.value, context.props.sets, context.props.combinations as ISetCombinations<Elem>) ||
            event.value;
        update();
      });

      // show current state
      context.props.selection = !sel.value
        ? null
        : resolveSetByElems(sel.value, context.props.sets, context.props.combinations as ISetCombinations<Elem>) ||
          sel.value;
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

    (el as any).__update = update;

    return {
      renderValue(x: ShinyUpSetProps) {
        update(x);
        if (x.crosstalk && (window as any).crosstalk && isShinyMode()) {
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

if (isShinyMode()) {
  Shiny.addCustomMessageHandler('upsetjs-update', (msg) => {
    const el = document.getElementById(msg.id);
    const update: (props: any, append: boolean) => void = (el as any)?.__update;
    if (typeof update === 'function') {
      update(msg.props, msg.append);
    }
  });
}
