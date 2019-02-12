import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface AppState {
  count: number
  qiitaItems: any[]
  noteItems: any[]
  gitHubItems: any[]
  hatenaItems: any[]
}

const initialState: AppState = {
  count: 0,
  qiitaItems: [],
  noteItems: [],
  gitHubItems: [],
  hatenaItems: []
}

const actionCreator = actionCreatorFactory()
export const incrementCount = actionCreator('INCREMENT')
export const getQiitaItems = actionCreator.async<void, any[], Error>(
  'GET_QIITA_ITEMS'
)
export const getNoteItems = actionCreator.async<void, any[], Error>(
  'GET_NOTE_ITEMS'
)
export const getGitHubItems = actionCreator.async<void, any[], Error>(
  'GET_GITHUB_ITEMS'
)
export const getHatenaItems = actionCreator.async<void, any[], Error>(
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
  .case(getHatenaItems.done, (state, { result }) => {
    return {
      ...state,
      hatenaItems: result
    }
  })
