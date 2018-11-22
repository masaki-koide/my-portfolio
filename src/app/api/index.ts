import querystring from 'querystring'

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

const fetchRSS = (query: string): Promise<APIResponse> => {
  return wrapFetch(`https://query.yahooapis.com/v1/public/yql?${query}`)
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

export function getNoteItems(): Promise<APIResponse> {
  const qs = querystring.stringify({
    q: 'select * from feed where url = "https://note.mu/mar_key/rss" limit 5',
    format: 'json'
  })
  return fetchRSS(qs)
}

export function getHatenaBlogItems(): Promise<APIResponse> {
  const qs = querystring.stringify({
    q:
      'select * from feed where url = "https://receiptnoura.hatenablog.jp/rss" limit 5',
    format: 'json'
  })
  return fetchRSS(qs)
}
