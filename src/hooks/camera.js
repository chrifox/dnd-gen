import React, { useState, useEffect } from 'react'
import { TILE_SIZE, BORDER_WIDTH } from '../components/tile'

const MOVE_AMOUNT = (TILE_SIZE + BORDER_WIDTH * 2) / 2

export const useCameraControls = ({ containerSize, contentSize }) => {
  let translating
  const [{ translateX, translateY }, setNewTranslate] = useState({ translateX: 0, translateY: 0 })

  const updateTranslate = direction => setNewTranslate(() => {
    switch (direction) {
      case 'top':
        return {
          translateX,
          translateY: Math.min(0, translateY + MOVE_AMOUNT),
        }
      case 'bottom':
        return {
          translateX,
          translateY: Math.max(translateY - MOVE_AMOUNT, containerSize.height - contentSize.height),
        }
      case 'left':
        return {
          translateX: Math.min(0, translateX + MOVE_AMOUNT),
          translateY,
        }
      case 'right':
        return {
          translateX: Math.max(translateX - MOVE_AMOUNT, containerSize.width - contentSize.width),
          translateY,
        }
      default: return { translateX, translateY }
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
      // repeatTranslate(direction)
      updateTranslate(direction)
    }
  }

  const onKeyDown = direction => {
    clearInterval(translating)
    handleTranslate(direction)
  }

  const onKeyUp = () => clearInterval(translating)

  const keyHandler = e => {
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
