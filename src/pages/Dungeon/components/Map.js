import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import MapKey, { getMapKeyItems } from '../../../components/MapKey'
import { Container, Row } from '../../../components/map'
import { Tile, TILE_SIZE, BORDER_WIDTH } from '../../../components/tile'
import Camera from './Camera'
import { createMap, addRoomToMap } from '../../../utils'

const RegenBtn = styled(Button)`
  position: absolute;
  z-index: ${props => props.theme.zIndex.menu};
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`

class Map extends React.Component {
  state = {
    mapGrid: [],
    keyItems: [],
    rooms: [],
    roomCounter: 0,
  }

  componentDidMount() {
    this.newMap()
  }

  newMap = () => {
    const { rows, columns } = this.props
    const { mapGrid, rooms } = createMap({ rows, columns })
    const keyItems = getMapKeyItems(mapGrid)
    this.setState({ mapGrid, rooms, keyItems })
  }

  openADoor = door => {
    let rooms = this.state.rooms
    const roomToReveal = rooms
      .filter(r => !r.visible)
      .reduce((chosenRoom, r) => {
        if (r.doorTile.row === door.row && r.doorTile.column === door.column) {
          rooms.pop(r)
          chosenRoom = {
            position: r.position,
            room: r.roomChoice,
            roomTiles: r.room.roomTiles,
          }
        }
        return chosenRoom
      }, null)
    if (roomToReveal) {
      this.setState(state => {
        const roomCounter = state.roomCounter + 1
        const mapGrid = addRoomToMap(state.mapGrid, roomToReveal)
        const keyItems = getMapKeyItems(mapGrid)
        // TODO: make room visible in array
        return { mapGrid, keyItems, roomCounter, rooms }
      })
    }
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
                    openADoor={this.openADoor}
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
