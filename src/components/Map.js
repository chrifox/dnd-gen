import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { tileGen } from '../../utils/tileGen'

const Container = styled.div`
  border: 1px solid #333;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.length * 10}px;
`

const Tile = styled.div`
  width: 8px;
  height: 8px;
  background: ${props => props.empty ? 'transparent' : '#ccc'};
  border: 1px solid #555;
`

const RegenBtn = styled(Button)`
  margin-bottom: 10px;
`

const Map = () => {
  const initialState = {
    tiles: tileGen(20,20),
  }
  const [ tiles, generateTiles ] = useState(initialState.tiles)
  return (
    <>
      <RegenBtn onClick={() => generateTiles(tileGen(20, 20))}>Regenerate</RegenBtn>
      <Container>
        {tiles.map((row, rowIndex) => (
          <Row length={row.length} key={rowIndex}>
            {row.map((tile, colIndex) =>
              <Tile empty={!tile} key={`${rowIndex}-${colIndex}`} />
            )}
          </Row>
        ))}
      </Container>
    </>
  )
}

export default Map
