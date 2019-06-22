import * as React from 'react'
import { FlowChart, IChart } from '../../src'
import * as actions from '../../src/container/actions'
import mapValues from '../../src/container/utils/mapValues'
import { LinkCustomWrapper } from './components/LinkCustom'
import { NodeCustom } from './components/NodeCustom'
import { NodeInnerDefaultWrapper } from './components/NodeInnerCustom'
import { PortCustom } from './components/PortCustom'
import { ICallbackArgsType, IFlowChartWithStateProps } from './types'

/**
 * Flow Chart With State
 */
export class FlowChartWithState extends React.Component<IFlowChartWithStateProps, IChart> {
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
        const data = args[0]
        if (data.fromPortId === data.toPortId) {
          const funcArgs = { linkId: data.linkId }
          this.setState(this.stateActions.onLinkClick(funcArgs), () => callbacks.onDeleteKey())
        } else {
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
            node, props: {
              tasks,
              distances,
              onRemove: ({ node: nodeInner }) => {
                const data = { nodeId: nodeInner.id, taskId: nodeInner.properties.taskId }
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
              const data = { linkId: link.id }
              this.setState(this.stateActions.onLinkClick(data), () => callbacks.onDeleteKey(data))
            },
          }),
        }}
      />
    )
  }
}
