import React from 'react'
import styled from 'styled-components'
import { PageLayout } from '../../components/layout'
import { H1 } from '../../components/typography'
import Map from './components/Map'

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

class Dungeon extends React.Component {
  state = {
    rows: 30,
    columns: 30,
  }

  inputValidator = x => isNaN(Number(x)) ? 0 : x

  onChange = e => this.setSTate({ [e.target.name]: this.inputValidator(e.target.value) })

  render() {
    const { rows, columns } = this.state
    return (
      <PageLayout>
        <H1>Dungeon</H1>

        <Inputs>
          <FormControl>
            <Label htmlFor="rows">Rows</Label>
            <Input name="rows" type="text" maxLength="2" value={rows} onChange={this.onChange}/>
          </FormControl>
          <FormControl>
            <Label htmlFor="columns">Columns</Label>
            <Input name="columns" type="text" maxLength="2" value={columns} onChange={this.onChange}/>
          </FormControl>
        </Inputs>

        <Map rows={rows} columns={columns} />
      </PageLayout>
    )
  }
}

export default Dungeon
