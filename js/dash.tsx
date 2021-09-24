/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */
import React from 'react';

import { KarnaughMap, UpSetJS, VennDiagram } from '@upsetjs/react';
import { createContext, fixProps, RBindingUpSetProps, adapter } from './model';
import useResizeObserver from 'use-resize-observer';

declare type DashUpSetJSProps = RBindingUpSetProps & {
  width: string | number | undefined;
  height: string | number | undefined;
};

function DashUpSetJSImpl(props: RBindingUpSetProps) {
  const context = createContext(props.width, props.height);
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
  const { id, width = '100%', height = 300, children, ...rest } = props;
  const { ref, width: computedWidth = 300, height: computedHeight = 300 } = useResizeObserver<HTMLDivElement>();
  // TODO interaction
  return (
    <div ref={ref} id={props.id} style={{ width, height }}>
      <DashUpSetJSImpl {...rest} width={computedWidth} height={computedHeight} />
      {children}
    </div>
  );
}
