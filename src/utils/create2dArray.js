const TILE = {
  n: false,
  ne: false,
  e: false,
  se: false,
  s: false,
  sw: false,
  w: false,
  nw: false,
  type: 0,
}

export const create2dArray = (rows, columns, value = TILE) => {
  let array = []
  for (var i = 0; i < rows; i++) {
    array.push([])
    for (var j = 0; j < columns; j++) {
      array[i].push(TILE)
    }
  }
  return array
}
