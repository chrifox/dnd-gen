import React from 'react'

import { randomRoom } from '../utils/randomRoom'
import { startingAreas } from '../resources/startingAreas'
import { passages } from '../resources/passages'

export const DungeonContext = React.createContext()

let creationIndex = 0

const roomKeyGen = ({ rows, columns, doors }) => {
  creationIndex += 1
  const key = `${doors}d${rows}x${columns}_${creationIndex}`
  return key
}

class DungeonProvider extends React.Component {
  state = {
    rooms: [],
    activeLabel: null,
    activeGenerator: null,
    setGenerator: ({ generator, label }) => this.setState({ activeGenerator: generator, activeLabel: label }),
    generators: [],
    addRoom: (room, { row, column }) => this.setState(state => {
      let newRooms = [],
      newRow = [],
      newRoom = { ...room, key: roomKeyGen(room) }
      if (!column) {
        if (row === 0) newRooms.push([newRoom], ...state.rooms)
        if (state.rooms.length && row === state.rooms.length) newRooms.push(...state.rooms, [newRoom])
      }

      if (column === 0) {
        newRow.push(newRoom, ...state.rooms[row])
        newRooms = state.rooms.map((roomRow, i) => i === row ? newRow : roomRow)
      }

      if (state.rooms[row] && state.rooms[row].length && column === state.rooms[row].length) {
        newRow.push(...state.rooms[row], newRoom)
        newRooms = state.rooms.map((roomRow, i) => i === row ? newRow : roomRow)
      }

      return ({ rooms: newRooms })
    }),
  }

  componentDidMount() {
    this.state.addRoom(this.generateStartingArea(), { row: 0 })
    this.setState({ generators: [
      { fn: this.generatePassage, label: 'Passage' },
    ] })
  }

  // Room generators
  generateStartingArea = () => randomRoom(startingAreas)
  generatePassage = () => randomRoom(passages)

  render() {
    return (
      <DungeonContext.Provider value={this.state}>
        {this.props.children}
      </DungeonContext.Provider>
    )
  }
}

export default DungeonProvider
