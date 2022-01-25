import { URL } from 'url'
import path from 'path'
import fs from 'fs'
import fsPromise from 'fs/promises'
import mime from './mime.cjs'

/**
 * 读取静态资源
 * @param req 请求对象
 * @param res 响应对象
 * @param rootPath 静态资源所在目录
 */
export async function readFile (req, res, rootPath) {
  // get static asset path
  const url = new URL(req.url, 'http://127.0.0.7:3000/')
  const filePath = path.join(rootPath, url.pathname)
  const type = mime[path.extname(filePath)]?.startsWith('text') ? `${ mime[path.extname(filePath)] }; charset=utf-8` : mime[path.extname(filePath)]

  // return if the file does not exist
  if (!fs.existsSync(filePath)) {
    res.end(`File doesn't exist.`)
    return
  }

  // define response head
  res.writeHead(200, {
    'Content-Type': type
  })

  // load & return static asset
  try {
    const content = await fsPromise.readFile(filePath)
    res.end(content)
  } catch (err) {
    res.end('Server Error', err)
  }
}
