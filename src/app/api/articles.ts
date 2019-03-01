import Parser, { Items } from 'rss-parser'
import fetcher from './fetcher'

export type QiitaItems = Array<{
  [key: string]: any
  id: string
  title: string
  url: string
}>

export function getQiitaItems(limit?: number): Promise<QiitaItems> {
  const perPage = limit || 5
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
function getFeedItems(feedUrl: string): Promise<Items[]> {
  const corsProxy = 'https://cors-anywhere.herokuapp.com/'
  return parser
    .parseURL(corsProxy + feedUrl)
    .then<Items[]>(
      feeds => feeds.items || Promise.reject(new Error('Not found feed'))
    )
    .catch(err => Promise.reject(err))
}

export function getNoteItems(): Promise<Items[]> {
  return getFeedItems('https://note.mu/mar_key/rss')
}

export function getHatenaBlogItems(): Promise<Items[]> {
  return getFeedItems('https://receiptnoura.hatenablog.jp/rss')
}
