import * as React from 'react';
import { INode } from '../../src';
export interface ISidebarItemProps {
    ref?: React.RefObject<any>;
    type: string;
    ports: INode['ports'];
    properties?: any;
}
interface IState {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
}
export declare class SidebarItem extends React.Component<ISidebarItemProps, IState> {
    state: {
        width: number;
        height: number;
        offsetX: number;
        offsetY: number;
    };
    private ref;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private updateSize;
}
export {};
