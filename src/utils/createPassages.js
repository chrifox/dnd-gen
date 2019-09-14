import { randomRoom, createTile } from './'
import { passages } from '../resources'

export const createPassages = (
  startTile,
  { map, rows, columns },
  passagesLength,
  roomTiles,
) => {
  let currentPassage,
  passageLength = 0, // current length of current passage
  maxLength = 0,
  doors = 0, // number of doors in current passage
  lastDirection = [],
  currentDirection = [],
  roomEdges = [], // array of edge tiles in current room
  startingEdge // tile to start current passage on

  // get all edges of current room
  roomTiles.map((row, rowIndex) =>
    row.filter((tile, tileIndex) => {
      if (tile.top || tile.right || tile.bottom || tile.left) {
        roomEdges.push({ rowIndex, tileIndex, ...tile })
      }
    })
  )

  // up, down, left, right
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

  const findDirection = currentDirection => {
    const currentIndex = directions.indexOf(currentDirection)
    switch (currentIndex) {
      case 0: return 'top'
      case 1: return 'bottom'
      case 2: return 'left'
      case 3: return 'right'
      default: return null
    }
  }

  for (let p = 0; p < passagesLength; p++) {
    let currentTile,
    currentRow = startTile.row,
    currentColumn = startTile.column,
    doorTiles = []

    currentPassage = randomRoom(passages, true)
    maxLength = currentPassage.rows,
    doors = currentPassage.doors

    for (let d = 0; d < doors; d++) {
      let random = Math.floor(Math.random() * maxLength)
      doorTiles.push(random)
    }

    // choose a tile without a door or secret door
    startingEdge = (Math.floor(Math.random() * roomEdges.length))
    if (roomEdges[startingEdge].door || roomEdges[startingEdge].door) {
      startingEdge = (Math.floor(Math.random() * roomEdges.length))
    }

    // choose a direction away from the room
    if (roomEdges[startingEdge].top) currentDirection = directions[0]
    if (roomEdges[startingEdge].bottom) currentDirection = directions[1]
    if (roomEdges[startingEdge].left) currentDirection = directions[2]
    if (roomEdges[startingEdge].right) currentDirection = directions[3]

    currentRow += (roomEdges[startingEdge].rowIndex)
    currentColumn += (roomEdges[startingEdge].tileIndex)

    // loop until our passage is long enough or until we hit an edge
    while (passageLength < maxLength) {
      // break the loop if it is going out of the map
      if (
        ((currentRow === 0) && (currentDirection[0] === -1)) ||
        ((currentColumn === 0) && (currentDirection[1] === -1)) ||
        ((currentRow === rows - 1) && (currentDirection[0] === 1)) ||
        ((currentColumn === columns - 1) && (currentDirection[1] === 1))
      ) {
        // Add border to end of passage if stopped short
        currentTile = map[currentRow][currentColumn]
        currentTile[findDirection(currentDirection)] = true
        break
      }
      else {
        currentTile = map[currentRow][currentColumn]
        // remove border where attaching a passage
        currentTile[findDirection(currentDirection)] = false
        // update current position
        currentRow += currentDirection[0]
        currentColumn += currentDirection[1]
        const movingHorizontally = (currentDirection === directions[2] || currentDirection === directions[3])
        const movingVertically = (currentDirection === directions[0] || currentDirection === directions[1])
        // set current tile to a path
        map[currentRow][currentColumn] = createTile({
          top: movingHorizontally,
          bottom: movingHorizontally,
          left: movingVertically,
          right: movingVertically,
          type: 2,
          row: currentRow,
          column: currentColumn,
        })

        // Add border to end of passage
        currentTile = map[currentRow][currentColumn]
        currentTile[findDirection(currentDirection)] = (passageLength === maxLength - 1)

        // doors
        let doorDirection = currentDirection
        // get random perpendicular direction while passage has not ended
        do {
          doorDirection = directions[Math.floor(Math.random() * directions.length)]
        } while (
          (doorDirection[0] === -currentDirection[0] && doorDirection[1] === -currentDirection[1]) ||
          (doorDirection[0] === currentDirection[0] && doorDirection[1] === currentDirection[1]))
        // set door
        currentTile.door = doorTiles.includes(passageLength) &&
          findDirection((passageLength === maxLength - 1) ? currentDirection : doorDirection)

        // end of passage
        if (passageLength === maxLength - 1) {
          // check for secret doors
          if (currentPassage.secretDoor && Math.random() < currentPassage.secretDoor) {
            currentTile.secretDoor = findDirection(currentDirection)
          }
        }

        passageLength++
      }
    }
    // Reset current tile to starting position
    currentRow = startTile.row
    currentColumn = startTile.column
  }

  const output = {
    map,
    passages,
  }

  return output
}
