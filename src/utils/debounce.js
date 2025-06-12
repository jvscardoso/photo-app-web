export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const debounce = (func, wait = 300) => {
  let timer

  function response(...args) {
    const context = this

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }

  return response
}
