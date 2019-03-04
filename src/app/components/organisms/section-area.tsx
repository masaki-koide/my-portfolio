import styled from '@emotion/styled'
import { FC, ReactNode } from 'react'

const SectionArea = styled('section')`
  width: 100%;
  min-height: 50vh;
  background-color: ${props => props.color};
`

type Props = {
  children: ReactNode
  color: string
}

const sectionArea: FC<Props> = ({ children, color }) => {
  return <SectionArea color={color}>{children}</SectionArea>
}

export default sectionArea
