import { storiesOf } from '@storybook/react'
import ArticleSectionArea from './article-section-area'

function arrayRepeat<T>(elm: T, num: number): T[] {
  const array = []
  for (let i = 0; i < num; i++) {
    array.push(elm)
  }
  return array
}

const element = {
  title: 'Title',
  description: 'description',
  tags: [
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
  ]
}

// TODO:長いコンテンツの場合のレイアウトも確認する
storiesOf('ArticleSectionArea', module)
  .add('1 article', () => (
    <ArticleSectionArea
      title="Title"
      color="blue"
      data={arrayRepeat(element, 1)}
    />
  ))
  .add('2 articles', () => (
    <ArticleSectionArea
      title="Title"
      color="blue"
      data={arrayRepeat(element, 2)}
    />
  ))
  .add('3 articles', () => (
    <ArticleSectionArea
      title="Title"
      color="blue"
      data={arrayRepeat(element, 3)}
    />
  ))
  .add('4 articles', () => (
    <ArticleSectionArea
      title="Title"
      color="blue"
      data={arrayRepeat(element, 4)}
    />
  ))
