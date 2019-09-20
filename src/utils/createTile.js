export const createTile = ({
  top, right, bottom, left,
  door, secretDoor,
  type = 0,
  row,
  column,
}) => {
  const tileBg = Math.ceil(Math.random() * 9)
  const tileNum = (typeof row === 'number' && typeof column === 'number')
    ? (row + 1) * (column + 1)
    : 1 // Set a default value just in case
  return ({
    // if tile is an edge
    top,
    right,
    bottom,
    left,

    // if tile has a door
    door, // a direction or null
    secretDoor, // a direction or null

    // type of tile e.g. path or wall
    type,

    // position of tile within dungeon map grid
    row,
    column,
    tileNum,
    tileBg,
  })
}
