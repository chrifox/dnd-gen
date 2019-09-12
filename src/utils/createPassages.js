import { randomRoom } from './'
import { passages } from '../resources'

export const createPassages = ({ currentRow, currentColumn }, passagesLength, map) => {
  let chosenPassages = [], //
  maxLength = 0,
  lastDirection = [], // save the last direction we went
  randomDirection // next turn/direction - holds a value from directions

  // array to get a random direction from (up, down, left, right)
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

  for (let p = 0; p < passagesLength; p++) {
    chosenPassages.push(randomRoom(passages))
  }

  // TODO: Make sure passage spawn away from center of room

  for (let pGen = 0; pGen < chosenPassages.length; pGen++) {
    let passageLength = 0 // current length of passage being created
    maxLength = chosenPassages[pGen].rows
  }

  //   randomDirection = directions[2] // left
  //
  //   // get a random direction perpendicular to our lastDirection
  //   // do {
  //   //   randomDirection = directions[Math.floor(Math.random() * directions.length)]
  //   // } while (
  //   //   (randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) ||
  //   //   (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1])
  //   // )
  //
  //   // loop until our passage is long enough or until we hit an edge
  //   while (passageLength < maxLength) {
  //     // break the loop if it is going out of the map
  //     if (
  //       ((currentRow === 0) && (randomDirection[0] === -1)) ||
  //       ((currentColumn === 0) && (randomDirection[1] === -1)) ||
  //       ((currentRow === rows - 1) && (randomDirection[0] === 1)) ||
  //       ((currentColumn === columns - 1) && (randomDirection[1] === 1))
  //     ) {
  //       break
  //     }
  //     else {
  //       // set current tile to a path
  //       map[currentRow][currentColumn].type = 1
  //       // update current position
  //       currentRow += randomDirection[0]
  //       currentColumn += randomDirection[1]
  //       // passage is now one longer
  //       passageLength++
  //     }
  //   }

  return map
}
