import React from 'react'
import styled from 'styled-components'
import { useCameraControls } from '../../../hooks/camera'

const directions = ['top','bottom','left','right']

const Container = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  overflow: hidden;
  text-align: center;
`

const overlayPosition = ({ direction }) => {
  const isVertical = direction === 'top' || direction === 'bottom'
  const isHorizontal = direction === 'right' || direction === 'left'
  let top, bottom, left, right
  if (isVertical) {
    left = 0
    right = 0
    top = direction === 'top' && 0
    bottom = direction === 'bottom' && 0
  }
  if (isHorizontal) {
    top = 0
    bottom = 0
    left = direction === 'left' && 0
    right = direction === 'right' && 0
  }
  return `
    top: ${top}px;
    right: ${right}px;
    bottom: ${bottom}px;
    left: ${left}px;
    padding: ${isVertical ? '30px 0' : '0 30px'};
  `
}

const Overlay = styled.div`
  position: absolute;
  z-index: ${props => props.theme.zIndex.overlay};
  ${overlayPosition};
`

const contentTranslate = ({ translateX, translateY }) => {
  return `translate(${translateX}px, ${translateY}px)`
}

const Content = styled.div`
  transform: ${contentTranslate};
  transition: 0.1s all ease-out;
`

const Camera = ({ containerSize, contentSize, children }) => {
    const cameraControls = useCameraControls({ containerSize, contentSize })
    const { translateX, translateY } = cameraControls
    return (
      <Container {...containerSize}>
        <Content translateX={translateX} translateY={translateY}>
          {children}
        </Content>

        {directions.map(dir => <Overlay key={dir} direction={dir} />)}
      </Container>
    )
}

export default Camera
