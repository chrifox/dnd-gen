const TOTAL = 100

export const findByChance = items => {
  let cumul = TOTAL
  let random = Math.floor(Math.random() * TOTAL)

  for(let i = 0; i < items.length; i++) {
    cumul -= items[i].chance
    if (random >= cumul) {
      return items[i]
    }
  }
}
