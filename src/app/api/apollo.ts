import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
            id
            url
            name
            description
            createdAt
            languages(first: 5) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

export class GetGitHubItemsQuery extends Query<{
  user: {
    repositories: {
      edges: [
        {
          node: {
            id: string
            url: string
            name: string
            description: string
            createdAt: string
            languages: {
              edges: [
                {
                  node: {
                    id: string
                    name: string
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }
}> {}
