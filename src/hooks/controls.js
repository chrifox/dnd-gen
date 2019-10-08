import React, { useState, useEffect } from 'react'

export const useKeyToggle = () => {
  const [keyOpen, toggleKey] = useState(false)

  const keyHandler = e => {
    if (e.repeat) return false
    switch (e.keyCode) {
      // case 77: // m
      case 75: return toggleKey(!keyOpen) // k
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', keyHandler)
    return () => {
      window.removeEventListener('keyup', keyHandler)
    }
  })

  return keyOpen
}
