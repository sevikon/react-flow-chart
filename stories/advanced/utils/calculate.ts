import { IChart, ILink, INode } from '../../../src/types'
import { ITaskGroupType } from '../types'

export const forEach = (el: object, callback: (val: any) => void) => {
  for (const key in el) {
    if (el.hasOwnProperty(key)) {
      callback(el[key])
    }
  }
}

export const calculatePaths = (tasks: ITaskGroupType, state?: IChart) => {
  const distances = {}
  if (state) {
    const links: ILink[] = []
    forEach(state.links, (val) => {
      links.push(val)
    })
    const nodes: INode[] = []

    forEach(state.nodes, (n: INode) => {
      const { properties = {} } = n
      n.properties = { ...properties, task: tasks.filter((t) => (t.id === properties.taskId))[0] }
      nodes.push(n)
    })

    const calculateNodePath = (currentNode: INode) => {
      if (currentNode) {
        const { properties = {} } = currentNode
        const { task = {} } = properties
        let distance = task.points ? parseInt(task.points, 10) : 0
        const prevNodes = links.filter((l) => (l.to.nodeId === currentNode.id)).map((l) => l.from.nodeId)
        prevNodes.map((nodeId) => {
          if (distances[nodeId]) {
            distance += distances[nodeId]
          }
        })
        distances[currentNode.id] = distance
        const nextNodes = links.filter((l) => (l.from.nodeId === currentNode.id)).map((l) => l.to.nodeId)
        nextNodes.map((nodeId) => (
          calculateNodePath(nodes.filter((n) => (n.id === nodeId))[0])
        ))
      }
    }

    const startNode = nodes.filter((n) => (n.type === 'output-only'))[0]
    if (startNode) {
      calculateNodePath(startNode)
    }

  }
  return distances
}
