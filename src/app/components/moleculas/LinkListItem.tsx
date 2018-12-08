import { css } from '@emotion/core'
import { SFC } from 'react'
import Link from '../atoms/Link'

interface Props {
  href: string
  text: string
}

const style = css`
  word-wrap: break-word;
`

const LinkListItem: SFC<Props> = ({ text, href }) => (
  <div css={style}>
    <Link href={href}>{text}</Link>
  </div>
)

export default LinkListItem
