import React from 'react'

import { randomRoom } from '../utils/randomRoom'
import { startingAreas } from '../resources/startingAreas'
import { passages } from '../resources/passages'

export const DungeonContext = React.createContext()

class DungeonProvider extends React.Component {
  state = {
    rooms: [],
    activeLabel: null,
    activeGenerator: () => {},
    setGenerator: ({ generator, label }) => this.setState({ activeGenerator: generator, activeLabel: label }),
    generators: [],
    regenStartingArea: () => this.changeStartingArea(),
    addRoom: (room, position) => this.setState(state => {
      const roomsStart = state.rooms.slice(0, position)
      const roomsEnd = state.rooms.slice(position, state.rooms.length)
      return ({ rooms: [
        ...roomsStart,
        room,
        ...roomsEnd,
      ] })
    }),
  }

  componentDidMount() {
    this.changeStartingArea()
    this.setState({ generators: [
      { fn: this.generatePassage, label: 'Passage' },
    ] })
  }

  changeStartingArea = () => {
    if (!this.state.rooms.length) {
      this.state.addRoom(this.generateStartingArea())
    } else {
      this.setState(state => ({
        rooms: state.rooms.map((room, i) =>
          i === 0 ? this.generateStartingArea() : room
        )
      }))
    }
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
