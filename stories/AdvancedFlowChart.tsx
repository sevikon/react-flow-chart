import * as React from 'react'
import styled from 'styled-components'
import { IChart, INode } from '../src/types'
import { FlowChartWithState } from './advanced/FlowChartWithState'
import { IAddedTasksArray, ITaskGroupType, ITaskType, IUpdateTask } from './advanced/types'
import { calculatePaths, forEach } from './advanced/utils/calculate'
import { Content, Page, Sidebar, SidebarItem } from './components'
import { chartSimple } from './misc/advancedChartState'

const Message = styled.div`
margin: 10px;
padding: 10px;
background: rgba(0,0,0,0.05);
`

export class AdvancedFlowChart extends React.Component<{}, { tasks: ITaskGroupType, distances: object, added: IAddedTasksArray, refreshCode: number }> {

  constructor (props: object) {
    super(props)
    const tasks = [{
      title: 'Task 1',
      id: 'task1',
      points: 20,
    }, {
      title: 'Task 2',
      id: 'task2',
      points: 30,
    }, {
      title: 'Task 3',
      id: 'task3',
      points: 40,
    }]
    this.state = {
      tasks,
      added: [],
      refreshCode: 1,
      distances: {},
    }
    this.getCurrentState = this.getCurrentState.bind(this)
    this.recalculateDistances = this.recalculateDistances.bind(this)

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

    const { tasks } = this.state
    const distances = calculatePaths(tasks, state)
    this.setState({
      distances,
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
          <FlowChartWithState
            refreshCode={this.state.refreshCode}
            tasks={this.state.tasks}
            distances={this.state.distances}
            initialValue={chartSimple}
            handleCallback={(name, args, state) => {
              if (state) {
                if (args) {
                  switch (name) {
                    case 'onNodeChange': {
                      if (args.node && args.name && args.value !== undefined) {
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
          <Message>
            Drag and drop these items onto the canvas.
            <button onClick={this.getCurrentState}>Refresh</button>
          </Message>
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
                  properties: {
                    custom: 'property',
                  },
                },
                port2: {
                  id: 'port2',
                  type: 'right',
                  properties: {
                    custom: 'property',
                  },
                },
              }}
            />))}
        </Sidebar>
      </Page>)
  }
}
