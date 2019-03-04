import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer, { AppState } from '~/modules'

export const initStore = (state: AppState) => {
  return createStore(reducer, state, composeWithDevTools())
}
