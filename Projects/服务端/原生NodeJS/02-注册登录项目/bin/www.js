// 服务端配置文件
// 提供一个最简单的服务端服务

import http from 'http'
import { serverHandler } from './../app.js'

const PORT = 3000

const server = http.createServer()

server.on('request', serverHandler).listen(3000)
