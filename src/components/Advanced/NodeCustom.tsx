import * as React from 'react'
import styled from 'styled-components'
import { COLOR_INPUT, COLOR_OUTPUT, COLOR_OUTPUT_LIGHT, COLOR_SUCCESS_LIGHT } from '../../types'
import { INodeDefaultProps } from '../Node'

const InputNode = styled.div`
  position: absolute;
  padding: 10px 30px;
  background: ${COLOR_OUTPUT};
  color: white;
  border-radius: 10px;
`

const OutputNode = styled.div`
  padding: 10px 30px;
  position: absolute;
  background: ${COLOR_INPUT};
  color: white;
  border-radius: 10px;
`

const TaskNode = styled.div`
  position: absolute;
  width: 240px;
  height: 120px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  color: black;
  border: solid ${COLOR_OUTPUT_LIGHT} 2px;
  &.finished{
    border-color: ${COLOR_SUCCESS_LIGHT}
  }
`

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 * You'll need to add {...otherProps} so the event listeners are added to your component
 */
export const NodeCustom = React.forwardRef(({ node, children, ...otherProps }: INodeDefaultProps) => {
  if (node.type === 'output-only') {
    return (
      <InputNode {...otherProps} className="flow-chart-start-node">
        {children}
      </InputNode>
    )
  } else if (node.type === 'input-only') {
    return (
      <OutputNode {...otherProps} className="flow-chart-end-node">
        {children}
      </OutputNode>
    )
  } else {
    const { task = {} } = node.properties
    const { status = 'pending' } = task
    return (
      <TaskNode {...otherProps} className={`flow-chart-task-node ${status.toLowerCase()}`}>
        {children}
      </TaskNode>
    )
  }
})
