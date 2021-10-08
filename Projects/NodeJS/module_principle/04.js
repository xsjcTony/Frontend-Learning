// 输出结果为 syncStart syncEnd p4 s1 p1 p2 s3 s4 s2 p3

setTimeout(() => {
  console.log('s1')
  Promise.resolve().then(() => { console.log('p1') })
  Promise.resolve().then(() => { console.log('p2') })

  setTimeout(() => {
    console.log('s2')
    Promise.resolve().then(() => { console.log('p3') })
  })
}, 0)
console.log('syncStart')
Promise.resolve().then(() => {
  console.log('p4')
  setTimeout(() => { console.log('s3') })
  setTimeout(() => { console.log('s4') })
})
console.log('syncEnd')
