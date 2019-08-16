import * as React from 'react'
import styled from 'styled-components'
import { INodeDefaultProps } from '../../Node'
import { COLOR_INPUT, COLOR_OUTPUT } from '../types'

const InputNode = styled.div`
  position: absolute;
  padding: 30px;
  background: ${COLOR_OUTPUT};
  color: white;
  border-radius: 10px;
`

const OutputNode = styled.div`
  position: absolute;
  padding: 30px;
  background: ${COLOR_INPUT};
  color: white;
  border-radius: 10px;
`

const TaskNode = styled.div`
  position: absolute;
  width: 240px;
  height: 100px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  color: black;
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
    return (
      <TaskNode {...otherProps} className="flow-chart-task-node">
        {children}
      </TaskNode>
    )
  }
})
