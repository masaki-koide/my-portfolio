import * as React from 'react'
// FIXME:pagesとcomponentsが相互参照してるの気持ち悪い
import { Props } from '../../pages/about'
import App from '../App'

const about: React.SFC<Props> = ({
  count,
  qiitaItems,
  noteItems,
  gitHubItems,
  hatenaBlogItems,
  actions
}) => (
  <App>
    <p>About Page</p>
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
    <button onClick={actions.getGitHubItems}>おすなよ</button>
    <ul>
      {gitHubItems.map(item => {
        return (
          <li key={item.node.url}>
            <a href={item.node.url} target="_blank">
              {item.node.name}
            </a>
          </li>
        )
      })}
    </ul>
    <button onClick={actions.getHatenaBlogItems}>おしてもいいよ</button>
    <ul>
      {hatenaBlogItems.map(item => {
        return (
          <li key={item.guid.content}>
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
