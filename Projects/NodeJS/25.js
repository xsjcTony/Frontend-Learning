const vm = require('vm')

const str = 'console.log("www.it666.com")'

vm.runInThisContext(str)