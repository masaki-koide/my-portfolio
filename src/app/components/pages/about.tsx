import * as React from 'react'
// FIXME:pagesとcomponentsが相互参照してるの気持ち悪い
import { Props } from '../../pages/about'
import App from '../App'
import GitHubItems from '../moleculas/GitHubItems'
import LinkList from '../organisms/LinkList'

const about: React.SFC<Props> = ({
  count,
  qiitaItems,
  noteItems,
  hatenaItems,
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
    <LinkList
      links={noteItems.map<{ href: string; text: string }>(item => ({
        href: item.link,
        text: item.title
      }))}
    />
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
