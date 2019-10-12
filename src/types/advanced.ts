import { IFlowChartComponents } from '../components/FlowChart'
import { IChart, ILink, INode } from './index'

export interface ITaskType {
  id: string,
  title: string,
  points?: number,
  distance?: number,
  status?: string,
  dependencies?: string[]
}

export interface ITaskGroupType extends Array<ITaskType> {
}

export interface IChartLinksArray {
  [id: string]: ILink,
}

export interface ILinkChart {
  nodes: IChartNodesArray
}

export interface IChartNodesArray {
  [id: string]: INode,
}

export interface IAddedTasksArray extends Array<string> {
}

export interface ILinkCustomCallbacks {
  onDelete?: (link: ILink) => void,
}

export interface IRelationError {
  type: string,
  details: string
}

export interface IRelationErrorArray extends Array<IRelationError> {
}

export interface INodeInnerDefaultPropsAdvanced {
  node: INode
}

export interface IOnChangeCallback {
  name: string,
  value: string
}

export interface INodeInnerDefaultCallbacks {
  tasks: ITaskGroupType,
  distances: object,
  chartProgress: object,
  onRemove: ({ node }: INodeInnerDefaultPropsAdvanced) => void,
  onChange: ({ name, value }: IOnChangeCallback) => void,
  startContent?: () => void,
  endContent?: (distance: number, progress: number) => void,
  taskContent?: (task: ITaskType) => void,
  closeButton?: () => void,
}

export interface INodeInnerDefaultWrapperProps {
  node: INode,
  props: INodeInnerDefaultCallbacks
}

export interface ICustomInputParams {
  onChange: ({ name, value }: IOnChangeCallback) => void,
  placeholder?: string,
  reactive?: boolean,
  value: string
}

interface ICallbackArgs {
  nodeId?: string,
  taskId?: string,
  linkId?: string,
  name?: string,
  value?: string,
  node?: INode
}

export type ICallbackArgsType = ICallbackArgs

export type IHandleCallbackFunc = (linkId: string, args?: ICallbackArgsType, state?: IChart) => void

export type IHandleRelationFunc = (relation: ITaskRelationType) => void
export type IHandleTaskFunc = (task: ITaskType) => void

interface ITaskRelationType {
  from: ITaskType,
  to: ITaskType
}

export interface IFlowChartWithStatePropsAdvanced {
  backgroundImage?: string,
  editable?: boolean,
  distances: object,
  chartProgress: object,
  Components?: IFlowChartComponents,
  handleCallback?: IHandleCallbackFunc,
  handleCreateRelation?: IHandleRelationFunc,
  handleDeleteRelation?: IHandleRelationFunc,
  handleDeleteTaskRelations?: IHandleTaskFunc,
  handleEditTask?: IHandleTaskFunc,
  handleUpdateTask?: IHandleTaskFunc,
  initialValue: IChart
  taskContent?: (task: ITaskType) => void,
  startContent?: () => void,
  endContent?: (distance: number, progress: number) => void,
  tasks: ITaskGroupType,
  nodes: IChartNodesArray,
  refreshCode: number,
  closeButton?: () => void,
}

export interface IUpdateTask {
  taskId: string,
  name: string,
  value: string
}

export interface ITasksFlowChart {
  backgroundImage?: string,
  editable?: boolean,
  handleCreateRelation?: IHandleRelationFunc,
  handleDeleteRelation?: IHandleRelationFunc,
  handleDeleteTaskRelations?: IHandleTaskFunc,
  handleEditTask?: IHandleTaskFunc,
  handleUpdateTask?: IHandleTaskFunc,
  onChange?: ({}: IOnChangeFunc) => void,
  startContent?: () => void,
  endContent?: (distance: number, progress: number) => void,
  taskContent?: (task: ITaskType) => void,
  closeButton?: () => void,
  tasks: ITaskGroupType,
  searchPlaceholder?: string
  refreshCode?: string
}

export interface IOnChangeFunc {
  chartRelations: IChart,
  tasks: ITaskGroupType,
  distances: object,
  chartProgress: object,
}

export interface ITasksFlowChartState {
  errors: IRelationErrorArray,
  chartRelations: IChart,
  tasks: ITaskGroupType,
  distances: object,
  chartProgress: object,
  added: IAddedTasksArray,
  refreshCode: number,
  nodes: IChartNodesArray,
  taskFilter: string,
}

export const COLOR_INPUT = '#F9A825'
export const COLOR_OUTPUT = '#3F51B5'
export const COLOR_LINK_CLOSE = '#EC407A'
export const COLOR_SUCCESS = '#009688'
export const COLOR_ERROR = COLOR_LINK_CLOSE
export const COLOR_DEFAULT_LINK = '#FFF'

export const COLOR_SUCCESS_LIGHT = 'rgba(0,150,136,0.4)'
export const COLOR_OUTPUT_LIGHT = 'rgba(63,81,181,0.4)'
