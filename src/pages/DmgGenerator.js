import React from 'react'
import styled from 'styled-components'
import { DungeonContext } from '../containers/DungeonContext'
import { PageLayout } from '../components/layout'
import Room from '../components/Room'
import { H1 } from '../components/typography'
import Button from '../components/Button'
import { startingAreas } from '../resources/startingAreas'

const RegenBtn = styled(Button)`
  margin-bottom: 10px;
`

const DmgGenerator = () => (
  <DungeonContext.Consumer>
    {({ startingArea, chooseStartingArea }) => (
      <PageLayout>
        <H1>DMG Generator</H1>

        <RegenBtn onClick={chooseStartingArea}>Starting Area</RegenBtn>

        <Room {...startingArea} />
      </PageLayout>
    )}
  </DungeonContext.Consumer>
)

export default DmgGenerator
