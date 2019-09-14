export const addRoomToMap = (map, { position, room, roomTiles }) => {
  let newMap = [].concat(map)
  const currentRow = position.row
  const currentColumn = position.column

  // update map with chosen room
  for (let row = 0; row < room.rows; row++) {
    for (let col = 0; col < room.columns; col ++) {
      const currentTile = map[currentRow + row][currentColumn + col]
      newMap[currentRow + row][currentColumn + col] = currentTile.type === 0
        ? {
          ...roomTiles[row][col],
          row: currentRow + row,
          column: currentColumn + col,
        } : currentTile
    }
  }

  return newMap
}
