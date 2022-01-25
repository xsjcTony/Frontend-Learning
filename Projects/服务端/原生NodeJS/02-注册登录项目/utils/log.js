import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


const __dirname = path.dirname(fileURLToPath(import.meta.url))


// helper functions
const _createDirPath = () => {
  const date = new Date()
  const dirName = `${ date.getFullYear() }_${ date.getMonth() + 1 }_${ date.getDay() }`
  const fullPath = path.join(__dirname, '../log', dirName)

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath)
  }

  return fullPath
}


const _createWriteStream = () => {
  const fullPath = _createDirPath()
  const fullFileName = path.join(fullPath, 'access.log')

  return fs.createWriteStream(fullFileName, { flags: 'a' })
}


// main functions
const writeStream = _createWriteStream()
const writeLog = (log) => {
  writeStream.write(`${ log }\n`)
}

export default writeLog
