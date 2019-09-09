import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { createRoom } from '../../utils/createRoom'

const TILE_SIZE = 16
const BORDER_WIDTH = 1

const Container = styled.div`
  border: 1px solid #333;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${TILE_SIZE}px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.length * TILE_SIZE}px;
`

const tileStyles = props => {
  switch (props.value) {
    case 0: return 'path'
    default: return 'wall' // default is 1
  }
}

const Tile = styled.div`
  padding: ${(TILE_SIZE - BORDER_WIDTH * 2) / 2}px;
  background: ${props => props.theme.tileColors[tileStyles(props)]};
  border: ${BORDER_WIDTH}px solid rgba(0,0,0,0.3);
`

class Room extends React.Component {
  state = { room: [] }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.rows !== this.props.rows || prevProps.columns !== this.props.columns) {
      this.newRoom()
    }
  }

  newRoom = () => this.setState({
    room: createRoom(this.props.rows, this.props.columns),
  })

  render() {
    const { room } = this.state
    return (
      <>
        <Container>
          {room.map((row, rowIndex) => (
            <Row length={row.length} key={rowIndex}>
              {row.map((tile, colIndex) =>
                <Tile
                  key={`${rowIndex}-${colIndex}`}
                  value={tile}
                />
              )}
            </Row>
          ))}
        </Container>
      </>
    )
  }
}

export default Room
