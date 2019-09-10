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
      regenStartingArea,
      setGenPassage,
      rooms,
    }) => {
      return (
        <Controls>
          <RegenBtn onClick={regenStartingArea}>Starting Area</RegenBtn>

          <H3>{`Active Room: ${activeLabel ? activeLabel : 'None'}`}</H3>
          <RoomTypes>
            {generators.map(({ fn, label }) => (
              <RoomTypeButton key={label} onClick={() => setGenerator({ generator: fn, label })}>
                {label}
              </RoomTypeButton>
            ))}
          </RoomTypes>

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

          <ArrowButton onClick={() => activeGenerator()}>
            <SvgIcon name="down" />
          </ArrowButton>
        </Controls>
      )
    }}
  </DungeonContext.Consumer>
)

export default MapCreator
