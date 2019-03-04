import withRedux from 'next-redux-wrapper'
import App, { Container, NextAppContext } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { initStore } from '~/store'

interface Props extends NextAppContext {
  store: Store
}

export default withRedux(initStore)(
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
        <div>
          <Head>
            <title>my-portfolio</title>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
          </Head>
          <Container>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </Container>
        </div>
      )
    }
  }
)
