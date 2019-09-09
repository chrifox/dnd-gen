export const create2dArray = (rows, columns, num = 1) => {
  let array = []
  for (var i = 0; i < rows; i++) {
    array.push([])
    for (var j = 0; j < columns; j++) {
      array[i].push(num)
    }
  }
  return array
}
