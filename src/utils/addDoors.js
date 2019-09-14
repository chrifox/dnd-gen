export const addDoors = (room, doors, secretDoor) => {
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
    // choose a random edge tile (exclude first tile)
    random = Math.ceil(Math.random() * edges.length - 1)
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

  // list of doors for generating additional rooms
  let generatingDoors = []

  chosenDoors.map(({ rowIndex, tileIndex, secret }) => {
    const tile = room[rowIndex][tileIndex]
    const { top, right, bottom, left } = tile

    let side = Object.entries({ top, right, bottom, left })
      .filter(([key, value]) => value && key)
    side = side[Math.floor(Math.random() * side.length)]

    secret ? tile.secretDoor = side[0] : tile.door = side[0]
    generatingDoors.push(tile)
  })

  const output = {
    room,
    doors: generatingDoors,
  }

  return output
}
