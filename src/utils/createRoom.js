const createTile = ({ top, right, bottom, left, door }) => ({
  // if tile is an edge
  top,
  right,
  bottom,
  left,

  // if tile has a door
  door, // a direction or null

  // type of tile e.g. path or wall
  type: 0,
})

export const createRoom = ({ rows, columns, doors }) => {
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
        door: null,
      })
      room[row].push(tile)
    }
  }
  room = placeDoors(room, doors)
  return room
}

export const placeDoors = (room, doors) => {
  let chosenDoors = [],
  edges = [],
  random

  room.map((row, rowIndex) =>
    row.filter((tile, tileIndex) => {
      if (tile.top || tile.right || tile.bottom || tile.left) {
        edges.push({ rowIndex, tileIndex })
      }
    })
  )

  for (let door = 0; door < doors; door++) {
    random = Math.floor(Math.random() * edges.length)
    chosenDoors.push(edges[random])
  }

  chosenDoors.map(({ rowIndex, tileIndex }) => {
    const tile = room[rowIndex][tileIndex]
    const { top, right, bottom, left } = tile

    let side = Object.entries({ top, right, bottom, left })
      .filter(([key, value]) => value && key)
    side = side[Math.floor(Math.random() * side.length)]

    tile.door = side[0]
  })

  return room
}
