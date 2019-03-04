import { storiesOf } from '@storybook/react'
import SectionArea from './section-area'

storiesOf('SectionArea', module).add('basic', () => (
  <SectionArea color="blue">
    <div>コンテンツ</div>
  </SectionArea>
))
