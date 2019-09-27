import React, { useContext } from 'react'
import styled from 'styled-components'

import { useKeyToggle } from '../../hooks/controls'
import Map from './components/Map'

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const Dungeon = () => {
  const keyOpen = useKeyToggle()
  return (
    <CenterContent>
      <Map
        rows={30}
        columns={40}
        keyOpen={keyOpen}
      />
    </CenterContent>
  )
}

export default Dungeon
