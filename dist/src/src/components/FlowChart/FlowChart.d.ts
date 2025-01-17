import * as React from 'react';
import { ICanvasInnerDefaultProps, ICanvasOuterDefaultProps, IChart, ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultPropsAdvanced, IOnCanvasClick, IOnCanvasDrop, IOnDeleteKey, IOnDragCanvas, IOnDragNode, IOnLinkCancel, IOnLinkClick, IOnLinkComplete, IOnLinkMouseEnter, IOnLinkMouseLeave, IOnLinkMove, IOnLinkStart, IOnNodeClick, IOnNodeSizeChange, IOnPortPositionChange, IPortDefaultProps, IPortsDefaultProps } from '../../';
export interface IFlowChartCallbacks {
    onDragNode: IOnDragNode;
    onDragCanvas: IOnDragCanvas;
    onCanvasDrop: IOnCanvasDrop;
    onLinkStart: IOnLinkStart;
    onLinkMove: IOnLinkMove;
    onLinkComplete: IOnLinkComplete;
    onLinkCancel: IOnLinkCancel;
    onPortPositionChange: IOnPortPositionChange;
    onLinkMouseEnter: IOnLinkMouseEnter;
    onLinkMouseLeave: IOnLinkMouseLeave;
    onLinkClick: IOnLinkClick;
    onCanvasClick: IOnCanvasClick;
    onDeleteKey: IOnDeleteKey;
    onNodeClick: IOnNodeClick;
    onNodeSizeChange: IOnNodeSizeChange;
}
export interface IFlowChartComponents {
    CanvasOuter?: React.FunctionComponent<ICanvasOuterDefaultProps>;
    CanvasInner?: React.FunctionComponent<ICanvasInnerDefaultProps>;
    NodeInner?: React.FunctionComponent<INodeInnerDefaultPropsAdvanced>;
    Ports?: React.FunctionComponent<IPortsDefaultProps>;
    Port?: React.FunctionComponent<IPortDefaultProps>;
    Node?: React.FunctionComponent<INodeDefaultProps>;
    Link?: React.FunctionComponent<ILinkDefaultProps>;
}
export interface IFlowChartProps {
    /**
     * The current chart state
     */
    chart: IChart;
    /**
     * Callbacks for updating chart state.
     * See container/actions.ts for example state mutations
     */
    callbacks: IFlowChartCallbacks;
    /**
     * Custom components
     */
    Components?: IFlowChartComponents;
    editable?: boolean;
}
export declare const FlowChart: (props: IFlowChartProps) => JSX.Element;
