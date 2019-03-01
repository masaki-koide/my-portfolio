import { combineReducers } from 'redux'
import article, { ArticlesState } from './articles'
import error, { ErrorState } from './error'
import loading, { LoadingState } from './loading'

export type AppState = {
  article: ArticlesState
  loading: LoadingState
  error: ErrorState
}

export default combineReducers<AppState>({ article, loading, error })
