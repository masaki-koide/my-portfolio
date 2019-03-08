// import { color, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import SectionArea from '../molecules/section-area'

storiesOf('SectionArea', module)
  // .addDecorator(withKnobs)
  .add('basic', () => (
    // <SectionArea color={color('color', 'blue')}>
    <SectionArea color="blue">
      <div>コンテンツ</div>
    </SectionArea>
  ))
