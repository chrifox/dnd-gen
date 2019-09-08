import React from 'react'
import styled from 'styled-components'
import Router from 'next/router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dungeon', label: 'Dungeon' },
]

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 5px;
`

const Link = styled.a`
  display: inline-block;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.primary};
  padding: 0.8em 1.2em;
  margin: 0 5px;
  cursor: pointer;
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
