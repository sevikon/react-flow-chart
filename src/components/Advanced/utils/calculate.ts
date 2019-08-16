import { IChart, ILink, INode } from '../../../types'
import { IRelationErrorArray, ITaskGroupType } from '../../../types/advanced'

export const forEach = (el: object, callback: (val: any) => void) => {
  for (const key in el) {
    if (el.hasOwnProperty(key)) {
      callback(el[key])
    }
  }
}

export const calculatePaths = (tasks: ITaskGroupType, state?: IChart) => {
  const distances = {}
  const errors: IRelationErrorArray = []
  if (state) {
    const links: ILink[] = []
    forEach(state.links, (val) => {
      links.push(val)
    })
    const nodesMap = {}

    forEach(state.nodes, (n: INode) => {
      const { properties = {} } = n
      n.properties = { ...properties, task: tasks.filter((t) => (t.id === properties.taskId))[0], ascendants: [] }
      nodesMap[n.id] = n
    })

    const calculateNodePath = (currentNode: INode) => {
      if (currentNode) {
        const { properties = {} } = currentNode
        const { task = {} } = properties
        let distance = task.points ? parseInt(task.points, 10) : 0
        const ascendants = currentNode.properties.ascendants
        ascendants.map((nodeId: string) => {
          const t = nodesMap[nodeId].properties.task
          const d = t && t.points ? parseInt(t.points, 10) : 0
          distance += d
        })
        distances[currentNode.id] = distance
        nodesMap[currentNode.id] = currentNode
        const nextNodes = links.filter((l) => (l.from.nodeId === currentNode.id)).map((l) => l.to.nodeId)
        nextNodes.map((nodeId: string) => (
          calculateNodePath(nodesMap[nodeId])),
        )
      }
    }

    const generateAscendants = (currentNode: INode) => {
      if (currentNode) {
        const { properties = {} } = currentNode
        const prevNodes = links.filter((l) => (l.to.nodeId === currentNode.id)).map((l) => l.from.nodeId)
        const ascendants = currentNode.properties.ascendants
        prevNodes.map((nodeId) => {
          if (ascendants.indexOf(nodeId) < 0) {
            ascendants.push(nodeId)
          }
          const prevNode = nodesMap[nodeId]
          if (prevNode) {
            prevNode.properties.ascendants.map((nId: string) => {
              if (ascendants.indexOf(nId) < 0) {
                ascendants.push(nId)
              }
            })
          }
        })
        nodesMap[currentNode.id] = { ...currentNode, properties: { ...properties, ascendants } }
        const nextNodes = links.filter((l) => (l.from.nodeId === currentNode.id)).map((l) => l.to.nodeId)
        nextNodes.map((nodeId: string) => {
          if (ascendants.indexOf(nodeId) < 0) {
            generateAscendants(nodesMap[nodeId])
          } else {
            errors.push({
              type: 'loop',
              details: `Loop:  ${nodesMap[nodeId].properties.task.id} -> ${nodesMap[currentNode.id].properties.task.id}`,
            })
          }
        })
      }
    }

    for (const property in nodesMap) {
      if (nodesMap.hasOwnProperty(property)) {
        const node = nodesMap[property]
        if (node.type === 'output-only') {
          generateAscendants(node)
        }
      }
    }

    if (errors.length === 0) {
      for (const property in nodesMap) {
        if (nodesMap.hasOwnProperty(property)) {
          const node = nodesMap[property]
          if (node.type === 'output-only') {
            calculateNodePath(node)
          }
        }
      }
    }

  }
  return { distances, errors }
}
