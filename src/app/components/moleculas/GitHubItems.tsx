import { ApolloProvider, Query } from 'react-apollo'
import { client, query } from '../../api/apollo'

export default () => (
  <ApolloProvider client={client}>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>...loading</p>
        }
        if (error) {
          return <p>{error.message}</p>
        }

        console.log(data)
        return (
          <ul>
            {data.user.repositories.edges.map((item: any) => (
              <li key={item.node.url}>
                <a href={item.node.url} target="_blank">
                  {item.node.name}
                </a>
              </li>
            ))}
          </ul>
        )
      }}
    </Query>
  </ApolloProvider>
)
