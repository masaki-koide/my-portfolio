import { storiesOf } from '@storybook/react'
import Article from './article'

storiesOf('Article', module).add('basic', () => (
  <Article
    title="Title"
    description="description"
    tags={[
      {
        id: '1',
        name: 'tag1'
      },
      {
        id: '2',
        name: 'tag2'
      },
      {
        id: '3',
        name: 'tag3'
      }
    ]}
  />
))
