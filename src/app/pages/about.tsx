import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import App from '../components/App'
import { AppState, incrementCount } from '../store'

const mapStateToProps = ({ count }: AppState) => ({
  count
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ incrementCount }, dispatch)
}

type Props = AppState & {
  incrementCount: () => void
}

const about: React.SFC<Props> = ({ count, incrementCount }) => (
  <App>
    <p>About Page</p>
    <button onClick={incrementCount}>おしてね</button>
    <p>{count}</p>
  </App>
)

export default connect(mapStateToProps, mapDispatchToProps)(about)
