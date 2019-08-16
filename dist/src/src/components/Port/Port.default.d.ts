/// <reference types="react" />
import { IPort } from '../../';
export interface IPortDefaultProps {
    port: IPort;
    isSelected: boolean;
    isHovered: boolean;
    isLinkSelected: boolean;
    isLinkHovered: boolean;
}
export declare const PortDefault: ({ isLinkSelected, isLinkHovered }: IPortDefaultProps) => JSX.Element;
