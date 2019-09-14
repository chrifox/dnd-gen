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
  direction = door.door,
  spawnChamber,
  roomChoice,
  isSafe = false

  const doorTile = { row: startRow, column: startColumn }

  // 50% chance to spawn a chamber
  spawnChamber = Math.random() < 0.5
  roomChoice = randomRoom(spawnChamber ? chambers : doors)

  while (!isSafe) {
    // Prevent new rooms going off map
    if (
      (startRow - roomChoice.rows < 0) ||
      (startRow + roomChoice.rows > rows - 1) ||
      (startColumn - roomChoice.columns < 0) ||
      (startColumn + roomChoice.columns > columns - 1)
    ) {
      // 50% chance to spawn a chamber
      spawnChamber = Math.random() < 0.5
      roomChoice = randomRoom(spawnChamber ? chambers : doors)
      break
    } else {
      // NOTE: this currently moves all rooms in the same way
      // TODO: should be more randomised
      if (direction !== 'bottom') startRow -= roomChoice.rows
      if (direction !== 'top') startRow += 1
      if (direction !== 'right') startColumn -= roomChoice.columns
      if (direction !== 'left') startColumn += 1
      isSafe = true
    }
  }

  // TODO: Prevent overlapping existing tiles

  const room = createRoom(roomChoice, spawnChamber ? 4 : 2)

  const output = {
    doorTile,
    position: {
      row: startRow,
      column: startColumn,
    },
    roomChoice,
    room,
  }

  return output
}
