export const createTile = ({ top, right, bottom, left, door, secretDoor, type = 0 }) => ({
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
})
