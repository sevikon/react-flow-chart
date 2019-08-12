import * as React from 'react'
import { generateCurvePath, ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IPosition } from '../../'
import { COLOR_OUTPUT } from '../../../stories/advanced/types'

export interface ILinkDefaultProps {
  color?: string,
  link: ILink
  startPos: IPosition
  endPos: IPosition
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  isHovered: boolean
  isSelected: boolean
}

export const LinkDefault = ({
                              link,
                              startPos,
                              endPos,
                              onLinkMouseEnter,
                              onLinkMouseLeave,
                              onLinkClick,
                              isHovered,
                              isSelected,
                              color = COLOR_OUTPUT,
                            }: ILinkDefaultProps) => {
  const points = generateCurvePath(startPos, endPos)

  return (
    <svg style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
      <circle
        r="4"
        cx={startPos.x}
        cy={startPos.y}
        fill={color}
      />
      {/* Main line */}
      <path
        d={points}
        stroke={color}
        strokeWidth="3"
        fill="none"
      />
      {/* Thick line to make selection easier */}
      <path
        d={points}
        stroke={color}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeOpacity={(isHovered || isSelected) ? 0.1 : 0}
        onMouseEnter={() => onLinkMouseEnter({ linkId: link.id })}
        onMouseLeave={() => onLinkMouseLeave({ linkId: link.id })}
        onClick={(e) => {
          onLinkClick({ linkId: link.id })
          e.stopPropagation()
        }}
      />
      <circle
        r="4"
        cx={endPos.x}
        cy={endPos.y}
        fill={color}
      />
    </svg>
  )
}
