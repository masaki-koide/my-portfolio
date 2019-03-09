import { css } from '@emotion/core'
import { Grid, Typography } from '@material-ui/core'
import { FC } from 'react'
import SectionArea from '~/components/molecules/section-area'

const sectionStyle = css`
  background-image: url(https://placehold.jp/1920x1080.png);
  background-size: cover;
  height: 100vh;
`

const gridStyle = css`
  height: 100%;
`
const titleStyle = css`
  text-align: center;
`

type Props = {
  children?: never
}

const TopSectionArea: FC<Props> = () => {
  return (
    <SectionArea color="white" css={sectionStyle}>
      <Grid container justify="center" alignItems="center" css={gridStyle}>
        <Grid item>
          <Typography variant="h1" css={titleStyle}>
            Masaki Koide
          </Typography>
        </Grid>
      </Grid>
    </SectionArea>
  )
}

export default TopSectionArea
