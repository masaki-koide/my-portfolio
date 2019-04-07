import { css } from '@emotion/core'
import { CircularProgress } from '@material-ui/core'
import dynamic from 'next/dynamic'
import { FC, useCallback, useState } from 'react'
import App from '~/components/App'
import InfinitScrollContainer from '~/components/molecules/infinite-scroll-container'
import ProfileSectionArea from '~/components/organisms/profile-section-area'
import TopSectionArea from '~/components/organisms/top-section-area'
import { Props } from '~/pages/about'

const ArticleSectionArea = dynamic(() =>
  import('~/components/organisms/article-section-area')
)
const GitHubItems = dynamic(() => import('~/components/molecules/GitHubItems'))

const progressStyle = css`
  position: absolute;
  bottom: 0;
  left: 50%;
`

type LazyLoadSections = 'qiita' | 'github' | 'note' | 'hatena'
type State = Array<{
  section: LazyLoadSections
  action?: () => Promise<void>
}>

const about: FC<Props> = ({
  count,
  qiitaItems,
  noteItems,
  hatenaItems,
  actions,
  loading,
  error
}) => {
  const [state, update] = useState<State>([
    { section: 'qiita', action: actions.getQiitaItems },
    { section: 'github' },
    { section: 'note', action: actions.getNoteItems },
    { section: 'hatena', action: actions.getHatenaBlogItems }
  ])

  const callback = useCallback(
    () => {
      const nextSection = state.shift()
      if (!nextSection) {
        return
      }
      if (nextSection.action) {
        nextSection.action().then(() => {
          update(prev => prev.splice(0, 1))
        })
      } else {
        update(prev => prev.splice(0, 1))
      }
    },
    [state]
  )

  return (
    <App>
      <p>About Page</p>
      {error && <p>{error.message}</p>}
      <InfinitScrollContainer callback={callback}>
        <TopSectionArea />
        <ProfileSectionArea color="white" />
        <button onClick={actions.incrementCount}>おしてね</button>
        <p>{count}</p>
        {qiitaItems && (
          <>
            <ArticleSectionArea title="Qiita" color="gray" data={qiitaItems} />
            <GitHubItems />
          </>
        )}
        {noteItems && (
          <ArticleSectionArea title="Blog" color="gray" data={noteItems} />
        )}
        {hatenaItems && (
          <ArticleSectionArea
            title="Blog(old)"
            color="white"
            data={hatenaItems}
          />
        )}
      </InfinitScrollContainer>
      {loading && <CircularProgress css={progressStyle} />}
    </App>
  )
}

export default about
