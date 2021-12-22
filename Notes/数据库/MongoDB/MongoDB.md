# MongoDB



> [MongoDB: the application data platform | MongoDB](https://www.mongodb.com/)



## 定义

- 存储文档 (BSON) 的 `非关系型` 数据库
- `BSON` : Binary JSON

---

## 非关系型数据库

定义

- 在 `非关系型` 数据库中, 没有 `表` 的概念, 所以存储数据更加灵活
- 对于数据没有严格的结构要求
- 不需要使用 `SQL` 语言来操作
- `MongoDB` 和 `MySQL` 的存储方式对比

```
MySQL

                |--行1
        |--表1--|--行2
数据库---|       |--行3
        |--表2
        |--... ...

==================================

MongoDB

                  |--文档1
        |--集合1--|--文档2
数据库---|         |--文档3
        |--集合2
        |--... ...
```

---

## 数据库的选择

- `关系型` 和 `非关系型` 数据库并不是替代关系, 而是互补关系
- 数据模型比较简单, 性能要求不是很高, 灵活性比较强的数据, 一般都存储到 `非关系型` 数据库中
- 反之则存储到 `关系型` 数据库中

---

## 安装

[MongoDB Community Download | MongoDB](https://www.mongodb.com/try/download)

- 安装完之后需要配置环境变量
- 在 `Terminal` 中输入命令 `mongo` 即可连接 (本地的情况下)

---

## 基本使用

- 在 `MongoDB` 中, 是区分大小写的
- 命名一般采用 `camelCase`

连接到服务器

- 在 `Terminal` 中输入 `mongo`

```shell
mongo
```

查看所有数据库

- 默认情况下有三个数据库
  - admin
  - config
  - local

```shell
show dbs
```

创建新数据库

```shell
user databaseName
```

查看集合

```shell
show collections
```

创建集合

```js
db.createCollection('collectionName')
```

往集合中插入数据

```js
db.collectionName.insert({ /* JSON */ }) // 单条数据
db.collectionName.insert([{ /* JSON */ }, { /* JSON */ }]) // 多条数据
```

查看集合中的数据

```js
db.collectionName.find()
```

删除集合

- 返回 `true` 即为删除成功, `false` 为删除失败

```js
db.collectionName.drop()
```

删除数据库

- 删除当前数据库

```js
db.dropDatabase()
```

---

## 主键 (primary key)

定义

- 和 `MySQL` 一样, 用于保证每一条数据的唯一性
- 不同的是, `MongoDB` 的 `主键` 不需要明确指定
- 每一个 `文档` 被添加到 `集合` 之后, 主键 `_id` 就会被自动创建
- `_id` 是一个被保留的字段, 用于表示 `主键`

类型

- 默认情况下 `主键` 是一个 `ObjectId` 类型的数据

- `ObjectId` 是一个 `12` 个字节的 `字符串` (示例: `61c27d6e-1ef4fa-22f4-5ef515` )
  - `4字节` : 这条数据的时间戳
  - `3字节` : 存储这条数据的那台电脑的标识符
  - `2字节` : 存储这条数据的 `MongoDB` 进程id
  - `3字节` : 计数器

原因

- 为了支持 `横向扩展`
  - `横向扩展` : 增加数据库服务器的台数 (将多台电脑上安装数据库, 然后组合成一个完整的数据库)
  - `纵向扩展` : 增加数据库服务器的物理配置

其他类型

- `MongoDB` 支持除了 `数组` 类型之外的任意类型数据作为 `主键`
- `复合主键` : 甚至可以将一个 `文档` (对象) 作为另一个 `文档` 的 `主键`
  - <span style="color: #ff0;">必须要保证 `文档` 一模一样, 才能保证 `主键` 的唯一性 (包括字段顺序)</span>
  - 例如 `{ name: 'Tony', age: 24 }` 和 `{ age: 24, name: 'Tony' }` **不是** 一模一样的

---

## 写入

- 写入文档时, 若指定的 `集合` 不存在, 那么会自动创建一个



### 写入一个文档

- 使用 `db.collection.insertOne()` 方法
  - `document` : 需要写入的文档
  - `writeConcern` : 写入安全级别
    - 安全级别: 用于判断数据写入是否成功. 安全级别越高, 数据丢失风险越小, 但是性能消耗 (操作延迟) 也就越大
    - `MongoDB` 会开启默认的安全级别

```js
db.<collection>.insertOne(
	<document>,
  {
  	writeConcern: <document>
  }
)
```



### 写入多个文档

- 使用 `db.collection.insertMany()` 方法
  - `[document1, document2, ...]` : 需要写入的文档的 `数组`
  - `writeConcern` : 写入安全级别
  - `ordered` : 是否按照写入顺序插入
    - `true` : 严格按照顺序插入
      - 若其中有一个数据出错, 那么不会添加剩余数据
    - `false` : 不按照顺序插入, 写入效率更高 (系统自动优化)
      - 若其中有一个数据出错, 跳过这个数据继续添加其余数据

```js
db.<collection>.insertMany(
	[<document1>, <document2>, ...],
  {
    writeConcern: <document>,
    ordered: <boolean>
  }
)
```



### 覆盖一个文档

- 使用 `db.collection.replaceOne()` 方法
  - `filter` : 需要替换的文档片段, 比如 `{ _id: xx }`
  - `document` : 需要写入的文档
  - `writeConcern` : 写入安全级别

```js
db.<collection>.replaceOne(
	<filter>,
  <document>,
  {
  	writeConcern: <document>
  }
)
```



### 删除所有文档

```js
db.<collection>.deleteMany({})
```

---

## 查询



### 查询文档

- 使用 `db.collection.find()` 方法
  - `query` : 查询条件, 相当于 `MySQL` 中的 `where`
  - `projection` : 投影文档, 规定了返回的结果中显示哪些字段
- 什么都不传入或传入 `{}` 就是查询所有文档

```js
db.<collection>.find(
	<query>,
  <projection>
)
```



### 文档投影 (projection)

- 规定了返回的结果中显示哪些字段
- 默认情况下, 所有字段都显示

显示某一字段 (默认, 可以不写)

```js
db.collection.find(
	<query>,
  { <field>: 1 } // 或 <field>: true
)
```

不显示某一字段

- <span style="color: #ff0;">"除了 `_id` 字段以外, 其他字段不可以同时出现 `1` 和 `0` , 简单来说就是只显示的写出不需要显示的字段, 需要显示的不要写</span>

```js
db.collection.find(
	<query>,
  { <field>: 0 } // 或 <field>: false
)
```





### 条件查询 (query)

- 条件默认是 `AND ` 关系, 没有顺序要求, 只要同时满足多个条件即可
- 若某个字段的取值又是 `文档` , 那么在判断的时候通过 `outerField.innerField` 的方式来指向嵌套文档的字段, <span style="color: #0ff;">需要用引号 `''` 包裹起来</span>





















