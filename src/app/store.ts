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
export const setQiitaItems = actionCreator<any[]>('setQiitaItems')

export const reducer = reducerWithInitialState<AppState>(initialState)
  .case(incrementCount, state => {
    return {
      ...state,
      count: ++state.count
    }
  })
  .case(setQiitaItems, (state, payload) => {
    return {
      ...state,
      qiitaItems: payload
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
