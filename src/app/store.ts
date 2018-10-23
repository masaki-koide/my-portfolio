import withRedux from 'next-redux-wrapper'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface AppState {
  count: number
  qiitaItems: any[]
  noteItems: any[]
  gTest: any
}

const initialState: AppState = {
  count: 0,
  qiitaItems: [],
  noteItems: [],
  gTest: null
}

const actionCreator = actionCreatorFactory()
export const incrementCount = actionCreator('increment')
export const getQiitaItems = actionCreator.async<void, any[], Error>(
  'getQiitaItems'
)
export const getNoteItems = actionCreator.async<void, any[], Error>(
  'getNoteItems'
)
export const gTest = actionCreator.async<void, any, Error>('gTest')

export const reducer = reducerWithInitialState<AppState>(initialState)
  .case(incrementCount, state => {
    return {
      ...state,
      count: ++state.count
    }
  })
  .case(getQiitaItems.started, state => {
    return {
      ...state,
      qiitaItems: [{ id: 'started', title: '取得中' }]
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
      qiitaItems: [{ id: 'failed', title: error.message }]
    }
  })
  .case(getNoteItems.done, (state, { result }) => {
    return {
      ...state,
      noteItems: result
    }
  })
  .case(gTest.done, (state, { result }) => {
    return {
      ...state,
      gTest: result
    }
  })

export const initStore = (
  state: AppState = initialState,
  { debug }: withRedux.Options
) => {
  return debug
    ? createStore(reducer, state, composeWithDevTools())
    : createStore(reducer, state)
}
