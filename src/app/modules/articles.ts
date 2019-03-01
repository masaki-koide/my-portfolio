import { Items } from 'rss-parser'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { QiitaItems } from '~/api/articles'

export type ArticlesState = {
  count: number
  qiitaItems: QiitaItems
  noteItems: Items[]
  hatenaItems: Items[]
}

const initialState: ArticlesState = {
  count: 0,
  qiitaItems: [],
  noteItems: [],
  hatenaItems: []
}

const actionCreator = actionCreatorFactory('ARTICLES')
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

export const actionTypes = [
  getQiitaItems.type,
  getNoteItems.type,
  getHatenaItems.type
]

export default reducerWithInitialState<ArticlesState>(initialState)
  .case(incrementCount, state => {
    return {
      ...state,
      count: ++state.count
    }
  })
  .case(getQiitaItems.done, (state, { result }) => {
    return {
      ...state,
      qiitaItems: result
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
