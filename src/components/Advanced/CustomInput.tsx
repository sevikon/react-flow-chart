import * as React from 'react'
import styled from 'styled-components'
import { ICustomInputParams } from '../../types'

const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 100%;
`

export class CustomInput extends React.Component<ICustomInputParams, { value: string }> {
  constructor (props: ICustomInputParams) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  public componentDidUpdate (prevProps: Readonly<ICustomInputParams>, prevState: Readonly<{ value: string }>, snapshot?: any): void {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
      })
    }
  }

  public render () {
    return (
      <Input
        className="text-input"
        value={this.state.value}
        placeholder={this.props.placeholder || 'Value'}
        onClick={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => {
          this.setState({
            value: e.target.value,
          }, () => {
            if (this.props.reactive) {
              this.props.onChange && this.props.onChange({
                name: 'points',
                value: this.state.value,
              })
            }
          })
        }}
        onBlur={(e) => {
          this.props.onChange && this.props.onChange({
            name: 'points',
            value: e.target.value,
          })
        }}
      />
    )
  }
}
