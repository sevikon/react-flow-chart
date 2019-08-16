import * as React from 'react';
import { INodeDefaultProps } from '../Node';
/**
 * Create the custom component,
 * Make sure it has the same prop signature
 * You'll need to add {...otherProps} so the event listeners are added to your component
 */
export declare const NodeCustom: React.ForwardRefExoticComponent<Pick<INodeDefaultProps, "style" | "children" | "onClick" | "node" | "isSelected"> & React.RefAttributes<unknown>>;
