import { IChart } from '../../src'

export const chartSimple: IChart = {
  offset: { x: 0, y: 0 },
  nodes: {
    'node1': { id: 'node1', type: 'output-only', position: { x: 100, y: 100 }, ports: { port2: { id: 'port2', type: 'right', position: { x: 133, y: 65 } } } },
    'node3': { id: 'node3', type: 'input-only', position: { x: 1130, y: 171 }, ports: { port1: { id: 'port1', type: 'left', position: { x: -2, y: 65 } } } },
    'bfbf7e5e-7689-42bf-aae6-63864bef94df': {
      id: 'bfbf7e5e-7689-42bf-aae6-63864bef94df',
      position: { x: 683, y: 243 },
      type: 'Task 2',
      ports: {
        port1: { id: 'port1', type: 'left', properties: { custom: 'property' }, position: { x: -2, y: 50 } },
        port2: { id: 'port2', type: 'right', properties: { custom: 'property' }, position: { x: 242, y: 50 } },
      },
      properties: { taskId: 'task2' },
    },
    '4cda6ff8-a6bb-41bd-8d04-b9a220378521': {
      id: '4cda6ff8-a6bb-41bd-8d04-b9a220378521',
      position: { x: 393, y: 40 },
      type: 'Task 1',
      ports: {
        port1: { id: 'port1', type: 'left', properties: { custom: 'property' }, position: { x: -2, y: 50 } },
        port2: { id: 'port2', type: 'right', properties: { custom: 'property' }, position: { x: 242, y: 50 } },
      },
      properties: { taskId: 'task1' },
    },
    '0d739be2-2531-446b-8f6d-e71951b61378': {
      id: '0d739be2-2531-446b-8f6d-e71951b61378',
      position: { x: 771, y: 79 },
      type: 'Task 3',
      ports: {
        port1: { id: 'port1', type: 'left', properties: { custom: 'property' }, position: { x: -2, y: 50 } },
        port2: { id: 'port2', type: 'right', properties: { custom: 'property' }, position: { x: 242, y: 50 } },
      },
      properties: { taskId: 'task3' },
    },
  },
  links: {
    '915af676-a940-4abf-979c-15392d51a846': {
      id: '915af676-a940-4abf-979c-15392d51a846',
      from: { nodeId: 'node1', portId: 'port2' },
      to: { nodeId: 'bfbf7e5e-7689-42bf-aae6-63864bef94df', portId: 'port1' },
    },
    '491d4de4-4b02-463b-b9e1-cb784d979726': {
      id: '491d4de4-4b02-463b-b9e1-cb784d979726',
      from: { nodeId: 'bfbf7e5e-7689-42bf-aae6-63864bef94df', portId: 'port2' },
      to: { nodeId: 'node3', portId: 'port1' },
    },
    '6cd4d6bc-71d2-459d-8a9a-48740a2101c4': {
      id: '6cd4d6bc-71d2-459d-8a9a-48740a2101c4',
      from: { nodeId: 'node1', portId: 'port2' },
      to: { nodeId: '4cda6ff8-a6bb-41bd-8d04-b9a220378521', portId: 'port1' },
    },
    '73d41878-3160-4fc9-b6b9-f34c0680cb6c': {
      id: '73d41878-3160-4fc9-b6b9-f34c0680cb6c',
      from: { nodeId: '4cda6ff8-a6bb-41bd-8d04-b9a220378521', portId: 'port2' },
      to: { nodeId: '0d739be2-2531-446b-8f6d-e71951b61378', portId: 'port1' },
    },
    '681c5fa2-083c-436e-97ea-23959a0c3a59': {
      id: '681c5fa2-083c-436e-97ea-23959a0c3a59',
      from: { nodeId: '0d739be2-2531-446b-8f6d-e71951b61378', portId: 'port2' },
      to: { nodeId: 'node3', portId: 'port1' },
    },
  },
  selected: {},
  hovered: {},
}
