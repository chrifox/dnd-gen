import React, { useState } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Button from './Button'
import SvgIcon from './SvgIcon'

const MENU_WIDTH = 200

const links = [
  { to: '/', label: 'Home' },
  { to: '/dungeon', label: 'Dungeon' },
]

const Nav = styled.nav`
  position: absolute;
  z-index: ${props => props.theme.zIndex.menu};
  top: 0;
  left: ${props => props.open ? 0 : -MENU_WIDTH}px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: ${MENU_WIDTH}px;
  background: ${props => props.theme.colors.backgroundDark};
  transition: 0.2s left ease;
`

const Link = styled(Button)`
  margin-bottom: 5px;
`

const MenuToggle = styled(Button)`
  position: absolute;
  z-index: ${props => props.theme.zIndex.menuButton};
  top: 50%;
  left: ${props => props.open ? 200 : 0}px;
  transform: ${props => props.open ? 'translate(-50%,-50%);' : 'translate(-65%,-50%);'}
  transition: 0.2s all ease;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  padding: 0.5em;
  &:hover {
    transform: ${props => props.open ? 'translate(-50%,-50%) scale(1.2);' : 'translate(-20%, -50%);'}
  }
`

const Navbar = () => {
  const [menuOpen, toggleMenu] = useState(false)
  return (
    <>
      <Nav open={menuOpen}>
        {links.map(({ key, to, label }) => (
          <Link key={label} onClick={() => Router.push(to)}>
            {label}
          </Link>
        ))}
      </Nav>

      <MenuToggle onClick={() => toggleMenu(!menuOpen)} open={menuOpen}>
        <SvgIcon name={menuOpen ? 'left' : 'right'} size={36} />
      </MenuToggle>
    </>
  )
}

export default Navbar
