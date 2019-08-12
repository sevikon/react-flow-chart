import { IChart } from '../../../src/types'
import { ITaskGroupType } from '../types'

export function getTaskRelations (tasks: ITaskGroupType, chartRelations: IChart): ITaskGroupType {

  const { links, nodes } = chartRelations

  const relations = []
  const tasksMap = {}

  for (const property in links) {
    if (links.hasOwnProperty(property)) {
      const link = links[property]
      const from = link.from.nodeId
      const to = link.to.nodeId
      if (from && to) {
        const nodeFrom = nodes[from]
        const nodeTo = nodes[to]
        if (nodeFrom && nodeTo) {
          const taskFrom = nodeFrom.properties.task
          const taskTo = nodeTo.properties.task
          if (taskFrom && taskTo) {
            relations.push({
              from: taskFrom.id,
              to: taskTo.id,
            })
          }
        }
      }
    }
  }

  tasks.map((t) => {
    tasksMap[t.id] = []
  })

  relations.map((r) => {
    tasksMap[r.from].push(r.to)
  })

  tasks.map((t) => {
    t.dependencies = tasksMap[t.id]
  })

  return tasks
}
