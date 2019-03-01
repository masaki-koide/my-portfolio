import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as API from '~/api/articles'
import About from '~/components/pages/about'
import { AppState } from '~/modules'
import {
  actionTypes,
  getHatenaItems,
  getNoteItems,
  getQiitaItems,
  incrementCount
} from '~/modules/articles'
import { loadingSelector } from '~/modules/loading'

const mapStateToProps = ({
  article: { count, qiitaItems, noteItems, hatenaItems },
  loading
}: AppState) => ({
  count,
  qiitaItems,
  noteItems,
  hatenaItems,
  loading: loadingSelector(loading, actionTypes)
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
    this.dispatch(getHatenaItems.started())
    API.getHatenaBlogItems()
      .then(items => {
        this.dispatch(getHatenaItems.done({ result: items }))
      })
      .catch(error => {
        this.dispatch(getHatenaItems.failed({ error }))
      })
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { actions: new ActionDispather(dispatch) }
}

export type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(About)
