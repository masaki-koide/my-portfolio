import { css } from '@emotion/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { FC } from 'react'

const chipDivStyle = css`
  margin-top: 10px;
`
const chipStyle = css`
  margin-right: 5px;
`

type Props = {
  title: string
  description: string
  tags: Array<{
    id: string
    name: string
  }>
}

const Article: FC<Props> = props => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{props.title}</Typography>
        <Typography variant="body1" color="textSecondary">
          {props.description}
        </Typography>
        <Divider variant="middle" />
        <div css={chipDivStyle}>
          {props.tags.map(tag => (
            <Chip key={tag.id} label={tag.name} css={chipStyle} />
          ))}
        </div>
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
