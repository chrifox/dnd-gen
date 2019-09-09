import { create2dArray } from './create2dArray'

export const createMap = args => {
  let { rows, columns, maxTunnels, maxLength } = args, // width and height of the map
  map = create2dArray(rows, columns), // create a 2d array full of 1's
  currentRow = Math.floor(Math.random() * rows), // our current row - start at a random spot
  currentColumn = Math.floor(Math.random() * columns), // our current column - start at a random spot
  directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // array to get a random direction from (left,right,up,down)
  lastDirection = [], // save the last direction we went
  randomDirection // next turn/direction - holds a value from directions

  const startTile = { row: currentRow, column: currentColumn } // store starting tile

  // lets create some tunnels - while maxTunnels, dimensions, and maxLength  is greater than 0.
  while (maxTunnels && rows && columns && maxLength) {
    // lets get a random direction - until it is a perpendicular to our lastDirection
    // if the last direction = left or right,
    // then our new direction has to be up or down, and vice versa
    do {
       randomDirection = directions[Math.floor(Math.random() * directions.length)]
    } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]))

    let randomLength = Math.ceil(Math.random() * maxLength), // length the next tunnel will be (max of maxLength)
      tunnelLength = 0 // current length of tunnel being created

  // lets loop until our tunnel is long enough or until we hit an edge
    while (tunnelLength < randomLength) {

      // break the loop if it is going out of the map
      if (((currentRow === 0) && (randomDirection[0] === -1)) ||
          ((currentColumn === 0) && (randomDirection[1] === -1)) ||
          ((currentRow === rows - 1) && (randomDirection[0] === 1)) ||
          ((currentColumn === columns - 1) && (randomDirection[1] === 1))) {
        break
      } else {
        // TODO: add other chance tiles here
        map[currentRow][currentColumn] = 0 // set the value of the index in map to 0 (a tunnel, making it one longer)
        currentRow += randomDirection[0] // add the value from randomDirection to row and col (-1, 0, or 1) to update our location
        currentColumn += randomDirection[1]
        tunnelLength++ // the tunnel is now one longer, so lets increment that variable
      }
    }

    if (tunnelLength) { // update our variables unless our last loop broke before we made any part of a tunnel
      lastDirection = randomDirection // set lastDirection, so we can remember what way we went
      maxTunnels-- // we created a whole tunnel so lets decrement how many we have left to create
    }
  }

  map[startTile.row][startTile.column] = 's' // set start tile color
  map[currentRow][currentColumn] = 'e' // set end tile color

  return map // all our tunnels have been created and our map is complete, so lets return it to our render()
}
