/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */
import React, { useCallback } from 'react';

import { KarnaughMap, UpSetJS, VennDiagram, ISetLike } from '@upsetjs/react';
import { createContext, fixProps, RBindingUpSetProps, adapter, Elem } from './model';
import useResizeObserver from 'use-resize-observer';

declare type DashUpSetJSProps = RBindingUpSetProps & {
  width: string | number | undefined;
  height: string | number | undefined;
  setProps(props: { selection: { name: string | null; elems: readonly Elem[] } }): void;
};

function DashUpSetJSImpl(props: RBindingUpSetProps) {
  const context = createContext(props.width, props.height, false);
  fixProps(context, props);
  if (context.renderMode === 'venn') {
    delete context.props.layout;
    return <VennDiagram {...(context.props as any)} />;
  } else if (context.renderMode === 'kmap') {
    return <KarnaughMap {...(context.props as any)} />;
  } else if (context.renderMode === 'euler') {
    context.props.layout = adapter;
    return <VennDiagram {...(context.props as any)} />;
  }
  return <UpSetJS {...(context.props as any)} />;
}

export function DashUpSetJS(props: React.PropsWithChildren<DashUpSetJSProps>) {
  const { id, width = '100%', height = 300, children, setProps, ...rest } = props;
  const { ref, width: computedWidth = 300, height: computedHeight = 300 } = useResizeObserver<HTMLDivElement>();

  const handler = useCallback(
    (set: ISetLike<Elem> | null) => {
      setProps({ selection: { name: set ? set.name : null, elems: set ? set.elems || [] : [] } });
    },
    [setProps]
  );
  if (props.interactive === true || props.interactive === 'hover') {
    rest.onHover = handler;
  } else if (props.interactive === 'click') {
    rest.onClick = handler;
  } else if (props.interactive === 'contextMenu') {
    rest.onContextMenu = handler;
  }
  return (
    <div ref={ref} id={props.id} style={{ width, height }}>
      <DashUpSetJSImpl {...rest} width={computedWidth} height={computedHeight} />
      {children}
    </div>
  );
}
