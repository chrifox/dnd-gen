import React from 'react'
import styled from 'styled-components'
import { DungeonContext } from '../../../containers/DungeonContext'
import MapContainer from './MapContainer'
import Button from '../../../components/Button'
import SvgIcon from '../../../components/SvgIcon'
import Room from '../../../components/Room'

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
    {({ changeStartingArea, rooms, addPassage }) => {
      return (
        <Controls>
          <RegenBtn onClick={changeStartingArea}>Starting Area</RegenBtn>
          <RegenBtn onClick={addPassage}>New Passage</RegenBtn>

          <ArrowButton>
            <SvgIcon name="up" />
          </ArrowButton>

          <HorizontalControls>
            <ArrowButton>
              <SvgIcon name="left" />
            </ArrowButton>

            <MapContainer>
              {rooms.map((room, i) => <Room key={i} {...room} />)}
            </MapContainer>

            <ArrowButton>
              <SvgIcon name="right" />
            </ArrowButton>
          </HorizontalControls>

          <ArrowButton>
            <SvgIcon name="down" />
          </ArrowButton>
        </Controls>
      )
    }}
  </DungeonContext.Consumer>
)

export default MapCreator
