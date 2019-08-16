/// <reference types="react" />
import { ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IPosition } from '../../';
export interface ILinkDefaultProps {
    color?: string;
    link: ILink;
    startPos: IPosition;
    endPos: IPosition;
    onLinkMouseEnter: IOnLinkMouseEnter;
    onLinkMouseLeave: IOnLinkMouseLeave;
    onLinkClick: IOnLinkClick;
    isHovered: boolean;
    isSelected: boolean;
}
export declare const LinkDefault: ({ link, startPos, endPos, onLinkMouseEnter, onLinkMouseLeave, onLinkClick, isHovered, isSelected, color, }: ILinkDefaultProps) => JSX.Element;
