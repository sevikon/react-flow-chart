import * as React from 'react'
import styled from 'styled-components'
import { FlowChartWithStateAdvanced } from '../'
import { Content, Page, Sidebar, SidebarItem } from '../../stories/components'
import { calculatePaths, forEach } from '../components/Advanced/utils/calculate'
import { generateRelations } from '../components/Advanced/utils/generateRelations'
import { getTaskRelations } from '../components/Advanced/utils/getTaskRelations'
import { IChart, INode } from '../types'
import { ITasksFlowChart, ITasksFlowChartState, ITaskType, IUpdateTask } from '../types/advanced'

const ErrorDiv = styled.div`
padding: 10px;
margin-bottom: 10px;
color: #FFFFFF;
background-color: #ec407a;
`

export class TasksFlowChart extends React.Component<ITasksFlowChart, ITasksFlowChartState> {

  constructor (props: ITasksFlowChart) {
    super(props)
    const { tasks = [] } = props
    this.state = {
      errors: [],
      tasks,
      added: [],
      refreshCode: 1,
      distances: {},
      nodes: {},
      chartRelations: generateRelations(this.props.tasks),
    }
    this.getCurrentState = this.getCurrentState.bind(this)
    this.recalculateDistances = this.recalculateDistances.bind(this)

  }

  public componentDidUpdate (
    prevProps: Readonly<ITasksFlowChart>,
    prevState: Readonly<ITasksFlowChartState>, snapshot?: any): void {
    if (this.props.tasks !== prevProps.tasks) {
      this.setState({
        tasks: this.props.tasks,
      })
    }
  }

  public removeTask (taskId: string, callback: () => void) {
    this.setState({
      added: this.state.added.filter((t) => t !== taskId),
    }, callback)
  }

  public addTask (taskId: string, callback: () => void) {

    const added = this.state.added
    added.push(taskId)
    this.setState({
      added,
    }, callback)
  }

  public updateTask ({ taskId, name, value }: IUpdateTask, callback: () => void) {
    const tasks = this.state.tasks.map((t) => {
      if (t.id === taskId) {
        t[name] = value
      }
      return t
    }, callback)

    this.setState({
      tasks,
    })
  }

  public getCurrentState () {
    this.setState({
      refreshCode: this.state.refreshCode + 1,
    })
  }

  public recalculateDistances (state: IChart) {

    const { chartRelations, tasks } = this.state
    const { onChange } = this.props
    const { distances, errors, nodesMap } = calculatePaths(tasks, state)
    const fixedTasks = getTaskRelations(tasks, chartRelations)

    this.setState({
      distances,
      errors,
      tasks: fixedTasks,
      nodes: nodesMap,
    }, () => {
      onChange && onChange({
        chartRelations,
        tasks,
        distances,
      })
    })
  }

  public refreshTasks (state: IChart, callback: () => void) {
    const added = this.state.added
    forEach(state.nodes, (n: INode) => {
      const { properties = {} } = n
      if (properties.taskId) {
        added.push(properties.taskId)
      }
    })

    this.setState({
      added,
    }, callback)
  }

  public render () {
    return (
      <Page>
        <Content>
          <FlowChartWithStateAdvanced
            startContent={this.props.startContent}
            endContent={this.props.endContent}
            taskContent={this.props.taskContent}
            refreshCode={this.state.refreshCode}
            tasks={this.state.tasks}
            nodes={this.state.nodes}
            distances={this.state.distances}
            initialValue={this.state.chartRelations}
            handleCreateRelation={this.props.handleCreateRelation}
            handleDeleteRelation={this.props.handleDeleteRelation}
            handleDeleteTaskRelations={this.props.handleDeleteTaskRelations}
            handleCallback={(name, args, state) => {
              if (state) {
                if (args) {
                  switch (name) {
                    case 'onNodeChange': {
                      if (args.node && args.name && args.value !== undefined) {
                        if (args.node.properties.task) {
                          this.props.handleUpdateTask && this.props.handleUpdateTask(args.node.properties.task)
                        }
                        this.updateTask({ name: args.name, value: args.value, taskId: args.node.properties.taskId }, () => {
                          this.recalculateDistances(state)
                        })
                      }
                      break
                    }
                    case 'onCanvasDrop': {
                      this.addTask(args[0].data.properties.taskId, () => {
                        this.recalculateDistances(state)
                      })
                      break
                    }
                    case 'onDeleteKey': {
                      if (args.taskId) {
                        this.removeTask(args.taskId, () => {
                          this.recalculateDistances(state)
                        })
                      } else if (args.linkId) {
                        this.recalculateDistances(state)
                      }
                      break
                    }
                    case 'onLinkComplete': {
                      this.recalculateDistances(state)
                    }
                  }
                } else {
                  switch (name) {
                    case 'refreshState': {
                      this.recalculateDistances(state)
                      break
                    }
                    case 'refreshTasks': {
                      this.refreshTasks(state, () => {
                        this.recalculateDistances(state)
                      })
                      break
                    }
                  }
                }
              }
            }}
          />
        </Content>
        <Sidebar>
          {this.state.errors.map((err) => (
            <ErrorDiv>
              ERROR: {err.type} : {err.details}
            </ErrorDiv>
          ))}
          {this.state.tasks.filter((t) => (this.state.added.indexOf(t.id) < 0)).map((t: ITaskType) => (
            <SidebarItem
              key={`task-${t.id}`}
              type={t.title}
              properties={{
                taskId: t.id,
              }}
              ports={{
                port1: {
                  id: 'port1',
                  type: 'left',
                  properties: {},
                },
                port2: {
                  id: 'port2',
                  type: 'right',
                  properties: {},
                },
              }}
            />))}
        </Sidebar>
      </Page>)
  }
}
