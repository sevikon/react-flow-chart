import * as React from 'react'
import { CanvasOuterDefault, ICallbackArgsType, ICanvasOuterDefaultProps, IFlowChartWithStatePropsAdvanced, LinkCustomWrapper, NodeCustom, NodeInnerDefaultWrapper, PortCustom } from '../'
import { CanvasOuterCustomImageFunc } from '../components/Advanced/CanvasOuterCustom'
import { FlowChart, IChart, ILink } from '../index'
import * as actions from './actions'
import mapValues from './utils/mapValues'

/**
 * Flow Chart With State
 */
export class FlowChartWithStateAdvanced extends React.Component<IFlowChartWithStatePropsAdvanced, IChart> {
  public state: IChart
  private stateActions = mapValues(actions, (func: any) =>
    (...args: any) => {
      this.setState(func(...args))
    })
  private canvas?: React.FunctionComponent<ICanvasOuterDefaultProps>

  constructor (props: IFlowChartWithStatePropsAdvanced) {
    super(props)
    this.state = props.initialValue
    this.canvas = props.backgroundImage ? CanvasOuterCustomImageFunc(props.backgroundImage) : CanvasOuterDefault
  }

  public componentDidMount (): void {
    this.handleCallback('refreshTasks')
  }

  public componentDidUpdate (prevProps: Readonly<IFlowChartWithStatePropsAdvanced>, prevState: Readonly<IChart>, snapshot?: any): void {
    if (this.props.refreshCode !== prevProps.refreshCode) {
      this.handleCallback('refreshState')
    } else if (this.props.tasks !== prevProps.tasks) {
      this.handleCallback('refreshState')
    }
    if (this.props.initialValue !== prevProps.initialValue) {
      this.setState(this.props.initialValue)
    }
  }

  public handleCallback (funcName: string, args?: ICallbackArgsType) {
    const { handleCallback } = this.props
    handleCallback && handleCallback(funcName, args, this.state)
  }

  public render () {
    const { Components, chartProgress, editable, tasks, distances } = this.props

    const isEditable = editable !== false

    const callbacks = {
      ...this.stateActions,
      onLinkComplete: (...args: any) => {
        let data = args[0]

        // fix link -> always should be from port2 to port1
        if (data.fromPortId === 'port1' && isEditable) {
          args[0] = {
            ...data,
            fromPortId: 'port2',
            fromNodeId: data.toNodeId,
            toNodeId: data.fromNodeId,
            toPortId: 'port1',
          }
          data = args[0]
          const linksFixed = this.state.links
          const link: ILink = linksFixed[data.linkId]

          const from = {
            nodeId: data.fromNodeId || '',
            portId: data.fromPortId || '',
          }

          if (link && link.to) {
            linksFixed[link.id] = { ...link, from, to: link.from }
          }

          this.setState({
            links: linksFixed,
          })
        }

        if (data.fromPortId === data.toPortId || !isEditable) {
          const funcArgs = { linkId: data.linkId }
          this.setState(this.stateActions.onLinkClick(funcArgs), () => callbacks.onDeleteKey())
        } else {

          const fromNode = this.state.nodes[data.fromNodeId]
          const toNode = this.state.nodes[data.toNodeId]
          const from = fromNode.properties.task
          const to = toNode.properties.task

          if (from && to && this.props.handleCreateRelation) {
            this.props.handleCreateRelation({
              from,
              to,
            })
          }

          this.setState(this.stateActions.onLinkComplete(...args), () => this.handleCallback('onLinkComplete', args))
        }
      },
      onDeleteKey: (...args: any) => {
        this.setState(this.stateActions.onDeleteKey(...args), () => this.handleCallback('onDeleteKey', ...args))
      },
      onCanvasDrop: (...args: any) => {
        if (isEditable) {
          this.setState(this.stateActions.onCanvasDrop(...args), () => this.handleCallback('onCanvasDrop', args))
        }
      },
    }

    return (
      <FlowChart
        editable={isEditable}
        chart={this.state}
        callbacks={callbacks}
        Components={{
          ...Components,
          CanvasOuter: this.canvas,
          Node: NodeCustom,
          Port: PortCustom,
          NodeInner: ({ node }) => NodeInnerDefaultWrapper({
            node,
            props: {
              chartProgress,
              closeButton: this.props.closeButton,
              startContent: this.props.startContent,
              endContent: this.props.endContent,
              taskContent: this.props.taskContent,
              tasks,
              distances,
              onRemove: ({ node: nodeInner }) => {
                if (isEditable) {
                  const data = { nodeId: nodeInner.id, taskId: nodeInner.properties.taskId }
                  if (nodeInner.properties.task) {
                    this.props.handleDeleteTaskRelations && this.props.handleDeleteTaskRelations(nodeInner.properties.task)
                  }
                  this.setState(this.stateActions.onNodeClick(data), () => callbacks.onDeleteKey(data))
                }
              },
              onChange: ({ name, value }) => {
                this.handleCallback('onNodeChange', {
                  node,
                  name,
                  value,
                })
              },
            },
          }),
          Link: (props) => LinkCustomWrapper({ ...props }, { nodes: this.state.nodes }, {
            onDelete: !isEditable ? undefined : (link: ILink) => {
              if (link.from.nodeId && link.to.nodeId) {
                const fromNode = this.state.nodes[link.from.nodeId]
                const toNode = this.state.nodes[link.to.nodeId]
                const from = fromNode.properties.task
                const to = toNode.properties.task
                if (from && to && this.props.handleDeleteRelation) {
                  this.props.handleDeleteRelation({
                    from,
                    to,
                  })
                }
              }
              const data = { linkId: link.id }
              this.setState(this.stateActions.onLinkClick(data), () => callbacks.onDeleteKey(data))
            },
          }),
        }}
      />
    )
  }
}
