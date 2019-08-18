import { IChart, IChartNodesArray, ILink, INode, IRelationErrorArray, ITaskGroupType } from '../../../types'

export const forEach = (el: object, callback: (val: any) => void) => {
  for (const key in el) {
    if (el.hasOwnProperty(key)) {
      callback(el[key])
    }
  }
}

export const calculatePaths = (tasks: ITaskGroupType, state?: IChart) => {
  const distances = {}
  const chartProgress = {}
  const errors: IRelationErrorArray = []
  const nodesMap: IChartNodesArray = {}

  if (state) {
    const links: ILink[] = []
    forEach(state.links, (val) => {
      links.push(val)
    })
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
        let status = task.status || 'pending'
        let progress = 0
        if (task.status === 'finished') {
          progress = distance
        }

        ascendants.map((nodeId: string) => {
          const t = nodesMap[nodeId].properties.task
          const d = t && t.points ? parseInt(t.points, 10) : 0
          if (t) {
            if (t.status !== 'finished') {
              status = 'pending'
            } else {
              progress += d
            }
          }
          distance += d
        })
        properties.status = status
        distances[currentNode.id] = distance
        chartProgress[currentNode.id] = progress
        nodesMap[currentNode.id] = { ...currentNode, properties }
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
  return { chartProgress, distances, errors, nodesMap }
}
