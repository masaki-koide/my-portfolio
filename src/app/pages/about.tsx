import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as API from '../api'
import App from '../components/App'
import {
  AppState,
  getGitHubItems,
  getHatenaBlogItems,
  getNoteItems,
  getQiitaItems,
  incrementCount
} from '../store'

const mapStateToProps = ({
  count,
  qiitaItems,
  noteItems,
  gitHubItems,
  hatenaBlogItems
}: AppState) => ({
  count,
  qiitaItems,
  noteItems,
  gitHubItems,
  hatenaBlogItems
})

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    })
  }
})

const query = gql`
  query {
    user(login: "masaki-koide") {
      repositories(first: 5, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`

class ActionDispather {
  constructor(private dispatch: Dispatch) {}

  public incrementCount = () => {
    this.dispatch(incrementCount())
  }

  public getQiitaItems = async () => {
    this.dispatch(getQiitaItems.started())
    const items = await API.getQiitaItems()
    if (items.json && !items.error) {
      this.dispatch(getQiitaItems.done({ result: items.json }))
    } else {
      this.dispatch(getQiitaItems.failed({ error: items.error }))
    }
  }

  public getNoteItems = async () => {
    this.dispatch(getNoteItems.started())
    const items = await API.getNoteItems()
    if (items.json && !items.error) {
      const result = [].concat(items.json.query.results.item)
      this.dispatch(getNoteItems.done({ result }))
    } else {
      this.dispatch(getNoteItems.failed({ error: items.error }))
    }
  }

  public getHatenaBlogItems = async () => {
    const items = await API.getHatenaBlogItems()
    if (items.json && !items.error) {
      const result = [].concat(items.json.query.results.item)
      this.dispatch(getHatenaBlogItems.done({ result }))
    }
  }

  public getGitHubItems = async () => {
    const result = await client.query<any>({
      query
    })
    this.dispatch(
      getGitHubItems.done({ result: result.data.user.repositories.edges })
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { actions: new ActionDispather(dispatch) }
}

type Props = AppState & {
  actions: ActionDispather
}

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

export default connect(mapStateToProps, mapDispatchToProps)(about)
