import { Items } from 'rss-parser'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { QiitaItems } from '~/api/articles'

export interface AppState {
  count: number
  qiitaItems: QiitaItems
  noteItems: Items[]
  hatenaItems: Items[]
}

const initialState: AppState = {
  count: 0,
  qiitaItems: [],
  noteItems: [],
  hatenaItems: []
}

const actionCreator = actionCreatorFactory()
export const incrementCount = actionCreator('INCREMENT')
export const getQiitaItems = actionCreator.async<void, QiitaItems, Error>(
  'GET_QIITA_ITEMS'
)
export const getNoteItems = actionCreator.async<void, Items[], Error>(
  'GET_NOTE_ITEMS'
)
export const getHatenaItems = actionCreator.async<void, Items[], Error>(
  'GET_HATENA_ITEMS'
)

export default reducerWithInitialState<AppState>(initialState)
  .case(incrementCount, state => {
    return {
      ...state,
      count: ++state.count
    }
  })
  .case(getQiitaItems.started, state => {
    return {
      ...state,
      qiitaItems: [{ id: 'started', title: '取得中', url: '' }]
    }
  })
  .case(getQiitaItems.done, (state, { result }) => {
    return {
      ...state,
      qiitaItems: result
    }
  })
  .case(getQiitaItems.failed, (state, { error }) => {
    return {
      ...state,
      qiitaItems: [{ id: 'failed', title: error.message, url: '' }]
    }
  })
  .case(getNoteItems.done, (state, { result }) => {
    return {
      ...state,
      noteItems: result
    }
  })
  .case(getHatenaItems.done, (state, { result }) => {
    return {
      ...state,
      hatenaItems: result
    }
  })
