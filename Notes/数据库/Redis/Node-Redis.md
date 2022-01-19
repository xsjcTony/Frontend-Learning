# Redis - NodeJS



## 概念

- 在 `NodeJS` 中可以借助第三方库来连接 `Redis` 服务器, 给 `Redis` 服务器发送指令
- 使用 `Node-Redis` (包名为 `redis` ) 进行操作

---

# Node-Redis

[redis - npm](https://www.npmjs.com/package/redis)

[redis/node-redis: A high-performance Node.js Redis client.](https://github.com/redis/node-redis)



## 基本使用



### 安装

```shell
npm i redis
```



### 连接数据库

- 字符串格式为 `redis[s]://[[username][:password]@][host][:port][/db-number]`

```js
import { createClient } from 'redis'

const client = createClient({
  url: 'redis://127.0.0.1:6378/1'
})

client.on('error', (err) => {
  console.error(err)
  client.quit()
})

await client.connect()
```



### 操作数据库

[Command reference – Redis](https://redis.io/commands)

- 一比一还原原生 `Redis` 的 `命令`
- 可以使用 `全大写` 或 `驼峰式`

```js
const res = await client.hGetAll('user') // client.HGETALL 也可以
console.log(res)
```

- 由于版本问题, 有时需要使用 `sendCommand` 发送库中不支持的方法

```js
client.sendCommand(['HMSET', 'user', 'name', 'Tony', 'age', '24'])
```



### 断开连接

```js
await client.quit() // 正规的断开
await client.disconnect() // 强行断开
```

---

# node-redis-sentinel

[redis-sentinel - npm](https://www.npmjs.com/package/redis-sentinel)

[ortoo/node-redis-sentinel: Sentinel client for redis](https://github.com/ortoo/node-redis-sentinel)

- 基于 `Redis-Sentinel` 操作 `Redis` 服务器
- 也可以使用 `ioredis` (推荐)



## 基本使用

```js
import sentinel from 'redis-sentinel'

// 所有sentinel节点的信息
const endpoints = [
  { host: '127.0.0.1', port: 26379 },
  { host: '127.0.0.1', port: 26380 },
  // ...
]

// 额外配置
const opts = {}

// 主节点的名称, 默认为 'mymaster'
const masterName = 'mymaster'

// 连接 Redis-Sentinel
const redisClient = sentinel.createClient(endpoints, masterName, opts) // masterName 和 opts 是可选的

// 通过 redisClient 实例对象操作 redis, API 和 Node-Redis 相同
```

---

# ioredis

[ioredis - npm](https://www.npmjs.com/package/ioredis)

[luin/ioredis: 🚀 A robust, performance-focused, and full-featured Redis client for Node.js.](https://github.com/luin/ioredis)

- 全能的 `Redis` 服务器的 `NodeJS` 端
- 支持 `Cluster` / `Sentinel` 等



## 基本使用

```js
import Redis from 'ioredis'

// 告诉 ioredis 都有哪些分片服务器
const cluster = new Redis.Cluster([
  {
    port: 6379,
    host: '127.0.0.1'
  },
  // 其他分片服务器的主节点
])

// 通过cluster连接对象来操作Redis
await cluster.set('name', 'Tony')
const res = await cluster.get('name')

```



