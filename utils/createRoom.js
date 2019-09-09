import { create2dArray } from './create2dArray'

export const createRoom = (rows, columns) => {
  // generate a space of a set size
  let room = create2dArray(rows, columns, 0)

  // populate space with randomized elements
  return room
}
