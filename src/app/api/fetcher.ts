import fetch from 'isomorphic-unfetch'

const defaultTimeoutMs = 10 * 1000

// catchした際にタイムアウトによるエラーかそれ以外のエラーか判別するため
export class TimeoutError extends Error {}

const timeout = <T>(task: Promise<T>, ms?: number) => {
  const timeoutMs = ms || defaultTimeoutMs
  const timeoutTask = new Promise((resolve, _) => {
    setTimeout(resolve, timeoutMs)
  }).then(() =>
    Promise.reject(
      new TimeoutError(`Operation timed out after ${timeoutMs} ms`)
    )
  )

  return Promise.race([task, timeoutTask])
}

const wrap = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(json => {
              resolve(json)
            })
            .catch(error => {
              reject(error)
            })
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

const fetcher = <T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  return wrap<T>(timeout(fetch(input, init)))
}

export default fetcher
