/// <reference types="react" />
import { INode } from '../../src';
export interface ISidebarItemProps {
    type: string;
    ports: INode['ports'];
    properties?: any;
}
export declare const SidebarItem: ({ type, ports, properties }: ISidebarItemProps) => JSX.Element;
