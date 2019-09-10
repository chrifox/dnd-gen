import React from 'react'
import styled from 'styled-components'
import { DungeonContext } from '../../../containers/DungeonContext'
import MapContainer from './MapContainer'
import Button from '../../../components/Button'
import SvgIcon from '../../../components/SvgIcon'
import Room from '../../../components/Room'
import { H3 } from '../../../components/typography'

const RoomTypes = styled.div`
  display: flex;
  flex-direction: row;
`

const RoomTypeButton = styled(Button)`
  padding: 0.2em 0.4em;
  margin: 0 5px;
`

const Controls = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HorizontalControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const RoomRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const RegenBtn = styled(Button)`
  margin-bottom: 10px;
`

const ArrowButton = styled(Button)`
  background: #ccc;
  padding: 6px 8px;
  margin: 10px;
`

const MapCreator = () => (
  <DungeonContext.Consumer>
    {({
      activeLabel,
      activeGenerator,
      generators,
      setGenerator,
      setGenPassage,
      rooms,
      addRoom,
    }) => {
      const addCurrentRoom = position => activeGenerator && addRoom(activeGenerator(), position)
      return (
        <Controls>
          <H3>{`Active Room: ${activeLabel ? activeLabel : 'None'}`}</H3>
          <RoomTypes>
            {generators.map(({ fn, label }) => (
              <RoomTypeButton key={label} onClick={() => setGenerator({ generator: fn, label })}>
                {label}
              </RoomTypeButton>
            ))}
          </RoomTypes>

          <ArrowButton onClick={() => addCurrentRoom({ row: 0 })}>
            <SvgIcon name="up" />
          </ArrowButton>


            <MapContainer>
              {rooms.map((roomRow, rowIndex) => (
                <HorizontalControls>
                  <ArrowButton onClick={() => addCurrentRoom({ row: rowIndex, column: 0 })}>
                    <SvgIcon name="left" />
                  </ArrowButton>

                  <RoomRow>
                    {roomRow.map((room, i) => <Room key={i} {...room} />)}
                  </RoomRow>

                  <ArrowButton onClick={() => addCurrentRoom({ row: rowIndex, column: roomRow.length })}>
                    <SvgIcon name="right" />
                  </ArrowButton>
                </HorizontalControls>
              ))}
            </MapContainer>


          <ArrowButton onClick={() => addCurrentRoom({ row: rooms.length })}>
            <SvgIcon name="down" />
          </ArrowButton>
        </Controls>
      )
    }}
  </DungeonContext.Consumer>
)

export default MapCreator
