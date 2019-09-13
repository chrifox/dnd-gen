import React from 'react'

import { Tile } from '../tile'

export const getMapKeyItems = mapGrid => {
  let keyItems = []

  const innerTile = {
    name: 'Tile',
    symbol: <Tile value={1} />,
    description: 'Inner tile',
  }
  const outerTile = {
    name: 'OuterTile',
    symbol: <Tile value={1} top right bottom left />,
    description: 'Outer tile',
  }
  const door = {
    name: 'Door',
    symbol: <Tile value={1} left door="left" />,
    description: 'Door',
  }
  const secretDoor = {
    name: 'SecretDoor',
    symbol: <Tile value={1} left secretDoor="left" />,
    description: 'Secret door',
  }

  // All maps will contain inner and outer tiles
  keyItems.push(innerTile)
  keyItems.push(outerTile)

  mapGrid.map(row => row.map(tile => {
      if (!keyItems.includes(door) && tile.door) keyItems.push(door)
      if (!keyItems.includes(secretDoor) && tile.secretDoor) keyItems.push(secretDoor)
    }
  ))

  return keyItems
}
