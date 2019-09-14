export const create2dArray = (rows, columns, value = 0) => {
  let array = []
  for (var row = 0; row < rows; row++) {
    array.push([])
    for (var col = 0; col < columns; col++) {
      array[row].push(value)
    }
  }
  return array
}
