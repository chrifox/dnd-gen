import React from 'react'

import { randomRoom } from '../utils/randomRoom'
import { startingAreas } from '../resources/startingAreas'
import { passages } from '../resources/passages'

export const DungeonContext = React.createContext()

class DungeonProvider extends React.Component {
  state = {
    rooms: [],
    changeStartingArea: () => this.changeStartingArea(),
    addPassage: () => this.addRoom(this.generatePassage()),
  }

  componentDidMount() {
    this.changeStartingArea()
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

  generatePassage = () => randomRoom(passages)

  addRoom = room => this.setState(state => ({ rooms: state.rooms.concat(room) }))

  render() {
    return (
      <DungeonContext.Provider value={this.state}>
        {this.props.children}
      </DungeonContext.Provider>
    )
  }
}

export default DungeonProvider
