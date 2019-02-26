import { ApolloProvider } from 'react-apollo'
import { client, GetGitHubItemsQuery, query } from '~/api/apollo'

export default () => (
  <ApolloProvider client={client}>
    <GetGitHubItemsQuery query={query}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>...loading</p>
        }
        if (error) {
          return <p>{error.message}</p>
        }

        return (
          data && (
            <ul>
              {data.user.repositories.edges.map(item => (
                <li key={item.node.url}>
                  <a href={item.node.url} target="_blank">
                    {item.node.name}
                  </a>
                </li>
              ))}
            </ul>
          )
        )
      }}
    </GetGitHubItemsQuery>
  </ApolloProvider>
)
