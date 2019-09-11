import React from 'react'
import styled from 'styled-components'
import { DungeonContext } from '../../../containers/DungeonContext'
import MapContainer from './MapContainer'
import Button from '../../../components/Button'
import SvgIcon from '../../../components/SvgIcon'
import Room from '../../../components/Room'
import { H3 } from '../../../components/typography'

const RoomRow = styled.div`
  display: flex;
  flex-direction: row;
`

const ArrowButton = styled(Button)`
  background: transparent;
  padding: 4px;
  margin: 10px;
`

const MapCreator = () => (
  <DungeonContext.Consumer>
    {({
      rooms,
      addRoom,
      activeGenerator,
    }) => {
      const addCurrentRoom = position => activeGenerator && addRoom(activeGenerator(), position)
      return (
        <MapContainer>
          {rooms.map((roomRow, rowIndex) => (
            <RoomRow key={roomRow[0].rowKey}>
              {roomRow.map((room, i) => (
                <Room key={room.key} {...room} />
              ))}
            </RoomRow>
          ))}
        </MapContainer>
      )
    }}
  </DungeonContext.Consumer>
)

export default MapCreator
