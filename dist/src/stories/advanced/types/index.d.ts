import { IFlowChartComponents } from '../../../src/components/FlowChart';
import { IChart, ILink, INode } from '../../../src/types';
export interface ITaskType {
    id: string;
    title: string;
    points?: number;
    distance?: number;
    dependencies?: string[];
}
export interface ITaskGroupType extends Array<ITaskType> {
}
export interface IChartLinksArray {
    [id: string]: ILink;
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
export interface INodeInnerDefaultProps {
    node: INode;
}
export interface IOnChangeCallback {
    name: string;
    value: string;
}
export interface INodeInnerDefaultCallbacks {
    tasks: ITaskGroupType;
    distances: object;
    onRemove: ({ node }: INodeInnerDefaultProps) => void;
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
export interface IFlowChartWithStateProps {
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
    refreshCode: number;
}
export interface IUpdateTask {
    taskId: string;
    name: string;
    value: string;
}
export interface ITasksFlowChart {
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
}
export declare const COLOR_INPUT = "#F9A825";
export declare const COLOR_OUTPUT = "#3F51B5";
export declare const COLOR_LINK_CLOSE = "#EC407A";
export {};
