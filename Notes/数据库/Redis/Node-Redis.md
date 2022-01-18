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

