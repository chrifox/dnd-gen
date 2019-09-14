import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import MapKey, { getMapKeyItems } from '../../../components/MapKey'
import { Container, Row } from '../../../components/map'
import { Tile, TILE_SIZE, BORDER_WIDTH } from '../../../components/tile'
import Camera from './Camera'
import { createMap } from '../../../utils/createMap'

const RegenBtn = styled(Button)`
  position: absolute;
  z-index: ${props => props.theme.zIndex.menu};
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
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
    const { rows, columns } = this.props
    const { mapGrid, keyItems } = this.state
    const contentSize = {
      width: columns * (TILE_SIZE + BORDER_WIDTH * 2),
      height: rows * (TILE_SIZE + BORDER_WIDTH * 2),
    }
    return (
      <>
        <RegenBtn onClick={this.newMap}>Regenerate</RegenBtn>

        <Camera contentSize={contentSize}>
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
        </Camera>

        <MapKey items={keyItems} />
      </>
    )
  }
}

export default Map
