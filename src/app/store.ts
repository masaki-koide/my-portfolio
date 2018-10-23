import withRedux from 'next-redux-wrapper'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface AppState {
  count: number
  qiitaItems: any[]
}

const initialState: AppState = {
  count: 0,
  qiitaItems: []
}

const actionCreator = actionCreatorFactory()
export const incrementCount = actionCreator('increment')
export const setQiitaItems = actionCreator.async<void, any[], Error>(
  'setQiitaItems'
)

export const reducer = reducerWithInitialState<AppState>(initialState)
  .case(incrementCount, state => {
    return {
      ...state,
      count: ++state.count
    }
  })
  .case(setQiitaItems.started, state => {
    return {
      ...state,
      qiitaItems: [{ id: 'started', title: '取得中' }]
    }
  })
  .case(setQiitaItems.done, (state, { result }) => {
    return {
      ...state,
      qiitaItems: result
    }
  })
  .case(setQiitaItems.failed, (state, { error }) => {
    return {
      ...state,
      qiitaItems: [{ id: 'failed', title: error.message }]
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
