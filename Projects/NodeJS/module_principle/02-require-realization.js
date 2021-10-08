const path = require('path')
const fs = require('fs')
const vm = require('vm')

class AModule {
  constructor (id) {
    this.id = id
    this.exports = {}
  }

  static wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ]

  static _cache = {}

  static _extensions = {
    '.js': function (module) {
      // 1. read JavaScript code
      const script = fs.readFileSync(module.id, 'utf-8')

      // 2. wrap code as a Function
      const scriptStr = AModule.wrapper[0] + script + AModule.wrapper[1]

      // 3. convert code string to real code
      const scriptCompiled = vm.runInThisContext(scriptStr)

      // 4. run compiled code
      scriptCompiled.call(module.exports, module.exports)
    },
    '.json': function (module) {
      const json = fs.readFileSync(module.id, 'utf-8')
      module.exports = JSON.parse(json)
    }
  }
}

function aRequire(filePath) {
  // 1. convert relative path to absolute path
  const absolutePath = path.join(__dirname, filePath)

  // 2. try to load current module from cache
  const cachedModule = AModule._cache[absolutePath]
  if (cachedModule) {
    return cachedModule.exports
  }

  // 3. create new Module and cache it if not cached
  const module = new AModule(absolutePath)
  AModule._cache[absolutePath] = module

  // 4. use tryModuleLoad() to load module
  tryModuleLoad(module)

  // 5. return module's exports
  return module.exports
}

function tryModuleLoad(module) {
  // 1. get module's extension (count as .js by default)
  let extension = path.extname(module.id)
  if (!extension) {
    extension = '.js'
    module.id += '.js'
  }

  // 2. invoke load module method based on the extension
  AModule._extensions[extension](module)
}

const sampleModule = aRequire('./01-a.js')
console.log(sampleModule)



