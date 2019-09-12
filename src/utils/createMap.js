import {
  create2dArray,
  createRoom,
  createTile,
  randomRoom,
  createPassages,
} from './'
import { startingAreas } from '../resources'

export const createMap = ({ rows, columns }) => {
  let map = create2dArray(rows, columns, createTile({ type: 0 })), // generate empty map
  currentRow = Math.floor(Math.random() * rows), // start at a random row
  currentColumn = Math.floor(Math.random() * columns) // start at a random column

  // generate room
  const startArea = randomRoom(startingAreas)
  const startingAreaTiles = createRoom(startArea)

  // adjust current position to fit chosen room
  if (currentRow + startArea.rows > rows) {
    currentRow -= startArea.rows
  }
  if (currentColumn + startArea.columns > columns) {
    currentColumn -= startArea.columns
  }

  // store starting tile for styling later
  const startTile = { row: currentRow, column: currentColumn }

  // update map to reflect new room
  for (let row = 0; row < startArea.rows; row++) {
    for (let col = 0; col < startArea.columns; col ++) {
      map[currentRow + row][currentColumn + col] = startingAreaTiles[row][col]
    }
  }

  // add passages
  map = createPassages({ currentRow, currentColumn }, startArea.passages, map)

  map[startTile.row][startTile.column].type = 's' // set start tile color
  // map[currentRow][currentColumn] = 'e' // set end tile color

  return map
}
