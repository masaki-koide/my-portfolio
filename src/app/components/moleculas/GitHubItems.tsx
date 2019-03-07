import { ApolloProvider } from 'react-apollo'
import { client, GetGitHubItemsQuery, query } from '~/api/apollo'
import ArticleSectionArea from '../organisms/article-section-area'

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

        const mappedData =
          data &&
          data.user.repositories.edges.map(repository => ({
            title: repository.node.name,
            description: repository.node.description,
            tags: repository.node.languages.edges
              .map(language => ({
                id: language.node.id,
                name: language.node.name
              }))
              .slice(0, 5)
          }))

        return (
          mappedData && (
            <ArticleSectionArea title="GitHub" color="gray" data={mappedData} />
          )
        )
      }}
    </GetGitHubItemsQuery>
  </ApolloProvider>
)
