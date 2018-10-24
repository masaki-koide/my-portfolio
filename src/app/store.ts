import withRedux from 'next-redux-wrapper'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface AppState {
  count: number
  qiitaItems: any[]
  noteItems: any[]
  gitHubItems: any[]
  hatenaBlogItems: any[]
}

const initialState: AppState = {
  count: 0,
  qiitaItems: [],
  noteItems: [],
  gitHubItems: [],
  hatenaBlogItems: []
}

const actionCreator = actionCreatorFactory()
export const incrementCount = actionCreator('increment')
export const getQiitaItems = actionCreator.async<void, any[], Error>(
  'getQiitaItems'
)
export const getNoteItems = actionCreator.async<void, any[], Error>(
  'getNoteItems'
)
export const getGitHubItems = actionCreator.async<void, any[], Error>(
  'getGitHubItems'
)
export const getHatenaBlogItems = actionCreator.async<void, any[], Error>(
  'getHatenaBlogItems'
)

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
  .case(getGitHubItems.done, (state, { result }) => {
    return {
      ...state,
      gitHubItems: result
    }
  })
  .case(getHatenaBlogItems.done, (state, { result }) => {
    return {
      ...state,
      hatenaBlogItems: result
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
