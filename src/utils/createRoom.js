import { createTile } from './createTile'

export const createRoom = ({ rows, columns, doors, secretDoor }) => {
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
        type: 1,
      })
      room[row].push(tile)
    }
  }
  room = placeDoors(room, doors, secretDoor)
  return room
}

const placeDoors = (room, doors, secretDoor) => {
  let chosenDoors = [],
  edges = [],
  random = 0

  room.map((row, rowIndex) =>
    row.filter((tile, tileIndex) => {
      if (tile.top || tile.right || tile.bottom || tile.left) {
        edges.push({ rowIndex, tileIndex })
      }
    })
  )

  for (let door = 0; door < doors; door++) {
    // choose a random edge tile
    random = Math.floor(Math.random() * edges.length)
    // select tile for a door
    chosenDoors.push(edges[random])
    // remove edge tile after they have been used
    edges.pop(edges[random])
  }

  if (secretDoor && Math.random() < secretDoor) {
    random = Math.floor(Math.random() * edges.length)
    chosenDoors.push({
      ...edges[random],
      secret: true,
    })
  }

  chosenDoors.map(({ rowIndex, tileIndex, secret }) => {
    const tile = room[rowIndex][tileIndex]
    const { top, right, bottom, left } = tile

    let side = Object.entries({ top, right, bottom, left })
      .filter(([key, value]) => value && key)
    side = side[Math.floor(Math.random() * side.length)]

    secret ? tile.secretDoor = side[0] : tile.door = side[0]
  })

  return room
}
