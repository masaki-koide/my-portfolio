import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators({ incrementCount }, dispatch),
    async getQiitaItems() {
      dispatch(getQiitaItems.started())
      const items = await API.getQiitaItems()
      if (items.json && !items.error) {
        dispatch(getQiitaItems.done({ result: items.json }))
      } else {
        dispatch(getQiitaItems.failed({ error: items.error }))
      }
    },
    async getNoteItems() {
      dispatch(getNoteItems.started())
      const items = await API.getNoteItems()
      if (items.json && !items.error) {
        const result = [].concat(items.json.query.results.item)
        dispatch(getNoteItems.done({ result }))
      } else {
        dispatch(getNoteItems.failed({ error: items.error }))
      }
    },
    async getGitHubItems() {
      const result = await client.query<any>({
        query
      })
      dispatch(
        getGitHubItems.done({ result: result.data.user.repositories.edges })
      )
    },
    async getHatenaBlogItems() {
      const items = await API.getHatenaBlogItems()
      if (items.json && !items.error) {
        const result = [].concat(items.json.query.results.item)
        dispatch(getHatenaBlogItems.done({ result }))
      }
    }
  }
}

type APIRequestFunc = () => Promise<any>

type Props = AppState & {
  incrementCount: () => void
  getQiitaItems: APIRequestFunc
  getNoteItems: APIRequestFunc
  getGitHubItems: APIRequestFunc
  getHatenaBlogItems: APIRequestFunc
}

const about: React.SFC<Props> = ({
  count,
  incrementCount,
  getQiitaItems,
  qiitaItems,
  getNoteItems,
  noteItems,
  getGitHubItems,
  gitHubItems,
  getHatenaBlogItems,
  hatenaBlogItems
}) => (
  <App>
    <p>About Page</p>
    <button onClick={incrementCount}>おしてね</button>
    <p>{count}</p>
    <button onClick={getQiitaItems}>おせよ</button>
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
    <button onClick={getNoteItems}>おしていただきたい</button>
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
    <button onClick={getGitHubItems}>おすなよ</button>
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
    <button onClick={getHatenaBlogItems}>おしてもいいよ</button>
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
