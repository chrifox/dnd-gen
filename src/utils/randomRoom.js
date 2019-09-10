export const randomRoom = rooms => {
  const random = Math.floor(Math.random() * rooms.length)
  const choice = rooms[random]

  // randomise orientation if needed
  if (choice.rows !== choice.cols) {
    return Math.random() < 0.5 ? choice : {
      ...choice,
      rows: choice.columns,
      columns: choice.rows,
    }
  }

  return choice
}
