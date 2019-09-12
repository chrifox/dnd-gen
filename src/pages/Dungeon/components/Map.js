import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import { Container, Row } from '../../../components/map'
import { Tile } from '../../../components/tile'
import { createMap } from '../../../utils/createMap'

const RegenBtn = styled(Button)`
  margin-bottom: 10px;
`

class Map extends React.Component {
  state = { mapGrid: [] }

  componentDidMount() {
    this.newMap()
  }


  newMap = () => {
    const { rows, columns } = this.props
    const mapGrid = createMap({
      rows,
      columns,
      maxTunnels: 50,
      maxLength: 5,
    })
    this.setState({ mapGrid })
  }

  render() {
    const { mapGrid } = this.state
    return (
      <>

        <RegenBtn onClick={this.newMap}>Regenerate</RegenBtn>

        <Container>
          {mapGrid.map((row, rowIndex) => (
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

export default Map
