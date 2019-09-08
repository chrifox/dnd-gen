import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Button from './Button'
import { createMap } from '../../utils/tileGen'

const TILE_SIZE = 16
const BORDER_WIDTH = 1

const Container = styled.div`
  border: 1px solid #333;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${TILE_SIZE}px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.length * TILE_SIZE}px;
`

const tileStyles = props => {
  switch (props.value) {
    case 's': return 'start'
    case 'e': return 'end'
    case 0: return 'path'
    default: return 'wall'
  }
}

const Tile = styled.div`
  padding: ${(TILE_SIZE - BORDER_WIDTH * 2) / 2}px;
  background: ${props => props.theme.tileColors[tileStyles(props)]};
  border: ${BORDER_WIDTH}px solid rgba(0,0,0,0.3);
`

const RegenBtn = styled(Button)`
  margin-bottom: 10px;
`

const Inputs = styled.div`
display: flex;
flex-direction: column;
`

const FormControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Label = styled.label`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
`

const Input = styled.input`
  font-size: 18px;
  margin-left: 20px;
`

class Map extends React.Component {
  state = {
    rows: 30,
    columns: 30,
    maxTunnels: 100,
    maxLength: 5,
  }

  inputValidator = x => isNaN(Number(x)) ? 0 : x

  onChange = e => this.setState({ [e.target.name]: this.inputValidator(e.target.value) })

  render() {
    let grid = createMap(this.state)
    const { rows, columns, maxTunnels, maxLength } = this.state
    return (
      <>
        <Inputs>
          <FormControl>
            <Label htmlFor="rows">Rows</Label>
            <Input name="rows" type="text" maxLength="2" value={rows} onChange={this.onChange}/>
          </FormControl>
          <FormControl>
            <Label htmlFor="columns">Columns</Label>
            <Input name="columns" type="text" maxLength="2" value={columns} onChange={this.onChange}/>
          </FormControl>
          <FormControl>
            <Label htmlFor="maxTunnels">Max Tiles</Label>
            <Input name="maxTunnels" type="text" maxLength="3" value={maxTunnels} onChange={this.onChange}/>
          </FormControl>
          <FormControl>
            <Label htmlFor="maxLength">Max Passage Length</Label>
            <Input name="maxLength" type="text" maxLength="3" value={maxLength} onChange={this.onChange}/>
          </FormControl>
        </Inputs>

        {/* <RegenBtn onClick={this.generateMap}>Regenerate</RegenBtn> */}

        <Container>
          {grid.map((row, rowIndex) => (
            <Row length={row.length} key={rowIndex}>
              {row.map((tile, colIndex) =>
                <Tile
                  key={`${rowIndex}-${colIndex}`}
                  value={tile}
                />
              )}
            </Row>
          ))}
        </Container>
      </>
    )
  }
}

export default Map
