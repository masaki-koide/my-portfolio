import { css } from '@emotion/core'
import { Typography } from '@material-ui/core'
import { FC } from 'react'
import SectionArea from './section-area'

const sectionStyle = css`
  padding: 4rem 2rem;
`

const titleStyle = css`
  text-align: center;
  margin-bottom: 4rem !important;
`

type Props = {
  color: string
}

const ProfileSectionArea: FC<Props> = ({ color }) => {
  return (
    <SectionArea color={color} css={sectionStyle}>
      <Typography variant="h2" css={titleStyle}>
        Profile
      </Typography>
    </SectionArea>
  )
}

export default ProfileSectionArea
