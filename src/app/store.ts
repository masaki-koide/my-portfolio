import withRedux from 'next-redux-wrapper'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer, { AppState } from '~/modules'

export const initStore = (state: AppState, { debug }: withRedux.Options) => {
  return debug
    ? createStore(reducer, state, composeWithDevTools())
    : createStore(reducer, state)
}
