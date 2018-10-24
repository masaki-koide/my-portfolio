import Link from 'next/link'
import * as React from 'react'

const Header: React.SFC<{ pathname?: string }> = ({ pathname }) => (
  <header>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>{' '}
    <Link href="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
    <Link href="/materialui">
      <a className={pathname === '/materialui' ? 'is-active' : ''}>
        MaterialUI
      </a>
    </Link>
  </header>
)

export default Header
