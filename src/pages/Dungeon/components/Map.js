import React from 'react'
import styled from 'styled-components'

import Camera from './Camera'
import { Row } from '../../../components/map'
import { Tile, TILE_SIZE, BORDER_WIDTH } from '../../../components/tile'
import MapKey from '../../../components/MapKey'
import { useMapState } from '../../../hooks/map'

const Map = ({ rows, columns, keyOpen }) => {
  const {
    state: { mapGrid, rooms, keyItems },
    newMap,
    openADoor,
  } = useMapState({ rows, columns })
  const cameraContainerSize = {
    height: 640,
    width: 960,
  }
  const contentSize = {
    height: rows * (TILE_SIZE + BORDER_WIDTH * 2),
    width: columns * (TILE_SIZE + BORDER_WIDTH * 2),
  }
  return (
    <>
      <Camera containerSize={cameraContainerSize} contentSize={contentSize}>
        {mapGrid.map((row, rowIndex) => (
          <Row length={row.length} key={rowIndex}>
            {row.map(({ type, ...options }, colIndex) =>
              <Tile
                key={`${rowIndex}-${colIndex}`}
                value={type}
                {...options}
                openADoor={openADoor}
              />
            )}
          </Row>
        ))}
      </Camera>
      <MapKey items={keyItems} open={keyOpen} />
    </>
  )
}

export default Map
