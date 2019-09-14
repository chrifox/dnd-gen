import { createTile } from './'

export const createBlankMap = (rows, columns) => {
  let array = []
  for (var row = 0; row < rows; row++) {
    array.push([])
    for (var column = 0; column < columns; column++) {
      const tile = createTile({ type: 0, row, column })
      array[row].push(tile)
    }
  }
  return array
}
