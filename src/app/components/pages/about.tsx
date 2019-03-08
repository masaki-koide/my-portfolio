import * as React from 'react'
import App from '~/components/App'
import GitHubItems from '~/components/molecules/GitHubItems'
import ArticleSectionArea from '~/components/organisms/article-section-area'
import ProfileSectionArea from '~/components/organisms/profile-section-area'
import TopSectionArea from '~/components/organisms/top-section-area'
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
    <TopSectionArea />
    <ProfileSectionArea color="white" />
    <button onClick={actions.incrementCount}>おしてね</button>
    <p>{count}</p>
    <button onClick={actions.getQiitaItems}>おせよ</button>
    <ArticleSectionArea title="Qiita" color="gray" data={qiitaItems} />
    <button onClick={actions.getNoteItems}>おしていただきたい</button>
    <ArticleSectionArea title="Blog" color="white" data={noteItems} />
    <GitHubItems />
    <button onClick={actions.getHatenaBlogItems}>おしてもいいよ</button>
    <ArticleSectionArea title="Blog(old)" color="white" data={hatenaItems} />
  </App>
)

export default about
