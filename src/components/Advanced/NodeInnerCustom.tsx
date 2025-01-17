import * as React from 'react'
import styled from 'styled-components'
import { INodeInnerDefaultWrapperProps, ITaskType } from '../../types'
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
  const { chartProgress = {}, distances = {} } = props
  let currentTask: ITaskType = props.tasks.filter((t) => (t.id === properties.taskId))[0]
  currentTask = currentTask ? currentTask : {
    id: '',
    title: '',
  }

  const distance = distances[node.id]
  const progress = chartProgress[node.id]

  if (node.type === 'output-only') {
    return (
      <Outer>
        {props.startContent && props.startContent()}
        {!props.startContent && <p>START</p>}
      </Outer>
    )
  } else if (node.type === 'input-only') {
    return (
      <Outer>
        {props.endContent && props.endContent(distance, progress)}
        {!props.endContent && <div>
            <p>END</p>
            <div className="distance">{progress}/{distance}</div>
        </div>}
      </Outer>
    )
  } else {
    return (
      <OuterTask>
        {props.taskContent && props.taskContent(currentTask)}

        {!props.taskContent && <div>
          {currentTask.id}
          {properties.status}
            <div className="distance">{distance}</div>
            <CustomInput
                onChange={props.onChange}
                value={currentTask.points ? currentTask.points.toString() : ''}
            />
        </div>}

        <i
          className="close"
          style={{
            width: '24px', height: '24px',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={() => {
            props.onRemove({ node })
          }}
        >
          {props.closeButton && props.closeButton()}
          {!props.closeButton && <svg style={{ width: '24px', height: '24px', cursor: 'pointer' }} viewBox="0 0 24 24">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>}
        </i>

      </OuterTask>
    )
  }
}
export const NodeInnerDefaultWrapper = ({ node, props }: INodeInnerDefaultWrapperProps) => {
  return NodeInnerDefault({ node, props })
}
