import { IFlowChartComponents } from '../../../src/components/FlowChart'
import { IChart, ILink, INode } from '../../../src/types'

export interface ITaskType {
  id: string,
  title: string,
  points?: number,
  distance?: number
}

export interface ITaskGroupType extends Array<ITaskType> {
}

export interface IAddedTasksArray extends Array<string> {
}

export interface ILinkCustomCallbacks {
  onDelete: (link: ILink) => void,
}

export interface INodeInnerDefaultProps {
  node: INode
}

export interface IOnChangeCallback {
  name: string,
  value: string
}

export interface INodeInnerDefaultCallbacks {
  tasks: ITaskGroupType,
  distances: object,
  onRemove: ({ node }: INodeInnerDefaultProps) => void,
  onChange: ({ name, value }: IOnChangeCallback) => void,
}

export interface INodeInnerDefaultWrapperProps {
  node: INode,
  props: INodeInnerDefaultCallbacks
}

export interface ICustomInputParams {
  onChange: ({ name, value }: IOnChangeCallback) => void,
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

export type handleCallbackFunc = (linkId: string, args?: ICallbackArgsType, state?: IChart) => void

export interface IFlowChartWithStateProps {
  initialValue: IChart
  Components?: IFlowChartComponents,
  handleCallback?: handleCallbackFunc,
  tasks: ITaskGroupType,
  distances: object,
  refreshCode: number
}

export interface IUpdateTask {
  taskId: string, name: string, value: string
}

export const COLOR_INPUT = '#FF9800'
export const COLOR_OUTPUT = '#00BCD4'
