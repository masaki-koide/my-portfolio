import { combineReducers } from 'redux'
import articles, { ArticlesState } from './articles'
import error, { ErrorState } from './error'
import loading, { LoadingState } from './loading'

export type AppState = {
  articles: ArticlesState
  loading: LoadingState
  error: ErrorState
}

export default combineReducers<AppState>({ articles, loading, error })
