import React from 'react'
import { PageLayout } from '../../components/layout'
import { H1 } from '../../components/typography'
import Map from './components/Map'

const Dungeon = () => (
  <PageLayout>
    <H1>Dungeon</H1>

    <Map rows={32} columns={32} />
  </PageLayout>
)

export default Dungeon
