import { css } from '@emotion/core'
import { Grid, Typography } from '@material-ui/core'
import { FC } from 'react'
import Article, { Props as ArticleProps } from '../moleculas/article'
import SectionArea from './section-area'

const sectionStyle = css`
  padding: 4rem 2rem;
`

const titleStyle = css`
  text-align: center;
  margin-bottom: 4rem !important;
`

type Props = PropsTypeFromFC<typeof SectionArea> & {
  title: string
  data: ArticleProps[]
  children?: never
}

// TODO:データが1件もないときはどうする？
const ArticleSectionArea: FC<Props> = props => {
  return (
    <SectionArea color={props.color} css={sectionStyle}>
      <Typography variant="h2" css={titleStyle}>
        {props.title}
      </Typography>
      {props.data.length ? (
        <Grid
          container
          spacing={32}
          justify={props.data.length > 1 ? 'flex-start' : 'center'}
        >
          {props.data.map(article => (
            <Grid item xs={12} sm={6} key={article.title}>
              <Article
                title={article.title}
                description={article.description}
                tags={article.tags}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        undefined
      )}
    </SectionArea>
  )
}

export default ArticleSectionArea
