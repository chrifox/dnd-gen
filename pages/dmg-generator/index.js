import React from 'react'
import HtmlHead from '../_head'
import DungeonProvider from '../../src/containers/DungeonContext'
import DmgGenerator from '../../src/pages/DmgGenerator/DmgGenerator'

export default () => (
  <>
    <HtmlHead title="DMG Generator" />

    <DungeonProvider>
      <DmgGenerator />
    </DungeonProvider>
  </>
)
