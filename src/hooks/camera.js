import { useState, useEffect } from 'react'
import { TILE_SIZE, BORDER_WIDTH } from '../components/tile'

const MOVE_AMOUNT = (TILE_SIZE + BORDER_WIDTH * 2) / 2
let translating

export const useCameraControls = ({ containerSize, contentSize }) => {
  const [{ translateX, translateY }, setNewTranslate] = useState({ translateX: 0, translateY: 0 })

  const updateTranslate = direction => setNewTranslate(state => {
    switch (direction) {
      case 'top':
        return {
          translateX: state.translateX,
          translateY: Math.min(0, state.translateY + MOVE_AMOUNT),
        }
      case 'bottom':
        return {
          translateX: state.translateX,
          translateY: Math.max(state.translateY - MOVE_AMOUNT, containerSize.height - contentSize.height),
        }
      case 'left':
        return {
          translateX: Math.min(0, state.translateX + MOVE_AMOUNT),
          translateY: state.translateY,
        }
      case 'right':
        return {
          translateX: Math.max(state.translateX - MOVE_AMOUNT, containerSize.width - contentSize.width),
          translateY: state.translateY,
        }
      default: return { translateX: state.translateX, translateY: state.translateY }
    }
  })

  const repeatTranslate = direction => {
    translating = setInterval(() => updateTranslate(direction), 50)
  }

  const handleTranslate = direction => {
    if (
      (direction === 'top' && (translateY < MOVE_AMOUNT)) ||
      (direction === 'left' && (translateX < MOVE_AMOUNT)) ||
      (direction === 'bottom' && (translateY > containerSize.height - contentSize.height)) ||
      (direction === 'right' && (translateX > containerSize.width - contentSize.width))
    ) {
      repeatTranslate(direction)
    }
  }

  const onKeyDown = direction => {
    clearInterval(translating)
    handleTranslate(direction)
  }

  const onKeyUp = () => {
    clearInterval(translating)
  }

  const keyHandler = e => {
    if (e.repeat) return false
    switch (e.keyCode) {
      case 87: return onKeyDown('top') // w
      case 83: return onKeyDown('bottom') // s
      case 65: return onKeyDown('left') // a
      case 68: return onKeyDown('right') // d
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyHandler)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', keyHandler)
      window.removeEventListener('keyup', onKeyUp)
    }
  })

  return { translateX, translateY }
}
