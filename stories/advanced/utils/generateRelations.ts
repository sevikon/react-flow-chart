import { IChart, ILink, INode } from '../../../src/types'
import { IChartLinksArray, IChartNodesArray, ITaskGroupType, ITaskType } from '../types'

function getStart (id: string, x: number, y: number): INode {
  return { id, type: 'output-only', position: { x, y }, ports: { port2: { id: 'port2', type: 'right', position: { x: 133, y: 65 } } } }
}

function getEnd (id: string, x: number, y: number): INode {
  return { id, type: 'input-only', position: { x, y }, ports: { port1: { id: 'port1', type: 'left', position: { x: -2, y: 65 } } } }
}

function getRandomId (length = 24): string {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789-'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function getNode (id: string, t: ITaskType, x: number, y: number): INode {
  return {
    id,
    position: { x, y },
    type: 'task',
    ports: {
      port1: { id: 'port1', type: 'left', properties: {}, position: { x: -2, y: 50 } },
      port2: { id: 'port2', type: 'right', properties: {}, position: { x: 242, y: 50 } },
    },
    properties: { taskId: t.id },
  }
}

export function generateRelations (tasks: ITaskGroupType): IChart {
  const nodeStartId: string = getRandomId()
  const nodeEndId: string = getRandomId()

  const start = {
    x: 20,
    y: 20,
    w: 130,
    h: 130,
  }

  const margin = {
    x: 120,
    y: 20,
  }

  const block = {
    w: 200,
    h: 100,
  }

  const nodes: IChartNodesArray = {}
  const links: IChartLinksArray = {}
  let maxWidth = 1
  let row = 0
  let maxColumn = 0

  const tasksMap = {}
  tasks.map((t: ITaskType) => {
    const parents = t.dependencies ? t.dependencies : []
    tasksMap[t.id] = { id: getRandomId(), parents, children: [], left: 0, blockHeight: 1, blockWidth: 1, task: t, visited: false }
  })

  const addChild = (taskParentId: string, taskId: string) => {
    tasksMap[taskParentId].children.push(taskId)
  }

  for (const property in tasksMap) {
    if (tasksMap.hasOwnProperty(property)) {
      if (tasksMap[property].parents.length > 0) {
        tasksMap[property].task.dependencies.map((taskParentId: string) => {
          addChild(taskParentId, tasksMap[property].task.id)
        })
      }
    }
  }

  const calculateBlockHeight = (taskId: string) => {
    const node = tasksMap[taskId]
    if (!node.visited) {
      let blockHeight = node.children.length
      if (blockHeight < 1) {
        blockHeight = blockHeight < 1 ? 1 : blockHeight
      } else {
        blockHeight = 0
        node.children.map((taskChildId: string) => {
          const childHeight = tasksMap[taskChildId].blockHeight
          blockHeight += childHeight
        })
      }
      node.blockHeight = blockHeight
      node.visited = true
      node.parents.map((taskParentId: string) => {
        calculateBlockHeight(taskParentId)
      })
    }
  }

  for (const property in tasksMap) {
    if (tasksMap.hasOwnProperty(property)) {
      const node = tasksMap[property]
      if (node.children.length === 0) {
        calculateBlockHeight(node.task.id)
      }
    }
  }

  const getLink = (id: string, fromId: string, toId: string): ILink | null => {
    if (!nodes[fromId] || !nodes[toId]) {
      return null
    }
    return {
      id,
      from: { nodeId: fromId, portId: 'port2' },
      to: { nodeId: toId, portId: 'port1' },
    }
  }

  const generateNode = (taskId: string, column: number, currentRow: number) => {
    if (column > maxColumn) {
      maxColumn = column
    }
    const node = tasksMap[taskId]
    if (!nodes[node.id]) {
      if (node.children.length > 0 || node.parents.length > 0 || node.task.points > 0) {
        nodes[node.id] = getNode(node.id, node.task,
          start.x + start.w + margin.x + (margin.x + block.w) * (node.children.length === 0 ? maxColumn : column), start.y + currentRow * (block.h + margin.y))
      }
      let innerRow = currentRow
      node.children.map((c: string) => {
        generateNode(c, column + 1, innerRow)
        innerRow = innerRow + tasksMap[c].blockHeight
      })
    }
  }

  for (const property in tasksMap) {
    if (tasksMap.hasOwnProperty(property)) {
      const node = tasksMap[property]
      if (node.parents.length === 0) {
        generateNode(property, 0, row)
        row = row + node.blockHeight
      }
    }
  }

  nodes[nodeStartId] = getStart(nodeStartId, start.x, start.y)
  nodes[nodeEndId] = getEnd(nodeEndId, start.x + start.w + 2 * margin.x + (maxColumn + 1) * (margin.x + block.w), start.y)

  for (const property in tasksMap) {
    if (tasksMap.hasOwnProperty(property)) {
      const node = tasksMap[property]
      if (node.blockWidth > maxWidth) {
        maxWidth = node.blockWidth
      }
      if (node.children.length === 0) {
        const linkId = getRandomId()
        const link = getLink(linkId, node.id, nodeEndId)
        if (link) {
          links[linkId] = link
        }
      }
      if (node.parents.length === 0) {
        const linkId = getRandomId()
        const link = getLink(linkId, nodeStartId, node.id)
        if (link) {
          links[linkId] = link
        }
      }
    }
  }

  for (const property in tasksMap) {
    if (tasksMap.hasOwnProperty(property)) {
      const currentNode = tasksMap[property]
      const t = currentNode.task
      if (t.dependencies) {
        t.dependencies.map((taskId: string) => {
          const linkId = getRandomId()
          const link = getLink(linkId, tasksMap[taskId].id, currentNode.id)
          if (link) {
            links[linkId] = link
          }
        })
      }
    }
  }

  return {
    offset: {
      x: 0,
      y: 0,
    },
    nodes,
    links,
    selected: {},
    hovered: {},
  }
}
