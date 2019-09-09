import React from 'react'

import { randomRoom } from '../utils/randomRoom'
import { startingAreas } from '../resources/startingAreas'

export const DungeonContext = React.createContext()

class DungeonProvider extends React.Component {
  state = {
    startingArea: {},
    chooseStartingArea: () => this.setState({ startingArea: randomRoom(startingAreas) }),
  }

  componentDidMount() {
    this.state.chooseStartingArea()
  }

  render() {
    return (
      <DungeonContext.Provider value={this.state}>
        {this.props.children}
      </DungeonContext.Provider>
    )
  }
}

export default DungeonProvider
