import React from 'react'

const SvgIcon = ({ name, size = 30, color = '#fff' }) => {
  switch (name) {
    case 'up':
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill={color} />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    )
    case 'right':
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill={color} />
        <path fill="none" d="M0 0h24v24H0V0z" />
      </svg>
    )
    case 'down':
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill={color} />
      <path fill="none" d="M0 0h24v24H0V0z" />
    </svg>
    )
    case 'left':
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill={color} />
        <path fill="none" d="M0 0h24v24H0V0z" />
      </svg>
    )
    default: return <div>No icon name specified</div>
  }
}

export default SvgIcon
