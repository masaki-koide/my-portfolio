import * as React from 'react'
import App from '~/components/App'
import GitHubItems from '~/components/moleculas/GitHubItems'
import ArticleSectionArea from '~/components/organisms/article-section-area'
import { Props } from '~/pages/about'

const about: React.SFC<Props> = ({
  count,
  qiitaItems,
  noteItems,
  hatenaItems,
  actions,
  loading,
  error
}) => (
  <App>
    <p>About Page</p>
    {loading && <p>loading...</p>}
    {error && <p>{error.message}</p>}
    <button onClick={actions.incrementCount}>おしてね</button>
    <p>{count}</p>
    <button onClick={actions.getQiitaItems}>おせよ</button>
    <ArticleSectionArea color="gray" data={qiitaItems} />
    <button onClick={actions.getNoteItems}>おしていただきたい</button>
    <ArticleSectionArea color="white" data={noteItems} />
    <GitHubItems />
    <button onClick={actions.getHatenaBlogItems}>おしてもいいよ</button>
    <ArticleSectionArea color="gray" data={hatenaItems} />
  </App>
)

export default about
