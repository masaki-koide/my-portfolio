import { css } from '@emotion/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { FC } from 'react'

const titleStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.5rem;
`

const descriptionStyle = css`
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

const contentStyle = css`
  padding-bottom: 1rem;
`

const chipsStyle = css`
  padding-top: 1rem;
`
const chipStyle = css`
  margin-right: 0.5rem;
`

export type Props = {
  title: string
  description: string
  tags?: Array<{
    id: string
    name: string
  }>
}

const Article: FC<Props> = props => {
  return (
    <Card>
      <CardContent>
        <div css={contentStyle}>
          <Typography variant="h5" css={titleStyle}>
            {props.title}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            css={descriptionStyle}
          >
            {props.description}
          </Typography>
        </div>
        <Divider variant="middle" />
        {props.tags && (
          <div css={chipsStyle}>
            {props.tags.map(tag => (
              <Chip key={tag.id} label={tag.name} css={chipStyle} />
            ))}
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" fullWidth>
          READ MORE
        </Button>
      </CardActions>
    </Card>
  )
}

export default Article
