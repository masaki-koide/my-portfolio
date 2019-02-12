import withRedux from 'next-redux-wrapper'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import myMiddleware from './middleware'
import reducer, { AppState } from './modules/app'

export const initStore = (state: AppState, { debug }: withRedux.Options) => {
  return debug
    ? createStore(
        reducer,
        state,
        composeWithDevTools(applyMiddleware(myMiddleware))
      )
    : createStore(reducer, state, applyMiddleware(myMiddleware))
}
