import * as React from 'react'
import styled from 'styled-components'
import { ILinkDefaultProps, LinkDefault } from '../../../src/components/Link'
import { ILinkCustomCallbacks } from '../types'

const Label = styled.div`
  position: absolute;
`

const Button = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px;
  height: 20px;
  width: 20px;
  transform: translate(50%, -50%);
  background: red;
  color: white;
  border-radius: 50%;
  transition: 0.3s ease all;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
  }
`

const LabelContent = styled.div`
  padding: 5px 10px;
  background: cornflowerblue;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
`

export const LinkCustom = (props: ILinkDefaultProps, callbacks: ILinkCustomCallbacks) => {
  const { startPos, endPos, link } = props
  const centerX = startPos.x + (endPos.x - startPos.x) / 2
  const centerY = startPos.y + (endPos.y - startPos.y) / 2
  return (
    <>
      <LinkDefault {...props} />
      <Label style={{ left: centerX, top: centerY }}>
        {props.link.properties && props.link.properties.label && (
          <LabelContent>{props.link.properties && props.link.properties.label}</LabelContent>
        )}
        <Button
          onClick={(e) => {
            callbacks.onDelete(link)
            e.stopPropagation()
          }}
        >
          x
        </Button>
      </Label>
    </>
  )
}

export const LinkCustomWrapper = (props: ILinkDefaultProps, callbacks: ILinkCustomCallbacks) => {
  return LinkCustom(props, callbacks)
}
