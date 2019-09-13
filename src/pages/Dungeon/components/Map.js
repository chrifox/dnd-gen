import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import { Container, Row } from '../../../components/map'
import { Tile } from '../../../components/tile'
import { createMap } from '../../../utils/createMap'
import MapKey, { getMapKeyItems } from '../../../components/MapKey'

const RegenBtn = styled(Button)`
  margin-bottom: 10px;
`

class Map extends React.Component {
  state = { mapGrid: [], keyItems: [] }

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
    const keyItems = getMapKeyItems(mapGrid)
    this.setState({ mapGrid, keyItems })
  }

  render() {
    const { mapGrid, keyItems } = this.state
    return (
      <>
        <RegenBtn onClick={this.newMap}>Regenerate</RegenBtn>

        <Container>
          {mapGrid.map((row, rowIndex) => (
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
        </Container>

        <MapKey items={keyItems} />
      </>
    )
  }
}

export default Map
