setTimeout(() => { console.log('setTimeout') })
Promise.resolve().then(() => { console.log('Promise') })
console.log('syncStart')
process.nextTick(() => { console.log('process.nextTick') })
setImmediate(() => { console.log('setImmediate') })
console.log('syncEnd')

