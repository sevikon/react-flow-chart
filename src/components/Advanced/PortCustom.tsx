import * as React from 'react'
import styled from 'styled-components'
import { IPortDefaultProps } from '../Port'
import { COLOR_INPUT, COLOR_OUTPUT } from '../../types/advanced'

const PortDefaultOuter = styled.div`
  width: 20px;
  height: 20px;
  background: cornflowerblue;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

const PortDefaultInner = styled.div`
  width: 14px;
  height: 14px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

export const PortCustom = (props: IPortDefaultProps) => (
  <PortDefaultOuter style={{ backgroundColor: props.port.type === 'left' ? COLOR_INPUT : COLOR_OUTPUT }}>
    <PortDefaultInner/>
  </PortDefaultOuter>
)
