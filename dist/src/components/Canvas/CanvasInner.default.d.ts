/// <reference types="react" />
import { IOnCanvasClick } from '../../';
export interface ICanvasInnerDefaultProps {
    children: any;
    onClick: IOnCanvasClick;
    tabIndex: number;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}
export declare const CanvasInnerDefault: any;
