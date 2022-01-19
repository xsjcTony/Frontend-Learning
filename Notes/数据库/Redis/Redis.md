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

应用场景

- 可以用于实现一些简单的数据结构
  - `栈` 结构 (stack 先进后出 FILO) : 使用 `LPUSH` + `LPOP`
  - `队列` 结构 (queue 先进先出 FIFO) : 使用 `LPUSH` + `RPOP`



### Set

- 一堆无序的数据, 当成一个整体作为 `value` 存储
- `Set` 中的数据不能重复

应用场景

- 抽奖: 使用 `SRANDMEMBER` 来随机抽取成员
- 绑定标签
- 社交关系: 使用 `交集` / `并集` / `差集` 等等功能快速实现



### Zset (Sorted Set)

- 一堆有序的数据, 当成一个整体作为 `value` 存储
- 有序版的 `Set` 
- 通过 `权重` 来实现排序

应用场景

- 排行榜

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

- 增加 / 减少成员的 `权重`
  - `increment` 为 `正数` 就是增加, `负数` 就是减少
  - 若成员不存在, 则新建这个成员, `权重` 值为 `increment`
  - 若 `key` 不存在, 则新建一个 `ZSet` , 添加该成员, `权重` 值为 `increment`
  - 若 `key` 不是一个 `ZSet` , 则报错
  - `返回值` 为更改后的 `权重`

```js
ZINCRBY key increment member
```

- 从大到小排序
  - 默认排序为从小到大
  - 使用 `ZREV` 打头的方法

```js
ZREVRANGVE key startRank stopRank [WITHSCORES]
```



### 发布订阅

[Pub/Sub – Redis](https://redis.io/topics/pubsub)

- 订阅频道

```js
SUBSCRIBE channel [channel ...]
```

- 发布消息

```js
PUBLISH channel message
```

- 退订频道
  - 若没有指定 `channel` , 则退订所有

```js
UNSUBSCRIBE [channel [channel ...]]
```

---

## 数据持久化 (Persistence)

[Redis Persistence – Redis](https://redis.io/topics/persistence)

定义

- 将 `内存` 中的数据写入到 `磁盘` 中
- `Redis` 和大部分主流数据库一样, 提供两种方式
  - RDB
  - AOF



### RDB

定义

- 全称为 `Redis Database`

- 是一种 `快照` (snapshot)
- 原封不动的将 `内存` 中保存的数据写入到 `磁盘` 中
- 服务器重启时, 直接从 `磁盘` 文件中恢复数据

#### 触发方式

- 手动执行 `SAVE` 命令
  - 是 `同步` 的, 会阻塞进程
  - 如果已存在旧的 `RDB` 文件, 会利用新的覆盖旧的

```js
SAVE
```

- 手动执行 `BGSAVE` 命令
  - 是 `异步` 的, 会在后台执行, 不会阻塞进程
  - 如果已存在旧的 `RDB` 文件, 会利用新的覆盖旧的

```js
BGSAVE
```

- 修改配置文件 `redis.windows-service.conf`

  - `dir` : `RDB` 文件保存的目录 , 默认为 `./`

  - `dbfilename` : `RDB` 文件的名称 , 默认为 `dumb.rdb`

  - `save` : 自动生成条件

    ```js
    SAVE seconds actions // 比如 SAVE 60 10000 意思就是如果60秒内做了10000次操作, 就自动保存
    ```

  - `stop-writes-on-bgsave-error` : 运行 `BGSAVE` 时若发生错误是否需要停止, 取值为 `yes` / `no` , 默认为 `yes`

  - `rdbcompression` : 写入时是否需要压缩, 取值为 `yes` / `no` , 默认为 `yes`

  - `rdbchecksum` : 写入完成之后是否进行校验, 取值为 `yes` / `no` , 默认为 `yes`

#### 弊端

- 无法控制生成的频率, 如果频率过高会导致性能消耗较大

- 数据容易丢失

  - 服务器宕机之前一段时间的数据, 若未写入 `RDB` 文件就会丢失

  ```js
  SADD name Tony
  SAVE // or BGSAVE or 自动保存
  SADD name Lily // 丢失
  // 宕机
  ```

- 耗时 / 耗性能

  - `RDB` 是一次性把内存中的所有数据写入到磁盘中的, 如果写入的数据比较多, 那么就会比较耗时
  - 每次写入时, 就算一些相同的数据已经写入过了, 也会再次完整写入, 浪费 `I/O` 资源
  - `SAVE` 会阻塞后续命令执行
  - `BGSAVE` 会开启 `子进程` 专门负责写入, 但是会消耗内存空间

#### 推荐配置

```js
dir /rdbdiskpath // 应使用一个比较大的磁盘路径
dbfilename dumb-${port}.rdb // 加上端口号用于区分
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
```



### AOF

定义

- 全称为 `Append Only File`
- 是一种 `日志`
- 将所有用户操作的 `指令` 写入到 `磁盘` 中
- 服务器重启时, 重新执行这些 `指令` 以达到恢复数据的目的

#### 触发方式

- `always`

  - 每条命令都即时写入到文件中
  - 优点: 数据不会丢失
  - 缺点: 磁盘 `I/O` 消耗较大

- `everysec`

  - 每隔 `1` 秒写入一次数据, 就是先收集 `1` 秒内的所有命令, 然后再一次性写入
  - 优点: 磁盘 `I/O` 相对较小
  - 缺点: 容易丢失宕机前 `1` 秒中的数据

- `no`

  - 让 `操作系统` 决定什么时候写入, 完全看 `操作系统` 心情
  - <span style="color: #ff0">不可控, 容易丢失大量数据, 不推荐</span>

- 修改配置文件 `redis.windows-service.conf`

  - 三选一, 默认为 `everysec`

  ```js
  appendfsync always
  appendfsync everysec
  appendfsync no
  ```

#### 文件重写机制

- 随着时间推移, `AOF` 文件会越来越大, 导致
  - 磁盘消耗越来越大
  - 写入速度越来越慢
  - 恢复时间原来越长
- 重写机制
  - 对 `AOF` 文件中保存的内容进行优化
    - 降低文件体积
    - 提升文件的恢复速度
  - 自动去除冗余命令
  - 自动去除没有用的命令
  - 本质上是自动生成能够恢复到当前数据库状态的最简命令

```js
// 优化前
SET name Tony
SET name Lily
SET name Aelita
// 优化后
SET name Aelita

/* --- */

// 优化前
INCR count
INCR count
// 优化后
SET count 2

/* --- */

// 优化前
EXPIRE name 3
// 优化后
// SET name 和 EXPIRE name 都不需要保存了, 因为已经过期
```

- 触发重写机制

  - 手动调用命令 `BGREWRITEAOF`
    - 是 `异步` 的, 不会阻塞进程
    - 开启一个新的 `子进程` , 根据内容中的数据, 自动生成命令写入到 `AOF ` 文件中

  ```js
  BGREWRITEAOF
  ```

  - 修改配置文件 `redis.windows-service.conf`
    - `auto-aof-rewrite-min-size` : `AOF` 文件体积达到多大时进行重写 , 默认为 `64mb`
    - `auto-aof-rewrite-percentage` : 对比上一次的重写, 文件体积增长了百分之多少之后进行重写, 默认为 `100`

#### 推荐配置

```js
appendonly yes // 是否适用AOF, 默认为 no
appendfilename "appendonly-${port}.aof" // AOF 文件名, 默认为 "appendonly.aof"
appendfsync everysec // 写入命令的同步机制, 默认为 everysec
dir /rdbdiskpath // 保存AOF文件路径, 默认为 ./
auto-aof-rewrite-min-size 64mb // 默认为 64mb
auto-aof-rewrite-percentage 100 // 默认为 100
no-appendfsync-on-rewrite yes // AOF 重写时是否正常写入当前操作的命令, 默认为 no, no数据更安全, yes更加注重性能
```



### 选择 / 对比

- `AOF` 优先级高于 `RDB` : 如果二者同时打开, 重启之后会优先从 `AOF` 中恢复数据
- `RDB` 体积小于 `AOF` : 原因是 `RDB` 会在保存时对数据进行压缩
- `RDB` 恢复速度比 `AOF` 快
- `AOF` 数据安全性高于 `RDB`
- 两者各有所长, 是互补的关系, 可以结合使用

---

## 主从复制 (Master/replica replication)

[Replication – Redis](https://redis.io/topics/replication)

定义

- 和 `MongoDB` 的 `复制集` 是一个概念
- 使用多台保存了相同内容的 `Redis` 服务器来组成一个数据库 `集群`
- `集群` 中的每一台 `Redis` 服务器称之为一个 `节点`
- 好处
  - 高可用性 (配合 `Redis-Sentinel` 才能实现)
    - 即使有一台服务器宕机了, 用户还可以继续使用其他的服务器
  - 数据安全性
    - 即使有一台服务器坏了, 由于还有其他保存了相同内容的服务器, 不会导致数据丢失
  - 数据分流
    - 把请求分流到不同的服务器, 就可以降低服务器的压力, 加快数据处理速度
    - 将多台服务器安装到不同的区域, 采用就近原则, 提升用户的访问速度
- 特点
  - 必须有一个 `主节点`
    - 主要负责数据的读取和写入
  - 除了 `主节点` 以外的 `节点` 称之为 `副节点`
    - 默认情况下只能读取数据, 无法写入数据
    - 主要负责从主节点不断复制数据
  - 和 `MongoDB` 不同, `Redis` 的 `主从复制` 中如果 `主节点` 宕机了, 不会进行自动选举
    - 如果需要自动选举需要借助 `Redis Sentinel` 实现



### 搭建

1. 拷贝多份安装包
2. 修改配置文件 `redis.windows-service.conf`
   - 修改端口号 `port`
   - 修改绑定的IP `bind`
   - 指定主节点 `slaveof host port`
3. 注册服务

```shell
redis-server --service-install redis.windows-service.conf --service-name serviceName
```

4. 启动服务
5. 查看主从状态

```js
redis-cli -h host -p port
INFO replication
```



### 原理

- 初始化同步

  1. 只要在任意一台服务器上配置或执行了 `SLAVEOF` 指令, 那么就可以建立 `主从关系` 了

  2. 主要建立了 `主从关系` , 那么 `从节点` 就会自动给 `主节点` 发送 `全量复制请求`

  3. `主节点` 收到请求后, 会自动调用 `BGSAVE` , 生成 `RDB` 文件

  4. 如果 `主节点` 在 `BGSAVE` 的过程中收到了其他的指令, 那么会先缓存到 `指令缓冲区` 中

  5. `主节点` 生成好 `RDB` 文件之后, 就会将 `RDB` 文件发送给 `从节点` , 发送期间的指令也会缓存到 `指令缓冲区` 中

  6. 主节点` 在发送完 `RDB` 文件之后, 还会将 `指令缓冲区` 中缓存的指令也发送给 `从节点`

  7. `从节点` 接收到 `RDB` 文件和 `指令缓冲区` 中的指令之后, 会先 `格式化` 自己 (清空自身原有的数据)

  8. `从节点` 加载 `RDB` 文件恢复数据, 再执行 `指令缓冲区` 中的指令

- 后续同步

  - `主节点` 只要接收到一个指令, 就会立即发送给 `从节点`
  - `从节点` 只要接收到 `主节点` 发送的指令, 就会立即执行



### Redis-Sentinel

[Redis Sentinel Documentation – Redis](https://redis.io/topics/sentinel)

定义

- 用于监控 `主从结构` 中每个 `节点` 的状态
- 给 `Redis-Sentinel` 添加多个 `Sentinel 节点` , 让这些节点来监控 `主从结构` 的状态
  - 本质上是一台特殊的 `Redis` 服务器
  - 不用于存储数据, 专门用于处理 `主从结构`
- 一旦发现 `主节点` 宕机了, 那么就让这些 `Sentinel 节点` 重新从 `从节点` 中选举出一个新的 `主节点`

原理

- `Redis-Sentinel` 有三个定时任务, 分别用于
  - 获取 `主从关系` , 发现 `新节点`
    - 每隔 `10` 秒, 每个 `sentinel` 节点对 `主节点` 和 `从节点` 执行 `INFO` 命令
      - 确定 `主从关系`
      - 发现新 `节点`
  - 交换信息, 投票选出新 `主节点`
    - 每隔 `2` 秒, 每个 `sentinel` 节点通过 `主节点` 的 `channel` ( `sentinel:hello` 通道 ) 交换信息 (发布订阅模式)
      - 为故障判断 / 信息交互提供通道
  - 监听节点是否可用 (是否宕机)
    - 每隔 `1` 秒, 每个 `sentinel` 节点对所有 `主节点` / `从节点` / 其他 `sentinel` 节点执行 `ping` 操作
      - 通过 `心跳检测` 来判断 `节点` 是否发生故障

主观下线 vs 客观下线

- 主观下线: 一个 `sentinel` 节点认为 `主节点` 挂了
- 客观下线: 多个 `sentinel` 节点认为 `主节点` 挂了 (推荐)



#### 选举规则

简略

1. 先从 `sentinel` 节点中选举出一个 `领导` `sentinel` 节点
2. `领导` `Sentinel` 节点从剩余 `从节点` 中再自动选举出一个 `主节点`

详细

1. 一旦有一个 `sentinel` 节点没有收到 `主节点` 的相应, 就会主观认为 `主节点` 挂了
2. 这个发现 `主节点` 挂了的 `sentinel` 节点就会发起 `选举`
3. 这个发起选举的 `sentinel` 节点称之为 `候选节点`
4. `候选节点` 会给其他的 `sentinel` 节点发送 `选举请求`
5. 默认情况下其他 `sentinel` 节点只要没有投过 `同意票` , 那么就会默认投出 `同意票`
   - 为了防止选举过程中另一个 `sentinel` 节点再次发起选举
6. 如果有超过半数的 `sentinel` 节点同意, 那么 `候选节点` 就会变为 `领导` `sentinel` 节点
7. `领导` `sentinel` 节点给所有 `从节点` 发送 `SLAVEOF NO ONE` 来断开到 `主节点` 的连接
8. 选择新 `主节点` 的条件遵循以下顺序
   - `优先级` 比较高的 (如果没有配置过, 默认都是一样的)
   - 内容最完整的 ( `offset` 用于记录保存了多少数据 )
   - 选举 `进程ID` 最小的
9. `领导` `sentinel` 给其他 `从节点` 发送 `SLAVEOF host port` 来让他们连接到新的 `主节点`



#### 搭建

1. 搭建一个 `主从结构`
2. 搭建一个 `奇数` 个 `sentinel` 节点的 `Redis-Sentinel`
3. 创建并修改配置文件 `sentinel.conf`

```js
port 26380 // 当前 Sentinel 服务运行的端口
sentinel monitor mymaster 127.0.0.1 6379 2 // 主节点名称 服务器地址 端口 客观下线票数
sentinel down-after-milliseconds mymaster 60000 // 主观下线时间
sentinel failover-timeout mymaster 180000 // 故障转移超时时间
sentinel parallel-syncs mymaster 1 // 故障转移之后, 从节点是串行还是并行同步数据, 1 代表串行, 2 代表并行
daemonize yes // 用于启动服务
```

4. 注册 `sentinel` 服务

```shell
redis-server --service-install sentinel.conf --sentinel --service-name serviceName
```



































