import React from 'react'
import styled from 'styled-components'
import { PageLayout } from '../../components/layout'
import { H3 } from '../../components/typography'
import Map from './components/Map'

const Menu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  padding: 20px 40px;
  border: 1px solid #ddd;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.backgroundDark};
`

const Control = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  input {
    margin-left: 30px;
  }
`

class Dungeon extends React.Component {
  state = { keyOpen: false, menuOpen: false, rows: 30, columns: 50 }

  componentDidMount() {
    document.addEventListener('keyup', this.keyPress, false)
  }

  componentWillUnmount(){
    document.removeEventListener("keyup", this.keyPress, false);
  }

  keyPress = e => {
    switch (e.keyCode) {
      case 77: return this.toggleMenu() // m
      case 75: return this.toggleKey() // k
    }
  }

  toggleMenu = () => this.setState(state => ({ menuOpen: !state.menuOpen }))

  toggleKey = () => this.setState(state => ({ keyOpen: !state.keyOpen }))

  updateDimensions = e => this.setState({ [e.target.name]: parseInt(e.target.value) })

  render() {
    const { rows, columns, menuOpen, keyOpen } = this.state
    return (
      <PageLayout>
        <Map rows={rows} columns={columns} keyOpen={keyOpen} />

        <Menu open={menuOpen}>
          <H3>Menu</H3>
          <Control>
            <label>Rows: </label>
            <input name="rows" type="number" value={rows} onChange={this.updateDimensions} />
          </Control>

          <Control>
            <label>Columns: </label>
            <input name="columns" type="number" value={columns} onChange={this.updateDimensions} />
          </Control>
        </Menu>
      </PageLayout>
    )
  }
}

export default Dungeon
