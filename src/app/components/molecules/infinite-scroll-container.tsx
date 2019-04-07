import { css } from '@emotion/core'
import React, { createRef, FC, ReactNode, RefObject, useEffect } from 'react'

// TODO:型つけたい
function eventThrottle(handler: (event: any) => void, wait: number) {
  let time = Date.now()
  return (event: any) => {
    const now = Date.now()
    if (time + wait - now < 0) {
      handler(event)
      time = now
    }
  }
}

// TODO:callbackが非同期の場合も考慮する
function useInfinitScroll<T extends HTMLElement>(
  callback: () => void,
  ref: RefObject<T>,
  interval: number = 300,
  padding: number = 250
) {
  let scrollNode: T | null

  useEffect(() => {
    scrollNode = ref.current
    const parentNode = scrollNode && scrollNode.parentNode
    if (!parentNode) {
      return
    }
    const throttledOnScroll = eventThrottle(onScroll, interval)
    // TODO:ブラウザの判定
    parentNode.addEventListener('scroll', throttledOnScroll, { passive: true })
    return () => {
      if (!parentNode) {
        return
      }
      parentNode.removeEventListener('scroll', throttledOnScroll)
    }
  }, [])

  function onScroll(event: React.UIEvent<T>) {
    if (!scrollNode) {
      return
    }
    // TODO:型つけたい
    const target = event.currentTarget
    const remaining =
      scrollNode.scrollHeight - (target.clientHeight + target.scrollTop)
    console.log('target.scrollHeight %d', target.scrollHeight)
    console.log('target.clientHeight %d', target.clientHeight)
    console.log('target.scrollTop %d', target.scrollTop)
    if (remaining < padding) {
      console.log('callback fire')
      callback()
    }
  }
}

const outerStyle = css`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
`

const innerStyle = css`
  width: 100%;
`

type Props = {
  children: ReactNode
  callback: () => void
  interval?: number
  padding?: number
}

const InfiniteScrollContainer: FC<Props> = ({
  children,
  callback,
  interval,
  padding
}) => {
  const innerRef = createRef<HTMLDivElement>()
  useInfinitScroll(callback, innerRef, interval, padding)

  return (
    <div css={outerStyle}>
      <div ref={innerRef} css={innerStyle}>
        {children}
      </div>
    </div>
  )
}

export default InfiniteScrollContainer
