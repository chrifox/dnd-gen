import {
  randomRoom,
  createRoom,
  createTile,
} from './'
import { chambers, doors } from '../resources'

export const createRoomBehindDoor = (startTile, map, door) => {
  const rows = map.length
  const columns = map[0].length

  let startRow = startTile.row + door.row,
  startColumn = startTile.column + door.column,
  spawnChamber,
  roomChoice,
  isSafe = false

  const direction = door.door
  const doorTile = { row: startRow, column: startColumn, direction }

  // 50% chance to spawn a chamber
  spawnChamber = Math.random() < 0.5
  roomChoice = randomRoom(spawnChamber ? chambers : doors)

  // Prevent new rooms going off map
  while (!isSafe) {
    if (
      (startRow - roomChoice.rows < 0) ||
      (startRow + roomChoice.rows > rows - 1) ||
      (startColumn - roomChoice.columns < 0) ||
      (startColumn + roomChoice.columns > columns - 1)
      // TODO: prevent overlapping existing tiles
    ) {
      // 40% chance to spawn a chamber
      spawnChamber = Math.random() < 0.4
      roomChoice = randomRoom(spawnChamber ? chambers : doors)
      break
    } else isSafe = true
  }

  if (isSafe) {
    // Once safe move room to its start tile
    if (direction === 'bottom') {
      startRow += 1
      // TODO: setup column placement
    }
    if (direction === 'top') {
      startRow -= roomChoice.rows
      // TODO: setup column placement
    }
    if (direction === 'right') {
      startColumn += 1
      // TODO: setup row placement
    }
    if (direction === 'left') {
      startColumn -= roomChoice.columns
      // TODO: setup row placement
    }
  }

  const room = createRoom(roomChoice, spawnChamber ? 4 : 2, direction)

  const output = {
    doorTile,
    position: {
      row: startRow,
      column: startColumn,
    },
    roomChoice,
    room,
    visible: false,
  }

  return output
}
