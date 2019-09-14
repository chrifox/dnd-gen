import {
  createBlankMap,
  randomRoom,
  createRoom,
  createTile,
  createPassages,
  createRoomBehindDoor,
  addRoomToMap,
} from './'
import { startingAreas } from '../resources'

export const createMap = ({ rows, columns }) => {
  // Generate empty map
  let map = createBlankMap(rows, columns),

  // start at a random row * column
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
  // Prevent spawning within 10 tiles from edge
  const DEAD_ZONE = 10
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
  startingAreaRoom.doors.map(d =>
    rooms.push(createRoomBehindDoor(startTile, map, d))
  )

  // set start tile color
  // map[startTile.row][startTile.column].type = 's'

  // set end tile color
  // map[currentRow][currentColumn] = 'e'

  const output = {
    mapGrid: map,
    rooms: rooms,
  }

  return output
}
