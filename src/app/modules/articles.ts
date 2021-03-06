import { Items } from 'rss-parser'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { QiitaItems } from '~/api/articles'
import { Props as Article } from '~/components/molecules/article'

export type ArticlesState = {
  count: number
  qiitaItems?: Article[]
  noteItems?: Article[]
  hatenaItems?: Article[]
}

const initialState: ArticlesState = {
  count: 0,
  qiitaItems: undefined,
  noteItems: undefined,
  hatenaItems: undefined
}

const actionCreator = actionCreatorFactory('ARTICLES')
export const incrementCount = actionCreator('INCREMENT')
export const getQiitaItems = actionCreator.async<void, QiitaItems, Error>(
  'GET_QIITA_ITEMS'
)
export const getNoteItems = actionCreator.async<void, Items[], Error>(
  'GET_NOTE_ITEMS'
)
export const getHatenaItems = actionCreator.async<void, Items[], Error>(
  'GET_HATENA_ITEMS'
)

export const asyncActionTypes = [
  getQiitaItems.type,
  getNoteItems.type,
  getHatenaItems.type
]

const descriptionLength = 200
const feedsToArticles = (feeds: Items[]): Article[] => {
  return feeds.map(feed => ({
    title: feed.title || '',
    description: feed.contentSnippet
      ? feed.contentSnippet.slice(0, descriptionLength)
      : '',
    tags: undefined
  }))
}

export default reducerWithInitialState<ArticlesState>(initialState)
  .case(incrementCount, state => {
    return {
      ...state,
      count: ++state.count
    }
  })
  .case(getQiitaItems.done, (state, { result }) => {
    const qiitaItems = result.map(item => ({
      title: item.title,
      description: item.body.slice(0, descriptionLength),
      tags:
        item.tags &&
        item.tags.map((tag, i) => ({ id: String(i), ...tag })).slice(0, 5)
    }))
    return {
      ...state,
      qiitaItems
    }
  })
  .case(getNoteItems.done, (state, { result }) => {
    const noteItems = feedsToArticles(result)
    return {
      ...state,
      noteItems
    }
  })
  .case(getHatenaItems.done, (state, { result }) => {
    const hatenaItems = feedsToArticles(result)
    return {
      ...state,
      hatenaItems
    }
  })
