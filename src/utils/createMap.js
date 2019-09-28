import {
  createBlankMap,
  randomRoom,
  createRoom,
  createPassages,
  createRoomBehindDoor,
  addRoomToMap,
} from './'
import { startingAreas } from '../resources'

export const createMap = ({ rows, columns }) => {
  // Generate empty map 2d array
  let map = createBlankMap(rows, columns),

  // start at a random [row column]
  currentRow = Math.floor(Math.random() * rows),
  currentColumn = Math.floor(Math.random() * columns),

  // list room objects
  rooms = []
  // eg: {
  //   door: { row, column, side }, // NOTE: door only if room has come from a door
  //   room: { grid: 2dArray of tiles, visible: false },
  // }


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

  // store starting tile for styling later
  const startTile = { row: currentRow, column: currentColumn }

  // Starting Area
  map = addRoomToMap(
    map,
    {
      position: startTile,
      room: startArea,
      roomTiles: startingAreaRoom.roomTiles,
    }
  )

  // create any passages off from starting area
  const startWithPassages = createPassages(startTile, { map, rows, columns }, startArea.passages, startingAreaRoom.roomTiles)
  map = startWithPassages.map

  // TODO: add passages to map rooms

  // generate additional spaces from any doors
  startingAreaRoom.doors.map(d => rooms.push(createRoomBehindDoor(startTile, map, d)))

  const output = {
    mapGrid: map,
    rooms: rooms,
  }

  return output
}
