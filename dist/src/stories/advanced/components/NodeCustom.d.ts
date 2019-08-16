import * as React from 'react';
import { INodeDefaultProps } from '../../../src/components/Node';
/**
 * Create the custom component,
 * Make sure it has the same prop signature
 * You'll need to add {...otherProps} so the event listeners are added to your component
 */
export declare const NodeCustom: React.ForwardRefExoticComponent<Pick<INodeDefaultProps, "node" | "isSelected" | "style" | "children" | "onClick"> & React.RefAttributes<unknown>>;
