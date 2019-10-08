import { useState, useEffect } from 'react'
import { getMapKeyItems } from '../components/MapKey'
import { createMap, addRoomToMap, createRoomBehindDoor } from '../utils'

export const useMapState = ({ rows, columns }) => {
  const [state, updateMap] = useState({ mapGrid: [], rooms: [], keyItems: [] })

  const newMap = () => {
    const { mapGrid, rooms } = createMap({ rows, columns })
    const keyItems = getMapKeyItems(mapGrid)
    updateMap({ mapGrid, rooms, keyItems })
  }
  
  const openADoor = door => {
    let rooms = state.rooms.filter(r => !r.visible)
    const roomToReveal = rooms.reduce((chosenRoom, r, i) => {
      if (r.doorTile.row === door.row && r.doorTile.column === door.column) {
        rooms[i].visible = true
        chosenRoom = {
          position: r.position,
          room: r.roomChoice,
          roomTiles: r.room.roomTiles,
          doors: r.room.doors,
        }
      }
      return chosenRoom
    }, null)
    if (roomToReveal) {
      updateMap(state => {
        const mapGrid = addRoomToMap(state.mapGrid, roomToReveal)
        const keyItems = getMapKeyItems(mapGrid)
        roomToReveal.doors.map(d => rooms.push(createRoomBehindDoor(roomToReveal.position, mapGrid, d)))
        return { mapGrid, rooms, keyItems }
      })
    }
  }

  // Update map only if rows or columns change
  useEffect(newMap, [rows, columns])

  return { state, newMap, openADoor }
}
