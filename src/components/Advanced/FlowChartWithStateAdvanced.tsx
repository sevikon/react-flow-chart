import * as React from 'react'
import { FlowChart, IChart, ILink } from '../../index'
import * as actions from '../../container/actions'
import mapValues from '../../container/utils/mapValues'
import { LinkCustomWrapper } from './components/LinkCustom'
import { NodeCustom } from './components/NodeCustom'
import { NodeInnerDefaultWrapper } from './components/NodeInnerCustom'
import { PortCustom } from './components/PortCustom'
import { ICallbackArgsType, IFlowChartWithStateProps } from './types'

/**
 * Flow Chart With State
 */
export class FlowChartWithStateAdvanced extends React.Component<IFlowChartWithStateProps, IChart> {
  public state: IChart
  private stateActions = mapValues(actions, (func: any) =>
    (...args: any) => {
      this.setState(func(...args))
    })

  constructor (props: IFlowChartWithStateProps) {
    super(props)
    this.state = props.initialValue
  }

  public componentDidMount (): void {
    this.handleCallback('refreshTasks')
  }

  public componentDidUpdate (prevProps: Readonly<IFlowChartWithStateProps>, prevState: Readonly<IChart>, snapshot?: any): void {
    if (this.props.refreshCode !== prevProps.refreshCode) {
      this.handleCallback('refreshState')
    } else if (this.props.tasks !== prevProps.tasks) {
      this.handleCallback('refreshState')
    }
  }

  public handleCallback (funcName: string, args?: ICallbackArgsType) {
    const { handleCallback } = this.props
    handleCallback && handleCallback(funcName, args, this.state)
  }

  public render () {
    const { Components, tasks, distances } = this.props

    const callbacks = {
      ...this.stateActions,
      onLinkComplete: (...args: any) => {
        let data = args[0]

        // fix link -> always should be from port2 to port1
        if (data.fromPortId === 'port1') {
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

        if (data.fromPortId === data.toPortId) {
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
        this.setState(this.stateActions.onCanvasDrop(...args), () => this.handleCallback('onCanvasDrop', args))
      },
    }

    return (
      <FlowChart
        chart={this.state}
        callbacks={callbacks}
        Components={{
          ...Components,
          Node: NodeCustom,
          Port: PortCustom,
          NodeInner: ({ node }) => NodeInnerDefaultWrapper({
            node,
            props: {
              startContent: this.props.startContent,
              endContent: this.props.endContent,
              taskContent: this.props.taskContent,
              tasks,
              distances,
              onRemove: ({ node: nodeInner }) => {
                const data = { nodeId: nodeInner.id, taskId: nodeInner.properties.taskId }
                if (nodeInner.properties.task) {
                  this.props.handleDeleteTaskRelations && this.props.handleDeleteTaskRelations(nodeInner.properties.task)
                }
                this.setState(this.stateActions.onNodeClick(data), () => callbacks.onDeleteKey(data))
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
          Link: (props) => LinkCustomWrapper(props, {
            onDelete: (link) => {
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
