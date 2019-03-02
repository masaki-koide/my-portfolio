import * as React from 'react'
import App from '~/components/App'
import GitHubItems from '~/components/moleculas/GitHubItems'
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
    <ul>
      {qiitaItems.map(item => {
        return (
          <li key={item.id}>
            <a href={item.url} target="_blank">
              {item.title}
            </a>
          </li>
        )
      })}
    </ul>
    <button onClick={actions.getNoteItems}>おしていただきたい</button>
    <ul>
      {noteItems.map(item => {
        return (
          <li key={item.guid}>
            <a href={item.link} target="_blank">
              {item.title}
            </a>
          </li>
        )
      })}
    </ul>
    <GitHubItems />
    <button onClick={actions.getHatenaBlogItems}>おしてもいいよ</button>
    <ul>
      {hatenaItems.map(item => {
        return (
          <li key={item.guid}>
            <a href={item.link} target="_blank">
              {item.title}
            </a>
          </li>
        )
      })}
    </ul>
  </App>
)

export default about
