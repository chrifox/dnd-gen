import React from 'react'
import styled from 'styled-components'
import { PageLayout } from '../components/layout'
import Room from '../components/Room'
import { H1 } from '../components/typography'
import Button from '../components/Button'
import { startingAreas } from '../resources/startingAreas'
import { findByChance } from '../../utils/findByChance'

const RegenBtn = styled(Button)`
  margin-bottom: 10px;
`

class DmgGenerator extends React.Component {
  state = { room: {} }

  componentDidMount() {
    this.chooseRoom()
  }

  chooseRoom = () => this.setState({ room: findByChance(startingAreas) })

  render() {
    const { room: { rows, columns } } = this.state
    return (
      <PageLayout>
        <H1>DMG Generator</H1>

        <RegenBtn onClick={this.chooseRoom}>Regenerate</RegenBtn>

        <Room rows={rows} columns={columns} />
      </PageLayout>
    )
  }
}

export default DmgGenerator
