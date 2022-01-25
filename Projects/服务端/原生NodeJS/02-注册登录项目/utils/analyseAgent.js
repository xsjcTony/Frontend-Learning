import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'


const __dirname = path.dirname(fileURLToPath(import.meta.url))


// helper functions
const _dirPath = () => {
  const date = new Date()
  const dirName = `${ date.getFullYear() }_${ date.getMonth() + 1 }_${ date.getDay() }`
  return path.join(__dirname, '../log', dirName)
}


const _createReadStream = () => {
  const fullFileName = path.join(_dirPath(), 'access.log')

  return fs.createReadStream(fullFileName)
}


// main functions
const readStream = _createReadStream()

readStream.on('error', (err) => { console.error(err) })

let totalCount = 0
let chromeCount = 0

const rl = readline.createInterface({ input: readStream })
rl.on('line', (line) => {
  if (!line) { return }
  totalCount++
  if (line.includes('Chrome')) { chromeCount++ }
})
rl.on('close', () => {
  console.log(`${ chromeCount / totalCount * 100 }%`)
})
