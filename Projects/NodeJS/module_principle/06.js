// 输出结果为 syncStart syncEnd s1 s2 n1 n2 p1 p2

setTimeout(() => {
  console.log('s1')
  Promise.resolve().then(() => { console.log('p1') })
  process.nextTick(() => { console.log('n1') })
})
console.log('syncStart')
setTimeout(() => {
  console.log('s2')
  Promise.resolve().then(() => { console.log('p2') })
  process.nextTick(() => { console.log('n2') })
})
console.log('syncEnd')

