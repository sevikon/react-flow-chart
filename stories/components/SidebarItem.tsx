import * as React from 'react'
import styled from 'styled-components'
import { INode, REACT_FLOW_CHART } from '../../src'

const Outer = styled.div`
  padding: 20px 30px;
  font-size: 14px;
  background: white;
  cursor: move;
  border: solid #c5cae9 1px;
`

export interface ISidebarItemProps {
  ref?: React.RefObject<any>,
  type: string,
  ports: INode['ports'],
  properties?: any
}

interface IState {
  width: number
  height: number
  offsetX: number
  offsetY: number
}

export class SidebarItem extends React.Component<ISidebarItemProps, IState> {
  public state = {
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  }

  private ref = React.createRef<HTMLDivElement>()

  public componentDidMount () {
    this.updateSize()

    if (this.ref.current) {
      if ((window as any).ResizeObserver) {
        const ro = new (window as any).ResizeObserver(this.updateSize)
        ro.observe(this.ref.current)
      } else {
        window.addEventListener('resize', this.updateSize)
      }
    }
  }

  public componentDidUpdate () {
    this.updateSize()
  }

  public componentWillUnmount () {
    window.removeEventListener('resize', this.updateSize)
  }

  public render () {

    const { type, ports, properties }: ISidebarItemProps = this.props

    return (
      <div ref={this.ref} className="sidebar-item">
        <Outer
          draggable={true}
          onDragStart={(event) => {
            const el = this.ref.current

            if (el) {
              const rect = el.getBoundingClientRect()
              const offsetX = el.clientLeft + event.clientX - rect.left
              const offsetY = el.clientTop + event.clientY - rect.top
              event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ type, ports, properties, offsetX, offsetY }))
            }
          }}
        >
          {type}
        </Outer>
      </div>
    )
  }

  private updateSize = () => {
    const el = this.ref.current

    if (el) {
      const rect = el.getBoundingClientRect()

      if (el.offsetWidth !== this.state.width || el.offsetHeight !== this.state.height) {
        this.setState({ width: el.offsetWidth, height: el.offsetHeight })
      }

      if (rect.left !== this.state.offsetX || rect.top !== this.state.offsetY) {
        this.setState({ offsetX: rect.left, offsetY: rect.top })
      }
    }
  }
}
