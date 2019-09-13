import {
  create2dArray,
  createRoom,
  createTile,
  randomRoom,
  createPassages,
} from './'
import { startingAreas } from '../resources'

export const createMap = ({ rows, columns }) => {
  // generate empty map
  let map = create2dArray(rows, columns, createTile({ type: 0 })),
  // start at a random row
  currentRow = Math.floor(Math.random() * rows),
  // start at a random column
  currentColumn = Math.floor(Math.random() * columns),
  mapWithPassages = []

  // generate starting area
  const startArea = randomRoom(startingAreas)
  const startingAreaTiles = createRoom(startArea)

  // adjust current position to fit chosen starting area
  if (currentRow + startArea.rows > rows) {
    currentRow -= startArea.rows
  }
  if (currentColumn + startArea.columns > columns) {
    currentColumn -= startArea.columns
  }

  // store starting tile for styling later
  const startTile = { row: currentRow, column: currentColumn }

  // update map with chosen starting area
  for (let row = 0; row < startArea.rows; row++) {
    for (let col = 0; col < startArea.columns; col ++) {
      map[currentRow + row][currentColumn + col] = {
        ...startingAreaTiles[row][col],
        row: currentRow + row,
        column: currentColumn + col,
      }
    }
  }

  // create any passages off from starting area
  map = createPassages({ currentRow, currentColumn }, { map, rows, columns }, startArea.passages, startingAreaTiles)

  // set start tile color
  // map[startTile.row][startTile.column].type = 's'

  // set end tile color
  // map[currentRow][currentColumn] = 'e'

  return map
}
