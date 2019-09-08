const createArray = length => {
    let arr = []

    for (var i = 0; i < length; i++) {
      arr[i] = []
    }

    return arr
}

export const tileGen = (rows, cols) =>
  createArray(rows).map(row =>
    createArray(cols).map(col =>
      Math.floor(Math.random() * Math.floor(2))
    )
  )
