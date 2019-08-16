import * as React from 'react';
import { ILink, INode, IOnLinkMouseEnter, IOnLinkMouseLeave } from '../../';
import { ILinkDefaultProps } from './Link.default';
export interface ILinkWrapperProps {
    link: ILink;
    isSelected: boolean;
    isHovered: boolean;
    fromNode: INode;
    toNode: INode | undefined;
    onLinkMouseEnter: IOnLinkMouseEnter;
    onLinkMouseLeave: IOnLinkMouseLeave;
    onLinkClick: IOnLinkMouseLeave;
    Component?: React.FunctionComponent<ILinkDefaultProps>;
}
export declare const LinkWrapper: React.MemoExoticComponent<({ Component, link, onLinkMouseEnter, onLinkMouseLeave, onLinkClick, isSelected, isHovered, fromNode, toNode, }: ILinkWrapperProps) => JSX.Element | null>;
