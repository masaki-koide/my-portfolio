import withRedux from 'next-redux-wrapper'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface AppState {
  count: number
}

const initialState: AppState = {
  count: 0
}

const actionCreator = actionCreatorFactory()
export const incrementCount = actionCreator('increment')

export const reducer = reducerWithInitialState<AppState>(initialState).case(
  incrementCount,
  state => {
    return {
      ...state,
      count: ++state.count
    }
  }
)

export const initStore = (
  state: AppState = initialState,
  { debug }: withRedux.Options
) => {
  return debug
    ? createStore(reducer, state, composeWithDevTools())
    : createStore(reducer, state)
}
