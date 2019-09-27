import React from 'react'
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
  transform: translate(-60%,-50%);
  transition: 0.2s all ease;
  background: ${props => props.theme.colors.backgroundDark};
  border-radius: 50%;
  padding: 10px;
  &:hover {
    ${props => !props.open && `transform: translate(-30%, -50%);`}
  }
`

class Navbar extends React.Component {
  state = { open: false }

  toggleMenu = () => this.setState(state => ({ open: !state.open }))

  render() {
    const { open } = this.state
    return (
      <>
        <Nav open={open}>
          {links.map(({ key, to, label }) => (
            <Link key={label} onClick={() => Router.push(to)}>
              {label}
            </Link>
          ))}
        </Nav>

        <MenuToggle onClick={this.toggleMenu} open={open}>
          <SvgIcon name={open ? 'left' : 'right'} size={30} />
        </MenuToggle>
      </>
    )
  }
}

export default Navbar
