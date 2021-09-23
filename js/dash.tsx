/**
 * @upsetjs/r
 * https://github.com/upsetjs/upsetjs_r
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */
import React from 'react';

import { UpSetJS } from '@upsetjs/react';
import { RBindingUpSetProps } from './model';

declare type DashUpSetJSProps = RBindingUpSetProps & {};

export function DashUpSetJS(_props: DashUpSetJSProps) {
  return <UpSetJS width={100} height={100} sets={[]} />;
}
