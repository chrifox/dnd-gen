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
  const passage = {
    name: 'Passage',
    symbol: <Tile value={2} />,
    description: 'Passage tile',
  }
  const trap = {
    name: 'Trap',
    symbol: <Tile value={3} />,
    description: 'Trap',
  }
  const chamber = {
    name: 'Chamber',
    symbol: <Tile value={4} />,
    description: 'Chamber tile',
  }
  const water = {
    name: 'Water',
    symbol: <Tile value={5} />,
    description: 'Water tile',
  }

  // All maps will contain inner and outer tiles
  keyItems.push(innerTile)
  keyItems.push(outerTile)

  mapGrid.map(row => row.map(tile => {
      if (!keyItems.includes(door) && tile.door) keyItems.push(door)
      if (!keyItems.includes(secretDoor) && tile.secretDoor) keyItems.push(secretDoor)
      // if (!keyItems.includes(passage) && tile.type === 2) keyItems.push(passage)
      if (!keyItems.includes(trap) && tile.type === 3) keyItems.push(trap)
      if (!keyItems.includes(chamber) && tile.type === 4) keyItems.push(chamber)
      if (!keyItems.includes(water) && tile.type === 5) keyItems.push(water)
    }
  ))

  return keyItems
}
