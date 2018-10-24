import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import * as querystring from 'querystring'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import App from '../components/App'
import {
  AppState,
  getGitHubItems,
  getNoteItems,
  getQiitaItems,
  incrementCount
} from '../store'

const mapStateToProps = ({
  count,
  qiitaItems,
  noteItems,
  gitHubItems
}: AppState) => ({
  count,
  qiitaItems,
  noteItems,
  gitHubItems
})

interface APIResponse {
  json?: any
  error?: any
}

const wrapFetch = (
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<APIResponse> => {
  return fetch(input, init)
    .then(response => response.json())
    .then(json => {
      return { json }
    })
    .catch(error => {
      return { error }
    })
}

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
      const items = await wrapFetch(
        'https://qiita.com/api/v2/authenticated_user/items?per_page=5',
        {
          headers: {
            Authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN}`
          }
        }
      )
      if (items.json && !items.error) {
        dispatch(getQiitaItems.done({ result: items.json }))
      } else {
        dispatch(getQiitaItems.failed({ error: items.error }))
      }
    },
    async getNoteItems() {
      dispatch(getNoteItems.started())
      const qs = querystring.stringify({
        q:
          'select * from feed where url = "https://note.mu/mar_key/rss" limit 5',
        format: 'json'
      })
      const items = await wrapFetch(
        `https://query.yahooapis.com/v1/public/yql?${qs}`
      )
      console.log(items)
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
    }
  }
}

type Props = AppState & {
  incrementCount: () => void
  getQiitaItems: () => Promise<any>
  getNoteItems: () => Promise<any>
  getGitHubItems: () => Promise<any>
}

const about: React.SFC<Props> = ({
  count,
  incrementCount,
  getQiitaItems,
  qiitaItems,
  getNoteItems,
  noteItems,
  getGitHubItems,
  gitHubItems
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
  </App>
)

export default connect(mapStateToProps, mapDispatchToProps)(about)
