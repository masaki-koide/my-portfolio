import { AnyAction, Reducer } from 'redux'

export type ErrorState = {
  [key: string]: Error | undefined
}

// TODO:エラーの型によってエラーメッセージを振り分ける？
export const errorSelector = (state: ErrorState, actionTypes: string[]) => {
  const errorType = actionTypes.find(actionType => !!state[actionType])
  return errorType ? state[errorType] : undefined
}

const errorReducer: Reducer<ErrorState> = (
  state: ErrorState | undefined = {},
  action: AnyAction
) => {
  const { type, payload } = action
  const matches = /(.*)_(STARTED|DONE|FAILED)/.exec(type)

  if (!matches) {
    return state
  }

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]:
      requestState === 'FAILED' && payload && payload.error
        ? payload.error
        : undefined
  }
}

export default errorReducer
