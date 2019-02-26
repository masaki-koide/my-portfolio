import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as API from '~/api/articles'
import About from '~/components/pages/about'
import {
  AppState,
  getHatenaItems,
  getNoteItems,
  getQiitaItems,
  incrementCount
} from '~/modules/app'

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

  public getQiitaItems = () => {
    this.dispatch(getQiitaItems.started())
    API.getQiitaItems()
      .then(result => {
        this.dispatch(getQiitaItems.done({ result }))
      })
      .catch(error => {
        this.dispatch(getQiitaItems.failed({ error }))
      })
  }

  public getNoteItems = () => {
    this.dispatch(getNoteItems.started())
    API.getNoteItems()
      .then(items => {
        this.dispatch(getNoteItems.done({ result: items }))
      })
      .catch(error => {
        this.dispatch(getNoteItems.failed({ error }))
      })
  }

  public getHatenaBlogItems = () => {
    API.getHatenaBlogItems().then(items => {
      this.dispatch(getHatenaItems.done({ result: items }))
    })
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { actions: new ActionDispather(dispatch) }
}

export type Props = AppState & {
  actions: ActionDispather
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
