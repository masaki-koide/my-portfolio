import { combineReducers } from 'redux'
import article, { ArticlesState } from './articles'
import loading, { LoadingState } from './loading'

export type AppState = {
  article: ArticlesState
  loading: LoadingState
}

export default combineReducers<AppState>({ article, loading })
