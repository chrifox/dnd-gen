import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { createRoom } from '../../utils/createRoom'

const TILE_SIZE = 54
const BORDER_WIDTH = 2

const Container = styled.div`
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  padding: ${TILE_SIZE * 1.5}px;
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

const tileBorder = props => {
  const { n, e, s, w } = props.options
  return css`
    border-top-color: rgba(100,0,0,${n ? 0.5 : 0.2});
    border-right-color: rgba(100,0,0,${e ? 0.5 : 0.2});
    border-bottom-color: rgba(100,0,0,${s ? 0.5 : 0.2});
    border-left-color: rgba(100,0,0,${w ? 0.5 : 0.2});
  `
}

const Tile = styled.div`
  padding: ${(TILE_SIZE - BORDER_WIDTH * 2) / 2}px;
  background: ${props => props.theme.tileColors[tileStyles(props)]};
  border-width: ${BORDER_WIDTH}px;
  border-style: solid;
  ${tileBorder};
`
// border: ${BORDER_WIDTH}px solid rgba(0,0,0,0.3);

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
              {row.map(({ type, ...options }, colIndex) =>
                <Tile
                  key={`${rowIndex}-${colIndex}`}
                  options={{
                    n: rowIndex === 0,
                    e: colIndex === row.length - 1,
                    s: rowIndex === room.length - 1,
                    w: colIndex === 0,
                  }}
                  value={type}
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
