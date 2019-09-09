import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Button from './Button'
import { Container, Row } from './map'
import { Tile } from './tile'
import { createMap } from '../utils/createMap'

const RegenBtn = styled(Button)`
  margin-bottom: 10px;
`

const Inputs = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 5px;
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
    rows: 15,
    columns: 60,
    maxTunnels: 100,
    maxLength: 8,
    mapGrid: []
  }

  componentDidMount() {
    this.newMap()
  }

  inputValidator = x => isNaN(Number(x)) ? 0 : x

  onChange = e => this.setState({ [e.target.name]: this.inputValidator(e.target.value) })

  newMap = () => this.setState({ mapGrid: createMap(this.state) })

  render() {
    const { mapGrid, ...state } = this.state
    const { rows, columns, maxTunnels, maxLength } = state
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

        <RegenBtn onClick={this.newMap}>Regenerate</RegenBtn>

        <Container>
          {mapGrid.map((row, rowIndex) => (
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
