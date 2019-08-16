import * as React from 'react';
import { ILink, INode, INodeInnerDefaultPropsAdvanced, IOnDragNode, IOnLinkCancel, IOnLinkComplete, IOnLinkMove, IOnLinkStart, IOnNodeClick, IOnNodeSizeChange, IOnPortPositionChange, IPortDefaultProps, IPortsDefaultProps, IPosition, ISelectedOrHovered } from '../../';
import { INodeDefaultProps } from './Node.default';
export interface INodeWrapperProps {
    node: INode;
    Component: React.FunctionComponent<INodeDefaultProps>;
    offset: IPosition;
    selected: ISelectedOrHovered | undefined;
    hovered: ISelectedOrHovered | undefined;
    selectedLink: ILink | undefined;
    hoveredLink: ILink | undefined;
    isSelected: boolean;
    NodeInner: React.FunctionComponent<INodeInnerDefaultPropsAdvanced>;
    Ports: React.FunctionComponent<IPortsDefaultProps>;
    Port: React.FunctionComponent<IPortDefaultProps>;
    onPortPositionChange: IOnPortPositionChange;
    onLinkStart: IOnLinkStart;
    onLinkMove: IOnLinkMove;
    onLinkComplete: IOnLinkComplete;
    onLinkCancel: IOnLinkCancel;
    onDragNode: IOnDragNode;
    onNodeClick: IOnNodeClick;
    onNodeSizeChange: IOnNodeSizeChange;
}
export declare const NodeWrapper: ({ node, onDragNode, onNodeClick, isSelected, Component, onNodeSizeChange, NodeInner, Ports, Port, offset, selected, selectedLink, hovered, hoveredLink, onPortPositionChange, onLinkStart, onLinkMove, onLinkComplete, onLinkCancel, }: INodeWrapperProps) => JSX.Element;
