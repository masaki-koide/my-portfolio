import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    })
  }
})

export const query = gql`
  query {
    user(login: "masaki-koide") {
      repositories(first: 5, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`
