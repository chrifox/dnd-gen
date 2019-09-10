import React from 'react'
import DungeonProvider from '../../src/containers/DungeonContext'
import DmgGenerator from '../../src/pages/DmgGenerator/DmgGenerator'

export default () => (
  <DungeonProvider>
    <DmgGenerator />
  </DungeonProvider>
)
