import withRedux from 'next-redux-wrapper'
import App, { Container, NextAppContext } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { initStore } from '~/store'

interface Props extends NextAppContext {
  store: Store
}

export default withRedux(initStore, {
  debug: process.env.NODE_ENV !== 'production'
})(
  class MyApp extends App<Props> {
    public static async getInitialProps({ Component, ctx }: Props) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      }
    }

    public render() {
      const { Component, pageProps, store } = this.props
      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      )
    }
  }
)
