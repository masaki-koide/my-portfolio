import Parser, { Items } from 'rss-parser'

export interface APIResponse {
  json?: any
  error?: any
}

const wrapFetch = (
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<APIResponse> => {
  return fetch(input, init)
    .then(response => response.json())
    .then(json => {
      return { json }
    })
    .catch(error => {
      return { error }
    })
}

export function getQiitaItems(): Promise<APIResponse> {
  return wrapFetch(
    'https://qiita.com/api/v2/authenticated_user/items?per_page=5',
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
    .then(items => items)
    .catch(err => {
      return err
    })
}

export function getNoteItems(): Promise<Items[]> {
  return getFeedItems('https://note.mu/mar_key/rss')
}

export function getHatenaBlogItems(): Promise<Items[]> {
  return getFeedItems('https://receiptnoura.hatenablog.jp/rss')
}
