import React from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Button from './Button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dungeon', label: 'Dungeon' },
  { to: '/dmg-generator', label: 'DMG Generator' },
]

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 5px;
`

const Link = styled(Button)`
  margin: 0 5px;
`

const Navbar = () => (
  <Nav>
      {links.map(({ key, to, label }) => (
          <Link key={label} onClick={() => Router.push(to)}>
            {label}
          </Link>
      ))}
  </Nav>
)

export default Navbar
