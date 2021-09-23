/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */
import React from 'react';

import { KarnaughMap, UpSetJS, VennDiagram } from '@upsetjs/react';
import { createContext, fixProps, RBindingUpSetProps, adapter } from './model';

declare type DashUpSetJSProps = RBindingUpSetProps & {};

export function DashUpSetJS(props: DashUpSetJSProps) {
  const context = createContext(300, 300); // TODO
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
