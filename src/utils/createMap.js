import { create2dArray, createRoom, createTile, randomRoom } from './'
import { startingAreas, passages } from '../resources'

export const createMap = ({ rows, columns }) => {
  let map = create2dArray(rows, columns, createTile({ type: 0 })), // generate empty map
  currentRow = Math.floor(Math.random() * rows), // start at a random row
  currentColumn = Math.floor(Math.random() * columns), // start at a random column
  directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // array to get a random direction from (left,right,up,down)
  lastDirection = [], // save the last direction we went
  randomDirection // next turn/direction - holds a value from directions

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
  let chosenPassages = [],
  maxLength = 0

  for (let p = 0; p < startArea.passages; p++) {
    chosenPassages.push(randomRoom(passages))
  }

  // console.log(chosenPassages)

  // TODO: Make sure passage spawn away from center of room
  // Fix below code as it currently fills the entire map, or crashes the app.

  // for (let pGen = 0; pGen < chosenPassages.length; pGen++) {
  //   let passageLength = 0 // current length of passage being created
  //   maxLength = chosenPassages[pGen].rows
  //
  //   randomDirection = directions[2] // left
  //
  //   // get a random direction perpendicular to our lastDirection
  //   // do {
  //   //   randomDirection = directions[Math.floor(Math.random() * directions.length)]
  //   // } while (
  //   //   (randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) ||
  //   //   (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1])
  //   // )
  //
  //   // loop until our passage is long enough or until we hit an edge
  //   while (passageLength < maxLength) {
  //     // break the loop if it is going out of the map
  //     if (
  //       ((currentRow === 0) && (randomDirection[0] === -1)) ||
  //       ((currentColumn === 0) && (randomDirection[1] === -1)) ||
  //       ((currentRow === rows - 1) && (randomDirection[0] === 1)) ||
  //       ((currentColumn === columns - 1) && (randomDirection[1] === 1))
  //     ) {
  //       break
  //     }
  //     else {
  //       // set current tile to a path
  //       map[currentRow][currentColumn].type = 1
  //       // update current position
  //       currentRow += randomDirection[0]
  //       currentColumn += randomDirection[1]
  //       // passage is now one longer
  //       passageLength++
  //     }
  //   }
  //
  // }

  map[startTile.row][startTile.column].type = 's' // set start tile color
  // map[currentRow][currentColumn] = 'e' // set end tile color

  return map
}
