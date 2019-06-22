import * as React from 'react'
import styled from 'styled-components'
import { INodeInnerDefaultWrapperProps, ITaskType } from '../types'
import { CustomInput } from './CustomInput'

const Outer = styled.div`
  padding: 10px;
  text-align: center;
`

const OuterTask = styled.div`
  padding: 10px;
`

const NodeInnerDefault = ({ node, props }: INodeInnerDefaultWrapperProps) => {

  const { properties = {} } = node
  const { distances = {} } = props
  let currentTask: ITaskType = props.tasks.filter((t) => (t.id === properties.taskId))[0]
  currentTask = currentTask ? currentTask : {
    id: '',
    title: '',
  }

  const distance = distances[node.id]

  if (node.type === 'output-only') {
    return (
      <Outer>
        <p>START</p>
      </Outer>
    )
  } else if (node.type === 'input-only') {
    return (
      <Outer>
        <p>END</p>
        <div className="distance">{distance}</div>
      </Outer>
    )
  } else {
    return (
      <OuterTask>
        {currentTask.id}
        <i
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={() => {
            props.onRemove({ node })
          }}
        >
          <svg style={{ width: '24px', height: '24px', cursor: 'pointer' }} viewBox="0 0 24 24">
            <path fill="black" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </i>

        <div className="distance">{distance}</div>

        <CustomInput
          onChange={props.onChange}
          value={currentTask.points ? currentTask.points.toString() : ''}
        />

      </OuterTask>
    )
  }
}
export const NodeInnerDefaultWrapper = ({ node, props }: INodeInnerDefaultWrapperProps) => {
  return NodeInnerDefault({ node, props })
}
