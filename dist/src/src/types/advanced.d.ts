import { IFlowChartComponents } from '../components/FlowChart';
import { IChart, ILink, INode } from './index';
export interface ITaskType {
    id: string;
    title: string;
    points?: number;
    distance?: number;
    status?: string;
    dependencies?: string[];
}
export interface ITaskGroupType extends Array<ITaskType> {
}
export interface IChartLinksArray {
    [id: string]: ILink;
}
export interface ILinkChart {
    nodes: IChartNodesArray;
}
export interface IChartNodesArray {
    [id: string]: INode;
}
export interface IAddedTasksArray extends Array<string> {
}
export interface ILinkCustomCallbacks {
    onDelete: (link: ILink) => void;
}
export interface IRelationError {
    type: string;
    details: string;
}
export interface IRelationErrorArray extends Array<IRelationError> {
}
export interface INodeInnerDefaultPropsAdvanced {
    node: INode;
}
export interface IOnChangeCallback {
    name: string;
    value: string;
}
export interface INodeInnerDefaultCallbacks {
    tasks: ITaskGroupType;
    distances: object;
    onRemove: ({ node }: INodeInnerDefaultPropsAdvanced) => void;
    onChange: ({ name, value }: IOnChangeCallback) => void;
    startContent?: () => void;
    endContent?: (distance: number) => void;
    taskContent?: (task: ITaskType) => void;
}
export interface INodeInnerDefaultWrapperProps {
    node: INode;
    props: INodeInnerDefaultCallbacks;
}
export interface ICustomInputParams {
    onChange: ({ name, value }: IOnChangeCallback) => void;
    value: string;
}
interface ICallbackArgs {
    nodeId?: string;
    taskId?: string;
    linkId?: string;
    name?: string;
    value?: string;
    node?: INode;
}
export declare type ICallbackArgsType = ICallbackArgs;
export declare type IHandleCallbackFunc = (linkId: string, args?: ICallbackArgsType, state?: IChart) => void;
export declare type IHandleRelationFunc = (relation: ITaskRelationType) => void;
export declare type IHandleTaskFunc = (task: ITaskType) => void;
interface ITaskRelationType {
    from: ITaskType;
    to: ITaskType;
}
export interface IFlowChartWithStatePropsAdvanced {
    backgroundImage?: string;
    distances: object;
    Components?: IFlowChartComponents;
    handleCallback?: IHandleCallbackFunc;
    handleCreateRelation?: IHandleRelationFunc;
    handleDeleteRelation?: IHandleRelationFunc;
    handleDeleteTaskRelations?: IHandleTaskFunc;
    handleEditTask?: IHandleTaskFunc;
    handleUpdateTask?: IHandleTaskFunc;
    initialValue: IChart;
    taskContent?: (task: ITaskType) => void;
    startContent?: () => void;
    endContent?: (distance: number) => void;
    tasks: ITaskGroupType;
    nodes: IChartNodesArray;
    refreshCode: number;
}
export interface IUpdateTask {
    taskId: string;
    name: string;
    value: string;
}
export interface ITasksFlowChart {
    backgroundImage?: string;
    handleCreateRelation?: IHandleRelationFunc;
    handleDeleteRelation?: IHandleRelationFunc;
    handleDeleteTaskRelations?: IHandleTaskFunc;
    handleEditTask?: IHandleTaskFunc;
    handleUpdateTask?: IHandleTaskFunc;
    onChange?: ({}: IOnChangeFunc) => void;
    startContent?: () => void;
    endContent?: (distance: number) => void;
    taskContent?: (task: ITaskType) => void;
    tasks: ITaskGroupType;
}
export interface IOnChangeFunc {
    chartRelations: IChart;
    tasks: ITaskGroupType;
    distances: object;
}
export interface ITasksFlowChartState {
    errors: IRelationErrorArray;
    chartRelations: IChart;
    tasks: ITaskGroupType;
    distances: object;
    added: IAddedTasksArray;
    refreshCode: number;
    nodes: IChartNodesArray;
}
export declare const COLOR_INPUT = "#F9A825";
export declare const COLOR_OUTPUT = "#3F51B5";
export declare const COLOR_LINK_CLOSE = "#EC407A";
export declare const COLOR_SUCCESS = "#009688";
export declare const COLOR_ERROR = "#EC407A";
export declare const COLOR_DEFAULT_LINK = "#FFF";
export declare const COLOR_SUCCESS_LIGHT = "rgba(0,150,136,0.4)";
export declare const COLOR_OUTPUT_LIGHT = "rgba(63,81,181,0.4)";
export {};
