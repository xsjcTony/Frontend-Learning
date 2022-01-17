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

#### 应用场景

- 可以用于实现一些简单的数据结构
  - `栈` 结构 (stack 先进后出 FILO) : 使用 `LPUSH` + `LPOP`
  - `队列` 结构 (queue 先进先出 FIFO) : 使用 `LPUSH` + `RPOP`



### Set

- 一堆无序的数据, 当成一个整体作为 `value` 存储
- `Set` 中的数据不能重复

#### 应用场景

- 抽奖: 使用 `SRANDMEMBER` 来随机抽取成员
- 绑定标签
- 社交关系: 使用 `交集` / `并集` / `差集` 等等功能快速实现



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
SELECT index // select 1 即为使用序号为 1 的数据库
```

查询当前数据库中的 `key`

[KEYS – Redis](https://redis.io/commands/keys)

- `*` 代表查询所有
- <span style="color: #ff0;">由于是单线程操作, 比较耗时, 不推荐企业开发中使用</span>

```js
KEYS pattern
```

清空数据库

- `flushdb` 清空当前数据库
- `flushall` 清空所有数据库 (离职操作)
- `v4.x+` 添加了 `ASYNC` 选项
- <span style="color: #ff0;">由于是单线程操作, 比较耗时, 不推荐企业开发中使用</span>

```js
FLUSHDB
FLUSHALL
```

计算当前数据库中 `key` 的总数

- <span style="color: #0ff;">不耗时, 可以大胆使用</span>

```js
DBSIZE
```

查看某个 `key` 的 `value` 的数据类型

```js
TYPE key
```

查看 `key` 是否存在

- 可以指定多个 `key`
- 返回存在的 `key` 的个数

```js
EXISTS key [key ...]
```

 `key` 的过期时间

- 通过 `expire` 设置 `key` 的过期时间
  - 返回 `1` 为设置成功
  - 返回 `0` 为没有设置
- 通过 `ttl` 查看 `key` 的剩余时间 (秒)
  - 若没有设置过期时间, 会返回 `-1`
- 通过 `persist` 取消 `key` 的过期时间
  - 返回 `1` 为取消成功
  - 返回 `0` 为 `key` 不存在或没有过期时间

```js
EXPIRE key seconds // 设置过期时间
TTL key // 查看剩余时间
PERSIST key // 取消过期时间
```





### String (字符串)

增删改查

- 新增 / 修改

  - 若 `key` 存在, 即为修改

  - 若 `key` 不存在, 即为新增

```js
SET key value
```

- 获取

```js
GET key
```

- 删除
  - 返回值为删除的 `key` 的个数

```js
DEL key
```

高级操作

- 只有在 `key` 不存在的情况下才新增 (只新增)

```js
SETNX key value
SET key value nx
```

- 只有在 `key` 存在的情况下才修改 (只更新)

```js
SET key value xx
```

- 批量操作
  - 在 `set` / `get` 命令前加上 `m`
  - 不能使用 `set` 的 `options`

```js
MGET key [key ...]
MSET key value [key value ...]
```

其他操作

- 设置新值, 返回旧值
  - 会将新值设置给 `key`
  - 返回旧的 `value`

```js
GETSET key value
```

- 拼接字符串
  - 返回拼接之后字符串的长度

```js
APPEND key value
```

- 获取字符串长度
  - 中文的长度取决于 `字符编码`

```js
STRLEN key
```

- 获取字符串的一部分
  - 起始 / 结束的索引都是包括的 (inclusive)
  - 负数代表从最后开始计数, 比如 `-1` 代表最后一个字符

```js
GETRANGE key startIndex endIndex
```

- 从指定位置开始修改字符串
  - 起始索引是包括的 (inclusive)
  - 不要使用 `负数` 索引

```js
SETRANGE key startIndex value
```

自增自减

- `+1` 自增 / `-1` 自减
  - 返回自增 / 自减之后的字符串
  - 若操作的 `key` 不存在, 那么视为 `0` 并开始处理
  - 无法操作非 `integer` 类型的字符串

```js
INCR key // 自增
DECR key // 自减
```

- 增加 / 减少指定 `整数`
  - 返回增加 / 减少之后的字符串
  - 若操作的 `key` 不存在, 那么视为 `0` 并开始处理
  - 无法操作非 `integer` 类型的字符串

```js
INCRBY key increment // 增加x
DECRBY key decrement // 减少x
```

- 增加 / 减少指定 `小数` / `整数`
  - 返回增加 / 减少之后的字符串
  - 若操作的 `key` 不存在, 那么视为 `0` 并开始处理
  - 无法操作非 `float` 类型的字符串
  - 没有 `decrbyfloat` 方法, 若想减少, 使用 `负数`

```js
INCRBYFLOAT key increment // 正数为增加, 负数为减少
```



### Hash (哈希)

增删改查

- 新增 / 修改
  - 若 `key` 存在, 即为修改
  - 若 `key` 不存在, 即为新增

```js
HSET key field value
```

- 获取

```js
HGET key field
```

- 删除
  - 删除的 `字段` 的个数
  - `HDEL` 用于删除 `hash` 中的 `字段`
  - 若要删除整个 `key` , 直接使用 `DEL`

```js
HDEL key field [field ...]
```

高级操作

- 批量操作
  - 在 `HSET` / `HGET` 命令的 `SET` 前加上 `M`
  - `v4.x+` 之后可以直接使用 `HSET` 代替 `HMSET`

```js
HMGET key field [field ...]
HMSET key field value [field value ...] // v4.x+ 之后可以直接使用 HSET
```

- 查询指定 `key` 中 `字段` 的个数

```js
HLEN key
```

- 查询指定 `key` 中有没有指定的 `字段`
  - 返回 `1` 代表有
  - 返回 `0` 代表没有

```js
HEXISTS key field
```

其他操作

- 查询指定 `key` 中的所有 `字段`
  - <span style="color: #ff0;">由于是单线程操作, 比较耗时, 不推荐企业开发中使用</span>

```js
HKEYS key
```

- 查询指定 `key` 中的所有 `字段` 的 `value`
  - <span style="color: #ff0;">由于是单线程操作, 比较耗时, 不推荐企业开发中使用</span>

```js
HVALS key
```

- 查询指定 `key` 中的所有 `字段` 和其 `value`
  - <span style="color: #ff0;">由于是单线程操作, 比较耗时, 不推荐企业开发中使用</span>

```js
HGETALL key
```



### List (列表)

增删改查

- 插入
  - 若 `key` 不存在, 即为新建一个空 `List` , 然后再插入
  - `LPUSH` 将数据一个一个的插入到 `List` 的最开始
  - `RPUSH` 将数据一个一个的插入到 `List` 的最后

```js
LPUSH key element [element ...]
RPUSH key element [element ...]
```

- 获取
  - `LRANGE` 按索引范围取出元素
    - `startIndex` 和 `stopIndex` 都是包括的 (inclusive)
    - `负数` 从最后开始反向计数
  - `LINDEX` 按索引取出单个元素
    - `负数` 从最后开始反向计数

```js
LRANGE key startIndex stopIndex
LRANGE key 0 -1 // 获取所有元素
LINDEX key index
```

- 修改
  - 根据索引修改元素
  - `负数` 从最后开始反向计数

```js
LSET key index element
```

- 删除
  - POP删除
    - `LPOP` 删除 `List` 最开始的元素
    - `RPOP` 删除 `List` 最后的元素
    - `返回值`
      - 被删除的元素
      - 若 `key` 不存在, 则返回 `nil`
    - `v6.2.0+` 开始可以增加 `count` 来指定删除几个元素
  
  ```js
  LPOP key
  RPOP key
  ```
  
  - 指定元素删除
    - `count > 0` : 从 `List` 的头开始搜索到尾, 移除与 `element` 相等的元素, 数量为 `count`
    - `count < 0` : 从 `List` 的尾开始搜索到头, 移除与 `element` 相等的元素, 数量为 `count` 的 `绝对值`
    - `count = 0` : 移除 `List` 中所有与 `element` 相等的元素
    - `返回值` 为删除的元素的个数
  
  ```js
  LREM key count element
  ```
  
  - 根据索引截取 (trim)
    - `startIndex` 和 `stopIndex` 都是包括的 (inclusive)
    - `负数` 从最后开始反向计数
  
  
  ```js
  LTRIM key startIndex stopIndex
  ```

其他操作

- 在指定元素之前 / 之后插入数据
  - `pivot` : 插入数据的参照物
  - `BEFORE | AFTER` : 在 `pivot` 的前面 or 后面插入数据
  - `element` : 要插入的元素
  - `返回值`
    - 若成功插入, 返回插入后 `List` 的长度
    - 若没有找到 `pivot` , 返回 `-1`


```js
LINSERT key BEFORE pivot element // 在 pivot 之前插入 element
LINSERT key AFTER pivot element // 在 pivot 之后插入 element
```

- 获取 `List` 的长度
  - 若 `key` 不存在, 则返回 `0` (视为空 `List` )
  - 若 `Key` 存在但不是 `List` , 报错

```js
LLEN key
```



### Set (集合)

增删改查

- 新增 / 修改
  - 若 `key` 不存在, 即为新建一个空 `Set` , 然后再插入
  - 若 `key` 存在, 则插入到当前的 `Set`
  - 若 `key` 不是一个 `Set` , 则报错
  - 若要添加的成员已存在与 `Set` 中, 则会被忽略

```js
SADD key member [member ...]
```

- 获取
  - 获取所有成员
    - <span style="color: #ff0;">由于是单线程操作, 比较耗时, 不推荐企业开发中使用</span>
  
  ```js
  SMEMBERS key
  ```
  
  - 随机获取指定数量的成员
    - 若指定了 `count` , 则返回一个 `List` , 包含了成员
    - 若没有指定 `count` , 则返回一个 `字符串` , 是一个随机的成员
    - 若 `count` 为 `负数` , 则每个成员都可以出现多次, 结果总数量为 `count` 的 `绝对值`
    - 若 `key` 不存在则返回 `nil`
  
  ```js
  SRANDMEMBER key [count]
  ```


- 删除
  - 随机删除
    - 工作机制和 `随机获取` 一样, 但多了删除的步骤
  
  ```js
  SPOP key [count]
  ```
  
  - 删除指定的元素
    - 若指定的成员不在 `Set` 中, 则被忽略
    - `返回值`
      - 被删除的成员的个数
      - 若 `key` 不存在, 则视为空 `Set` , 返回 `0`
      - 若 `key` 不是 `Set` , 则报错
  
  ```js
  SREM key member [member ...]
  ```

其他操作

- 统计 `Set` 中元素的个数

```js
SCARD key
```

- 判断 `Set` 中是否有指定元素
  - `1` 代表有
  - `0` 代表没有或 `key` 不存在
  - `SISMEMBER` 用于判断一个成员
  - `v6.2.0+` : `SMISMEMBER` 用于判断多个成员


```js
SISMEMBER key member
SMISMEMBER key member [member ...] // v6.2.0+ 以上版本才有
```

高级操作

- `Set` 是可以支持 `Set` 之间的操作的, 比如求 `交集` / `并集` / `差集`
  - 不存在的 `key` 视为空 `Set`
- 交集

```js
SINTER key [key ...]
```

- 并集

```js
SUNION key [key ...]
```

- 差集
  - 差集的顺序是很重要的

```js
SDIFF key [key ...]
```



### ZSet (有序集合)

增删改查

- 新增 / 修改
  - 若 `key` 不存在, 即为新建一个空 `ZSet` , 然后再插入
  - 若 `key` 存在, 则插入到当前的 `ZSet`
  - 若 `key` 不是一个 `ZSet` , 则报错
  - 若要添加的成员已存在与 `ZSet` 中, 则会更新其 `权重` 值 (score) , 然后在正确的排序位置重新插入
  - `权重` 值可以是 `浮点` (float)

```js
ZADD key score member [score member ...]
```

- 获取

  - 根据 `排名` (Rank) 获取
    - `startRank` 和 `stopRank` 都是包括的 (inclusive)
    - `负数` 从最后开始反向计数
    - `WITHSCORES` : 可选属性, 在返回的结果中是否添加 `权重` 值
      - 返回结果从 `member1, member2, ...` 变为 `member1, score1, member2, score2, ...`

  ```js
  ZRANGE key startRank stopRank [WITHSCORES]
  ```

  - 根据权重获取
    - 默认情况下 `min` 和 `max` 都是包括的 (inclusive)
    - 在 `min` / `max` 前面添加 `(` 可以让他们变成不包括的 (exclusive)
    - `min` / `max` 可以是 `-inf` / `+inf` , 这样就可以不用知道具体的 `权重` 值范围

  ```js
  ZRANGE key min max [WITHSCORES]
  ```


- 删除

  - 删除指定的元素
    - 若指定的成员不在 `ZSet` 中, 则被忽略
    - `返回值`
      - 被删除的成员的个数
      - 若 `key` 不存在, 则视为空 `Set` , 返回 `0`
      - 若 `key` 不是 `ZSet` , 则报错

  ```js
  ZREM key member [member ...]
  ```

  - 删除指定 `排名` 范围内的元素
    - `startRank` 和 `stopRank` 都是包括的 (inclusive)
    - `负数` 从最后开始反向计数

  ```js
  ZREMRANGEBYRANK key startRank stopRank
  ```

  - 删除指定 `权重` 范围内的元素
    - 默认情况下 `min` 和 `max` 都是包括的 (inclusive)
    - 在 `min` / `max` 前面添加 `(` 可以让他们变成不包括的 (exclusive)
    - `min` / `max` 可以是 `-inf` / `+inf` , 这样就可以不用知道具体的 `权重` 值范围

  ```js
  ZREMRANGEBYSCORE key min max
  ```

其他操作

- 统计 `ZSet` 中成员的个数

```js
ZCARD key
```

- 查询指定成员的 `权重` 值
  - 如果指定成员或 `key` 不存在, 返回 `nil`


```js
ZSCORE key member
```

- 查询指定 `权重` 范围内的成员个数
  - 默认情况下 `min` 和 `max` 都是包括的 (inclusive)
  - 在 `min` / `max` 前面添加 `(` 可以让他们变成不包括的 (exclusive)
  - `min` / `max` 可以是 `-inf` / `+inf` , 这样就可以不用知道具体的 `权重` 值范围

```js
ZCOUNT key min max
```

高级操作

- `Set` 是可以支持 `Set` 之间的操作的, 比如求 `交集` / `并集` / `差集`
  - 不存在的 `key` 视为空 `Set`
- 交集

```js
SINTER key [key ...]
```

- 并集

```js
SUNION key [key ...]
```

- 差集
  - 差集的顺序是很重要的

```js
SDIFF key [key ...]
```









































