import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { TILE_SIZE, BORDER_WIDTH } from '../tile'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
