import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as API from '../api'
import About from '../components/pages/about'
import {
  AppState,
  getHatenaItems,
  getNoteItems,
  getQiitaItems,
  incrementCount
} from '../modules/app'

const mapStateToProps = ({
  count,
  qiitaItems,
  noteItems,
  hatenaItems
}: AppState) => ({
  count,
  qiitaItems,
  noteItems,
  hatenaItems
})

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
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { actions: new ActionDispather(dispatch) }
}

export type Props = AppState & {
  actions: ActionDispather
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
