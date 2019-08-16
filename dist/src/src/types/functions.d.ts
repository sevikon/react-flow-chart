/// <reference types="react" />
import { DraggableData, DraggableEvent } from 'react-draggable';
import { INode, IPort } from './chart';
import { IPosition, ISize } from './generics';
export declare type IOnDragNode = (event: DraggableEvent, dragData: DraggableData, id: string) => void;
export declare type IOnDragCanvas = (event: DraggableEvent, dragData: DraggableData) => void;
export declare type IOnPortPositionChange = (node: INode, port: IPort, position: IPosition) => void;
export interface IOnLinkBaseEvent {
    linkId: string;
    startEvent: React.MouseEvent;
    fromNodeId: string;
    fromPortId: string;
}
export declare type IOnLinkStart = (input: IOnLinkBaseEvent) => void;
export interface IOnLinkMoveInput extends IOnLinkBaseEvent {
    toPosition: {
        x: number;
        y: number;
    };
}
export declare type IOnLinkMove = (input: IOnLinkMoveInput) => void;
export declare type IOnLinkCancel = (input: IOnLinkBaseEvent) => void;
export interface IOnLinkCompleteInput extends IOnLinkBaseEvent {
    toNodeId: string;
    toPortId: string;
}
export declare type IOnLinkComplete = (input: IOnLinkCompleteInput) => void;
export declare type IOnLinkMouseEnter = ({ linkId }: {
    linkId: string;
}) => void;
export declare type IOnLinkMouseLeave = ({ linkId }: {
    linkId: string;
}) => void;
export declare type IOnLinkClick = ({ linkId }: {
    linkId: string;
}) => void;
export declare type IOnCanvasClick = () => void;
export declare type IOnDeleteKey = () => void;
export declare type IOnNodeClick = ({ nodeId }: {
    nodeId: string;
}) => void;
export declare type IOnNodeSizeChange = (opts: {
    nodeId: string;
    size: ISize;
}) => void;
export declare type IOnCanvasDrop = ({ data, position }: {
    data: any;
    position: IPosition;
}) => void;
