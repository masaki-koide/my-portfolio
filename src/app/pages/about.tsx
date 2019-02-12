import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as API from '../api'
import About from '../components/pages/about'
import {
  AppState,
  getGitHubItems,
  getHatenaItems,
  getNoteItems,
  getQiitaItems,
  incrementCount
} from '../modules/app'

const mapStateToProps = ({
  count,
  qiitaItems,
  noteItems,
  gitHubItems,
  hatenaItems
}: AppState) => ({
  count,
  qiitaItems,
  noteItems,
  gitHubItems,
  hatenaItems
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
      this.dispatch(getHatenaItems.done({ result }))
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

export type Props = AppState & {
  actions: ActionDispather
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
