import { css } from '@emotion/core'
import { Grid } from '@material-ui/core'
import { FC } from 'react'
import Article from '../moleculas/article'
import SectionArea from './section-area'

const style = css`
  padding: 2rem;
`

type Props = PropsTypeFromFC<typeof SectionArea> & {
  data: Array<PropsTypeFromFC<typeof Article>>
  children?: never
}

// TODO:データが1件もないときはどうする？
const ArticleSectionArea: FC<Props> = props => {
  return (
    <SectionArea color={props.color} css={style}>
      {props.data.length && (
        <Grid container spacing={32}>
          {props.data.map(article => (
            <Grid item xs={12} sm={6}>
              <Article
                title={article.title}
                description={article.description}
                tags={article.tags}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </SectionArea>
  )
}

export default ArticleSectionArea
