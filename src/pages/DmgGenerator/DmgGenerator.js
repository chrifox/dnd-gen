import React from 'react'
import styled from 'styled-components'
import { PageLayout } from '../../components/layout'
import { H1 } from '../../components/typography'
import MapCreator from './components/MapCreator'

const DmgGenerator = () => (
  <PageLayout>
    <H1>DMG Generator</H1>

    <MapCreator />
  </PageLayout>
)

export default DmgGenerator
