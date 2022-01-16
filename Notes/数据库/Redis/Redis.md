# Redis



> [Redis](https://redis.io/)
>
> [redis/redis: Redis is an in-memory database that persists on disk. The data model is key-value, but many different kind of values are supported: Strings, Lists, Sets, Sorted Sets, Hashes, Streams, HyperLogLogs, Bitmaps.](https://github.com/redis/redis)
>
> [Releases · microsoftarchive/redis](https://github.com/microsoftarchive/redis/releases)



## 定义

- 全称为 Remote Dictionary Server (远程字典服务器)
- 是一个 `开源` , 使用 `C语言` 编写的数据库
- 和 `MongoDB` 一样是 `非关系型数据库` (NoSQL)
- `MongoDB` 存储的是 `文档` , 而 `Redis` 存储的是 `键值对` (Key-Value Pair)



### 特点

- 速度快
  - 默认情况下数据存储在 `内存` 中
  - 读取速度能达到 `10万次/s`
  - 写入速度能达到 `8万次/s`
- 支持数据持久化
  - 可以将 `内存` 中的数据保存到 `磁盘` 中
- 支持多种数据结构
  - `Redis` 通过 `Key-Value` 的形式存储数据, `value` 除了支持常用数据类型以外, 还支持 `list` / `set` / `zset` / `hash` 等数据结构的存储
- 定制性强
  - 开源免费
  - 源代码量不大, 方便阅读
- 支持分布式
  - 和 `MongoDB` 一样, 支持 `主从复制` / `分布式存储`



### 应用场景

- 缓存系统
  - 使用 `Redis` 实现内存缓存
  - 应用于经常被查询, 但是不经常被修改或删除的数据
- 排行榜
  - 利用支持的 `set` / `sorted set` 数据类型, 实现排行榜会非常简单
- 计数器
  - 利用内置的 `incr` / `decr` 等指令, 实现计数器会非常简单
  - 转发数 / 评论数 / 播放数 / 访问数等等
- 社交关系
  - 利用支持的 `set` 类型, 以及 `社交关系` 不会经常发生改变的特性
- 消息队列系统
  - `Redis` 天生支持发布订阅模式, 所以实现消息队列系统十分容易

---

## 基本使用



### 安装

- 官方的 `redis` 已经到 `v6.x` , 但是支持 `windows` 的只到 `v3.2.100` 
- 下载链接: [Releases · microsoftarchive/redis](https://github.com/microsoftarchive/redis/releases)
- 全程下一步即可, 勾选添加 `PATH`
- 修改配置文件 `redis.windows-service.conf`
  - `bind` : 改为服务器的 `IP地址`
  - `port` : 默认为 `6379` , 若有冲突可以修改
  - `dbfilename` : 数据持久化的文件
  - `dir` : `dbfilename` 的保存目录
  - `databases` : 默认创建多少个数据库
  - `logfile` : 日志文件的名称`
  - `slaveof` : 主从复制



### 连接数据库

- 端口号默认为 `6379`

```shell
redis-cli -h 127.0.0.1 -p 6379 -a password
```

---

## 数据类型

[An introduction to Redis data types and abstractions – Redis](https://redis.io/topics/data-types-intro)

- `Redis` 是以 `Key-Value` 的形式存储数据的
- `key` 无论如何都是 `字符串` 类型
- `value` 支持如下 `5` 种数据类型
  - 字符串 (String)
  - 哈希 (Hash)
  - 列表 (list)
  - 无序集合 (set)
  - 有序集合 (zset / sorted set)



### String

- 默认就是 `字符串` 类型

- 格式为 `key value`

```
name Tony
```



### Hash

- 相当于 `JavaScript` 中的 `Map` / `对象` , 当成一个整体作为 `value` 存储
- `Hash` 是 `无序` 的
- 格式为 `key field value`

```
user name Tony
user age 24
user gender male
```



### List

- 相当于 `JavaScript` 中的 `数组` / `链表` , 当成一个整体作为 `value` 存储
- `List` 是有序的
- 格式为 `key value1 value2 value3 ...`

```
names Tony Lily Aelita
```



### Set

- 一堆无序的数据, 当成一个整体作为 `value` 存储
- `Set` 中的数据不能重复



### Zset (Sorted Set)

- 一堆有序的数据, 当成一个整体作为 `value` 存储
- 有序版的 `Set` 
- 通过 `权重` 来实现排序

---

## 命令

[Command reference – Redis](https://redis.io/commands)



### 通用操作

切换数据库

- 默认情况下有 `16` 个数据库, 序号分别为 `0 ~ 15`
- 默认使用第 `0` 个
- 使用 `select` 切换数据库

```js
select index // select 1 即为使用序号为 1 的数据库
```



### 字符串

基本操作

- 新增 / 修改

  - 若 `key` 存在, 即为修改

  - 若 `key` 不存在, 即为新增

```js
set key value
```

- 获取

```js
get key
```

- 删除
  - 返回值为删除的 `key` 的个数

```js
del key
```

高级操作

- 只有在 `key` 不存在的情况下才新增 (只新增)

```js
setnx key value
set key value nx
```

- 只有在 `key` 存在的情况下才修改 (只更新)

```js
set key value xx
```

- 批量操作
  - 在 `set` / `get` 命令前加上 `m`
  - 不能使用 `set` 的 `options`

```js
mget key [key ...]
mset key value [key value ...]
```





























