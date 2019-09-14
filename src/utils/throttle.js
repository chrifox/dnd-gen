export const throttle = (callback, interval) => {
  let enableCall = true

  return (...args) => {
    if (!enableCall) return

    enableCall = false
    callback.apply(this, args)
    setTimeout(() => enableCall = true, interval)
  }
}
