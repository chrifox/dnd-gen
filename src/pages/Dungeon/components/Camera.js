import React from 'react'
import styled from 'styled-components'
import { TILE_SIZE, BORDER_WIDTH } from '../../../components/tile'

const MOVE_AMOUNT = TILE_SIZE + BORDER_WIDTH * 2
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

class Camera extends React.Component {
  state = {
    width: 0,
    height: 0,
    translateX: 0,
    translateY: 0,
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate(prevState) {
    if (prevState.translateY !== this.state.translateY) console.log('y',this.state.translateY)
    if (prevState.translateX !== this.state.translateX) console.log('x',this.state.translateX)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight })

  updateTranslate = direction => {
    const { width, height } = this.props.contentSize
    if (direction === 'top' && (this.state.translateY < MOVE_AMOUNT)) {
      this.setState(state => ({ translateY: Math.min(0, state.translateY + MOVE_AMOUNT) }))
    }
    if (direction === 'left' && (this.state.translateX < MOVE_AMOUNT)) {
      this.setState(state => ({ translateX: Math.min(0, state.translateX + MOVE_AMOUNT) }))
    }
    if (direction === 'bottom' && (this.state.translateY > this.state.height - height)) {
      this.setState(state => ({ translateY: Math.max(state.translateY - MOVE_AMOUNT, this.state.height - height) }))
    }
    if (direction === 'right' && (this.state.translateX > this.state.width - width)) {
      this.setState(state => ({ translateX: Math.max(state.translateX - MOVE_AMOUNT, this.state.width - width) }))
    }
  }

  onMouseEnterOverlay = direction => {
    this.translate = setInterval(() => this.updateTranslate(direction), 50)
  }

  onMouseExitOverlay = direction => {
    clearInterval(this.translate)
  }

  render() {
    const { width, height, translateX, translateY } = this.state
    console.log(width, this.props.contentSize.width)
    return (
      <Container width={width} height={height}>
        <Content translateX={translateX} translateY={translateY}>
          {this.props.children}
        </Content>

        {directions.map(dir => (
          <Overlay
            key={dir}
            direction={dir}
            onMouseEnter={() => this.onMouseEnterOverlay(dir)}
            onMouseLeave={() => this.onMouseExitOverlay(dir)}
          />
        ))}
      </Container>
    )
  }
}

export default Camera
