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
  }

  componentDidMount() {
    this.changeStartingArea()
    this.setState({ generators: [
      { fn: this.addPassage, label: 'Passage' },
    ] })
  }

  changeStartingArea = () => {
    if (!this.state.rooms.length) {
      this.addRoom(this.generateStartingArea())
    } else {
      this.setState(state => ({
        rooms: state.rooms.map((room, i) =>
          i === 0 ? this.generateStartingArea() : room
        )
      }))
    }
  }

  generateStartingArea = () => randomRoom(startingAreas)

  addRoom = room => this.setState(state => ({ rooms: state.rooms.concat(room) }))

  addPassage = () => this.addRoom(randomRoom(passages))

  render() {
    return (
      <DungeonContext.Provider value={this.state}>
        {this.props.children}
      </DungeonContext.Provider>
    )
  }
}

export default DungeonProvider
