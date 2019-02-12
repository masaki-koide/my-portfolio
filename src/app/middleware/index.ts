import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux'

const myMiddleware: Middleware = (_: MiddlewareAPI) => (next: Dispatch) => (
  action: Action
) => {
  const matches = /(.+)_(STARTED)/.exec(action.type)

  if (!matches) {
    return next(action)
  }

  const [, actionName, actionState] = matches
  console.log(`${actionName}が${actionState}しました！`)
  return next(action)
}

export default myMiddleware
