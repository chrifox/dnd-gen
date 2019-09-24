import React from 'react'
import styled from 'styled-components'
import { TILE_SIZE, BORDER_WIDTH } from '../../../components/tile'

const MOVE_AMOUNT = (TILE_SIZE + BORDER_WIDTH * 2) / 2
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
  // background: rgba(100,0,0,0.3);
  ${overlayPosition};
`

const contentTranslate = ({ translateX, translateY }) => {
  return `translate(${translateX}px, ${translateY}px)`
}

const Content = styled.div`
  transform: ${contentTranslate};
  transition: 0.1s all ease-out;
`

class Camera extends React.Component {
  state = {
    translateX: 0,
    translateY: 0,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown, false)
    window.addEventListener('keyup', this.onMouseUpOverlay, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown, false)
    window.removeEventListener('keyup', this.onMouseUpOverlay, false)
  }

  onMouseDownOverlay = direction => {
    clearInterval(this.translate)
    this.handleTranslate(direction)
  }

  onMouseUpOverlay = () => {
    clearInterval(this.translate)
  }

  keyDown = e => {
    switch (e.keyCode) {
      case 87: return this.onMouseDownOverlay('top')
      case 83: return this.onMouseDownOverlay('bottom')
      case 65: return this.onMouseDownOverlay('left')
      case 68: return this.onMouseDownOverlay('right')
    }
  }

  repeatTranslate = direction => {
    this.translate = setInterval(() => this.updateTranslate(direction), 50)
  }

  handleTranslate = direction => {
    const { containerSize, contentSize } = this.props
    const { translateX, translateY } = this.state
    if (
      (direction === 'top' && (translateY < MOVE_AMOUNT)) ||
      (direction === 'left' && (translateX < MOVE_AMOUNT)) ||
      (direction === 'bottom' && (translateY > containerSize.height - contentSize.height)) ||
      (direction === 'right' && (translateX > containerSize.width - contentSize.width))
    ) {
      this.repeatTranslate(direction)
    }
  }

  updateTranslate = direction => {
    const { containerSize, contentSize } = this.props
    this.setState(state => {
      switch (direction) {
        case 'top':
          return { translateY: Math.min(0, state.translateY + MOVE_AMOUNT) }
        case 'left':
          return { translateX: Math.min(0, state.translateX + MOVE_AMOUNT) }
        case 'bottom':
          return { translateY: Math.max(state.translateY - MOVE_AMOUNT, containerSize.height - contentSize.height) }
        case 'right':
          return { translateX: Math.max(state.translateX - MOVE_AMOUNT, containerSize.width - contentSize.width) }
        default: return state
      }
    })
  }

  render() {
    const { containerSize } = this.props
    const { translateX, translateY } = this.state
    return (
      <Container {...containerSize}>
        <Content translateX={translateX} translateY={translateY}>
          {this.props.children}
        </Content>

        {directions.map(dir => (
          <Overlay
            key={dir}
            direction={dir}
            onMouseEnter={() => this.onMouseDownOverlay(dir)}
            onMouseLeave={() => this.onMouseUpOverlay(dir)}
          />
        ))}
      </Container>
    )
  }
}

export default Camera
