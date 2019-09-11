import React from 'react'

import { randomRoom } from '../utils/randomRoom'
import { startingAreas } from '../resources/startingAreas'
import { passages } from '../resources/passages'

export const DungeonContext = React.createContext()

let rowCreationIndex = 0,
roomCreationIndex = 0


const rowKeyGen = () => {
  rowCreationIndex += 1
  return `row_${rowCreationIndex}`
}

const roomKeyGen = ({ rows, columns, doors }) => {
  roomCreationIndex += 1
  return `${doors}d${rows}x${columns}_${roomCreationIndex}`
}

class DungeonProvider extends React.Component {
  state = {
    rooms: [],
    activeGenerator: null,
    setGenerator: generator => this.setState({ activeGenerator: generator }),
    generators: [],
    addRoom: (room, { row, column }) => this.setState(state => {
      let newRooms = [],
      newRow = [],
      newRoom = { ...room, rowKey: rowKeyGen(), key: roomKeyGen(room) }
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
    this.setState({
      generators: [
        { fn: this.generatePassage, key: 'passage' },
      ],
      activeGenerator: { fn: this.generatePassage, key: 'passage' },
    })
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
