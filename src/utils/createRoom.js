import { createTile } from './createTile'
import { addDoors } from './addDoors'

export const createRoom = ({ rows, columns, doors, secretDoor, trap }, type = 1) => {
  // initialise a room
  let room = []

  // populate room with tiles
  for (let row = 0; row < rows; row++) {
    room.push([])
    for (let col = 0; col < columns; col++) {
      const isTop = row === 0
      const isRight = col === columns - 1
      const isBottom = row === rows - 1
      const isLeft = col === 0
      let tile = createTile({
        top: isTop,
        right: isRight,
        bottom: isBottom,
        left: isLeft,
        type: trap ? 3 : type,
        row,
        column: col,
      })
      room[row].push(tile)
    }
  }

  const roomWithDoors = addDoors(room, doors, secretDoor)

  const output = {
    roomTiles: roomWithDoors.room,
    doors: roomWithDoors.doors,
  }

  return output
}
