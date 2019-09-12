import React from 'react'
import { PageLayout } from '../../components/layout'
import { H1 } from '../../components/typography'
import Map from './components/Map'

const Dungeon = () => (
  <PageLayout>
    <H1>Dungeon</H1>

    <Map rows={30} columns={30} />
  </PageLayout>
)

export default Dungeon
