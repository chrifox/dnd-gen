// create the preliminary map, this consists of
// the starting area with any initial passages and doors

import {
  createTile,
  randomRoom,
  createRoom,
  createPassages,
  createRoomBehindDoor,
  addRoomToMap,
} from './'
import { startingAreas } from '../resources'

export const createMap = ({ rows, columns }) => {
  // Initialise variables
  let map = [],

  // choose random start point [row column]
  currentRow = Math.floor(Math.random() * rows),
  currentColumn = Math.floor(Math.random() * columns),

  // list of rooms
  rooms = []

  // create shape of map as 2D array
  for (var row = 0; row < rows; row++) {
    map.push([])
    for (var column = 0; column < columns; column++) {
      const tile = createTile({ type: 0, row, column })
      map[row].push(tile)
    }
  }

  // generate starting area
  const startArea = randomRoom(startingAreas)
  const startingAreaRoom = createRoom(startArea)

  // add starting area to rooms
  rooms.push({ ...startingAreaRoom, visible: true })

  // adjust current position to fit chosen starting area
  // also prevent spawning within 8 tiles from an edge
  const DEAD_ZONE = 8
  if (currentRow + startArea.rows > rows - DEAD_ZONE) {
    currentRow -= startArea.rows + DEAD_ZONE
  }
  if (currentColumn + startArea.columns > columns - DEAD_ZONE) {
    currentColumn -= startArea.columns + DEAD_ZONE
  }
  if (currentRow < DEAD_ZONE + 1) currentRow = DEAD_ZONE + 1
  if (currentColumn < DEAD_ZONE + 1) currentColumn = DEAD_ZONE + 1

  // store starting tile
  const startTile = { row: currentRow, column: currentColumn }

  // add starting area once it is finalised
  map = addRoomToMap(map, {
      position: startTile,
      room: startArea,
      roomTiles: startingAreaRoom.roomTiles,
    }
  )

  // create any passages coming off from starting area
  const startWithPassages = createPassages(startTile, { map, rows, columns }, startArea.passages, startingAreaRoom.roomTiles)
  map = startWithPassages.map

  // generate additional spaces from any doors
  startingAreaRoom.doors.map(d => rooms.push(createRoomBehindDoor(startTile, map, d)))

  const output = {
    mapGrid: map,
    rooms: rooms,
  }

  return output
}
