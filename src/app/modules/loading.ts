import { Action, Reducer } from 'redux'

export type LoadingState = {
  [key: string]: boolean
}

export const loadingSelector = (
  state: LoadingState,
  actionTypes: string[]
): boolean => actionTypes.some(actionType => state[actionType])

const loadingReducer: Reducer<LoadingState> = (
  state: LoadingState | undefined = {},
  action: Action
) => {
  const { type } = action
  const matches = /(.*)_(STARTED|DONE|FAILED)/.exec(type)

  if (!matches) {
    return state
  }

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === 'STARTED'
  }
}

export default loadingReducer
