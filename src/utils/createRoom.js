import { create2dArray } from './create2dArray'

const createTile = (rows, columns, row, col) => ({
  top: row === 0,
  // ne: false,
  right: col === columns - 1,
  // se: false,
  bottom: row === rows - 1,
  // sw: false,
  left: col === 0,
  // nw: false,
  type: 0,
})

export const createRoom = (rows, columns) => {
  // generate a tiled room of a specified size
    let room = []
    for (let row = 0; row < rows; row++) {
      room.push([])
      for (let col = 0; col < columns; col++) {
        room[row].push(createTile(rows, columns, row, col))
      }
    }
    return room
}
