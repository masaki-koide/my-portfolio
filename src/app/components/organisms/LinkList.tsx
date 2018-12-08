import { css } from '@emotion/core'
import { SFC } from 'react'
import LinkListItem from '../moleculas/LinkListItem'

interface Props {
  links: Array<{ href: string; text: string }>
}

const style = css`
  width: 100%;
`

const LinkList: SFC<Props> = ({ links }) => (
  <div css={style}>
    {links.map(link => <LinkListItem href={link.href} text={link.text} />)}
  </div>
)

export default LinkList
