import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { createRoom } from '../../utils/createRoom'
import { Container, Row } from './map'
import { Tile } from './tile'

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
