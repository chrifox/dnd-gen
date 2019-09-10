import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { createRoom } from '../utils/createRoom'
import { Row } from './map'
import { Tile } from './tile'

class Room extends React.Component {
  state = { room: [] }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.rows !== this.props.rows || prevProps.columns !== this.props.columns) {
      this.newRoom()
    }
  }

  newRoom = () => this.setState({
    room: createRoom(this.props),
  })

  render() {
    const { room } = this.state
    return (
      <>
        {room.map((row, rowIndex) => (
          <Row length={row.length} key={rowIndex}>
            {row.map(({ type, ...options }, colIndex) =>
              <Tile
                key={`${rowIndex}-${colIndex}`}
                value={type}
                {...options}
              />
            )}
          </Row>
        ))}
      </>
    )
  }
}

export default Room
