import Parser, { Items } from 'rss-parser'
import fetcher from './fetcher'

const itemLimit = 4

export type QiitaItems = Array<{
  [key: string]: any
  id: string
  url: string
  title: string
  body: string
  tags?: Array<{
    name: string
  }>
}>

export function getQiitaItems(limit?: number): Promise<QiitaItems> {
  const perPage = limit || itemLimit
  return fetcher<QiitaItems>(
    `https://qiita.com/api/v2/authenticated_user/items?per_page=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN}`
      }
    }
  )
}

const parser = new Parser()
function getFeedItems(feedUrl: string, limit?: number): Promise<Items[]> {
  const corsProxy = 'https://cors-anywhere.herokuapp.com/'
  const perPage = limit || itemLimit
  return parser
    .parseURL(corsProxy + feedUrl)
    .then<Items[]>(
      feeds =>
        feeds.items
          ? feeds.items.slice(0, perPage)
          : Promise.reject(new Error('Not found feed'))
    )
    .catch(err => Promise.reject(err))
}

export function getNoteItems(): Promise<Items[]> {
  return getFeedItems('https://note.mu/mar_key/rss')
}

export function getHatenaBlogItems(): Promise<Items[]> {
  return getFeedItems('https://receiptnoura.hatenablog.jp/rss')
}
