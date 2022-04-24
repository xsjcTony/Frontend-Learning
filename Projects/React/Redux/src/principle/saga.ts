function* gen(): Generator<Promise<unknown>, void> {
  const data = yield new Promise((resolve) => {
    setTimeout(() => void resolve('abc'), 2000)
  })
  console.log(data)
}

const res = gen()
const a = res.next().value
if (a instanceof Promise) {
  a.then(data => void res.next(data))
}
