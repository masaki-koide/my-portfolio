import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import App from '../components/App'
import { AppState, incrementCount, setQiitaItems } from '../store'

const mapStateToProps = ({ count, qiitaItems }: AppState) => ({
  count,
  qiitaItems
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators({ incrementCount }, dispatch),
    async getQiitaItems() {
      dispatch(setQiitaItems.started())
      const items = await wrapFetch(
        'https://qiita.com/api/v2/authenticated_user/items?per_page=5',
        {
          headers: {
            Authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN}`
          }
        }
      )
      if (items.json && !items.error) {
        dispatch(setQiitaItems.done({ result: items.json }))
      } else {
        dispatch(setQiitaItems.failed({ error: items.error }))
      }
    }
  }
}

type Props = AppState & {
  incrementCount: () => void
  getQiitaItems: () => Promise<any>
}

const about: React.SFC<Props> = ({
  count,
  incrementCount,
  getQiitaItems,
  qiitaItems
}) => (
  <App>
    <p>About Page</p>
    <button onClick={incrementCount}>おしてね</button>
    <p>{count}</p>
    <button onClick={getQiitaItems}>おせよ</button>
    <ul>
      {qiitaItems.map(item => {
        return <li key={item.id}>{item.title}</li>
      })}
    </ul>
  </App>
)

export default connect(mapStateToProps, mapDispatchToProps)(about)
