import * as React from 'react'
import { v4 } from 'uuid'
import {
  ILink, INode, IOnLinkCancel, IOnLinkComplete, IOnLinkMove,
  IOnLinkStart, IOnPortPositionChange, IPort, IPosition, ISelectedOrHovered,
} from '../../'
import CanvasContext from '../Canvas/CanvasContext'
import { IPortDefaultProps, PortDefault } from './Port.default'

/** Construct the composed path by traversing parentElements */
const composedPath = (el: HTMLElement | null) => {
  const path: HTMLElement[] = []
  while (el) {
    path.push(el)
    el = el.parentElement
  }
  return path
}

export interface IPortWrapperProps {
  editable?: boolean,
  style?: object
  offset: IPosition
  selected: ISelectedOrHovered | undefined
  hovered: ISelectedOrHovered | undefined
  selectedLink: ILink | undefined
  hoveredLink: ILink | undefined
  port: IPort
  node: INode
  onPortPositionChange: IOnPortPositionChange
  Component: React.FunctionComponent<IPortDefaultProps>

  // Link handlers
  onLinkStart: IOnLinkStart
  onLinkMove: IOnLinkMove
  onLinkCancel: IOnLinkCancel
  onLinkComplete: IOnLinkComplete
}

export class PortWrapper extends React.Component<IPortWrapperProps> {
  public static contextType = CanvasContext
  public context!: React.ContextType<typeof CanvasContext>

  public nodeRef?: HTMLDivElement

  public getNodRef = (el: HTMLDivElement) => {
    if (el) {
      const { node, port, onPortPositionChange } = this.props
      this.nodeRef = el

      // Ports component should be positions absolute
      // Factor this in so we get position relative to the node
      const nodesEl = el.parentElement
        ? el.parentElement
        : { offsetLeft: 0, offsetTop: 0 }

      const position = {
        x: el.offsetLeft + nodesEl.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + nodesEl.offsetTop + el.offsetHeight / 2,
      }
      onPortPositionChange(node, port, position)
    }
  }

  public onMouseDown = (startEvent: React.MouseEvent) => {
    const { offset, node, port, onLinkStart, onLinkCancel, onLinkComplete, onLinkMove } = this.props
    const linkId = v4()
    const fromNodeId = node.id
    const fromPortId = port.id

    // Create the move handler
    // This will update the position as the mouse moves
    const mouseMoveHandler = (e: MouseEvent) => {
      const { offsetX, offsetY } = this.context

      onLinkMove({
        linkId, startEvent, fromNodeId, fromPortId,
        toPosition: {
          x: e.clientX - offsetX - offset.x,
          y: e.clientY - offsetY - offset.y,
        },
      })
    }

    // Create and bind the mouse up handler
    // This is used to check if the link is complete or cancelled
    const mouseUpHandler = (e: MouseEvent) => {

      // We traverse up the event path until we find an element with 'data-port-id' and data-node-id'
      // e.toElement cannot be used because it may be a child element of the port
      const path = composedPath(e.target as HTMLElement)
      const portEl = path.find((el) => {
        const toPortId = el.getAttribute && el.getAttribute('data-port-id')
        const toNodeId = el.getAttribute && el.getAttribute('data-node-id')
        return !!(toPortId && toNodeId)
      })

      // If both node-id and port-id are defined as data attributes, we are mouse-upping
      // on another port. Run the success handler
      if (portEl) {
        const toPortId = portEl.getAttribute('data-port-id') as string
        const toNodeId = portEl.getAttribute('data-node-id') as string
        onLinkComplete({ linkId, startEvent, fromNodeId, fromPortId, toNodeId, toPortId })
      } else {
        onLinkCancel({ linkId, startEvent, fromNodeId, fromPortId })
      }

      // Remove the listeners if the link is complete or canceled
      window.removeEventListener('mouseup', mouseUpHandler, false)
      window.removeEventListener('mousemove', mouseMoveHandler, false)
    }

    // Add listeners
    window.addEventListener('mouseup', mouseUpHandler, false)
    window.addEventListener('mousemove', mouseMoveHandler, false)

    // Notify state of link start
    onLinkStart({ linkId, startEvent, fromNodeId, fromPortId })

    // Prevent default and stop propagation to prevent text selection
    startEvent.preventDefault()
    startEvent.stopPropagation()
  }
  public render () {
    const {
      editable = true,
      selected,
      selectedLink,
      hovered,
      hoveredLink,
      style,
      port,
      node,
      Component = PortDefault,
    } = this.props

    return (
      <div
        data-port-id={port.id}
        data-node-id={node.id}
        onMouseDown={!editable ? undefined : this.onMouseDown}
        ref={this.getNodRef}
        style={style}
      >
        <Component
          port={port}
          isSelected={!!selected && selected.type === 'port' && selected.id === port.id}
          isHovered={!!hovered && hovered.type === 'port' && hovered.id === port.id}
          isLinkSelected={ selectedLink
            ? ((selectedLink.from.portId === port.id && selectedLink.from.nodeId === node.id) ||
               (selectedLink.to.portId === port.id && selectedLink.to.nodeId === node.id))
            : false
          }
          isLinkHovered={ hoveredLink
            ? ((hoveredLink.from.portId === port.id && hoveredLink.from.nodeId === node.id) ||
               (hoveredLink.to.portId === port.id && hoveredLink.to.nodeId === node.id))
            : false
          }
        />
      </div>
    )
  }
}
