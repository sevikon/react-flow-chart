import styled from 'styled-components'
import { ICanvasOuterDefaultProps } from '../Canvas'

export const CanvasOuterCustomImageFunc = (image?: string) => {
  return styled.div<ICanvasOuterDefaultProps>`
  position: relative;
  background-color: #4f6791;
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: not-allowed;
` as any
}
