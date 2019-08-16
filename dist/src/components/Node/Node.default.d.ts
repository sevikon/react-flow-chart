/// <reference types="react" />
import { INode } from '../../';
export interface INodeDefaultProps {
    node: INode;
    children: any;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    style?: object;
    ref?: React.Ref<any>;
}
export declare const NodeDefault: any;
