import React from 'react'
import { PageLayout } from '../../components/layout'
import Map from './components/Map'

const Dungeon = () => (
  <PageLayout>
    <Map rows={30} columns={60} />
  </PageLayout>
)

export default Dungeon
