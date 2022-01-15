# MongoDB (v5.x)



> [MongoDB: the application data platform | MongoDB](https://www.mongodb.com/)



## 定义

- 存储文档 (BSON) 的 `非关系型` 数据库
- `BSON` : Binary JSON
- 默认端口号为 `27017`
- `MongoDB` 原生支持 `JavaScript`

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
use databaseName
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

#### 条件操作符

[Query and Projection Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/query/)

- 所有操作符皆以 `$` 开头

##### 比较操作符

[Comparison Query Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/query-comparison/)

- 用于指定和 `<value>` 的对比关系

```js
db.<collection>.find(
	{ <field>: { <operator>: <value> } },
  <projection>
)
```

| 比较操作符 | 描述           | 注意点                                             |
| ---------- | -------------- | -------------------------------------------------- |
| $eq        | 等于           | 默认, 可以省略                                     |
| $gt        | 大于           |                                                    |
| $gte       | 大于等于       |                                                    |
| $in |在 `数组` 中|{ \<field>: { $in: [\<value1>, \<value2>, ...] } }|
| $lt        | 小于           |                                                    |
| $lte       | 小于等于       |                                                    |
| $ne        | 不等于         | 若没有需要判断的字段, 也算作 `不等于`              |
| $nin       | 不在 `数组` 中 | 若没有需要判断的字段, 也算作不在 `数组` 中         |

##### 逻辑操作符

[Logical Query Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/query-logical/)

- 用于组合多个 `<expression>` 表达式
- 可以嵌套

```js
// top-level
db.<collection>.find(
	{
    <operator>: [
    	<expression1>,
    	<expression2>
    ]
  },
  <projection>
)
  
// nested
db.<collection>.find(
	{
    <field>: {
    	<operator>: [
    		<expression1>,
    		<expression2>
    	]
  	}
  },
  <projection>
)
```

| 逻辑操作符 | 描述                                     | 类似         | 注意点                                                       |
| ---------- | ---------------------------------------- | ------------ | ------------------------------------------------------------ |
| $and       | 逻辑与, 匹配条件 **全部** 成立的文档     | 1 && 2       | 默认, 可以省略                                               |
| $not       | 逻辑非, 匹配条件不成立的文档             | !1           | 不能用作 `top-level` 的操作符, 若没有需要判断的字段也会匹配到 |
| $nor       | 逻辑或非, 匹配条件 **全部** 不成立的文档 | ! (1 \|\| 2) | 若没有需要判断的字段也会匹配到                               |
| $or        | 逻辑或, 匹配至少一个条件成立的文档       | 1 \|\| 2     |                                                              |

##### 字段操作符

[Element Query Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/query-element/)

```js
db.<collection>.find(
	{
    <field>: { <operator>: <value> }
  },
  <projection>
)
```

| 字段操作符 | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| $exists    | 查询包含某个字段的文档, 一般可以配合 `$ne` / `$nin` / `$not` / `$nor` 等操作符来使用 |
| $type      | 查询指定字段是指定类型的文档, 具体数据类型查看: [$type — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/query/type/#available-types) |

##### 数组操作符

[Array Query Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/query-array/)

- 用于操作数组

```js
db.<collection>.find(
	{
    <field>: { <operator>: <value> }
  },
  <projection>
)
```

| 数组操作符 | 描述                                               |
| ---------- | -------------------------------------------------- |
| $all       | 匹配数组中包含所有指定查询值的文档                 |
| $elemMatch | 匹配数组中至少有一项能完全匹配所有的查询条件的文档 |
| $size      | 匹配数组长度为指定长度的文档                       |

##### 运算操作符

[Evaluation Query Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/query-evaluation/)

- 这里只有 `$regex` , 更多见文档
- 可以直接在 `$in` / `$nin` 中使用 `正则表达式`

```js
// 通过正则表达式匹配满足条件的文档
db.<collection>.find(
	{
    <field>: { $regex: /pattern/, $options: '<options>' } },
  	<field>: { $regex: 'pattern', $options: '<options>' } },
  	<field>: { $regex: /pattern/<options> } }
  }
)

db.<collection>.find(
	{
    <field>: { $in: [/pattern/<option>, /pattern/<option>] }
  }
)
```



### 文档游标 (Cursor)

定义

- 执行 `find()` 之后的返回值
- 指向被找到的文档 (类似于 `C` 的 `指针` )

注意点

[Iterate a Cursor in mongosh — MongoDB Manual](https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/#std-label-read-operations-cursors)

- 默认情况下 `游标` 会在遍历完所有文档 `10分钟` 之后自动关闭当前 `游标`
- 若不想自动关闭, 可以调用 `cursor.noCursorTimeout()` 让 `游标` 不自动关闭, 一直有效

```js
let cursor = db.<collection>.find().noCursorTimeout()
```

- 可以调用 `cursor.close()` 来手动关门 `游标`

#### 常用方法

[Cursor Methods — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/js-cursor/)

- 游标方法可以在 `find()` 后链式调用

##### 循环方法

- `hasNext()` : 是否还有下一个文档
- `next()` : 取出下一个文档
- `forEach()` : 依次取出所有文档

```js
// 循环打印所有的文档
let cursor = db.<collection>.find()
cursor.forEach(printjson)
```

##### 分页函数

- `limit()` : 取出多少个文档
- `skip()` : 跳过多少个方法, 类似 `offset`

```js
// skip() 永远会在 limit() 之前执行
db.<collection>.find().limit(number).skip(number)
```

##### 排序函数

- `sort()` : 按照指定规则排序
- `<ordering>` 为 `1` 表示升序, `-1` 表示降序

```js
// sort() 永远会在 limit() / skip() 之前执行
db.<collection>.find().sort({ <field>: <ordering>, ... })
```

##### 统计函数

- `count()` : 统计集合中文档的个数
  - 与 `db.<collection>.count()` 效果相同
  - 不要在没有 `<query>` 条件时使用, 因为在 `分布式` 的情况下是不准确的
- `<applySkipLimit>` : 是否应用 `skip()` / `limit()` 的效果, 默认为 `false` , 即不应用
  - 若为 `true` , 则效果与 `cursor.size()` 相同
- 在某些drivers中已弃用, 可以使用 `db.<collection>.countDocuments()` / `db.<collection>.estimatedDocumentCount()` : [Collection Methods — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/js-collection/)

```js
db.<collection>.find(<query>).count(<applySkipLimit>)
```

---

## 更新



### 更新文档

- 使用 `db.<collection>.updateOne()` / `db.<collection>.updateMany()` 来更新一个 / 多个文档
  - `<filter>` : 和 `find()` 中的 `<query>` 一样, 是筛选条件
  - `<update>` : 更改的内容
  - `<options>` : 相关更新选项

```js
// updateOne 会更新找到的第一个符合 <filter> 的文档, 而 updateMany 会更新所有符合条件的
db.<collection>.updateOne(
	<filter>,
  <update>,
  <options>
)
```



### 更新操作符

[Update Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/update/#std-label-update-operators)

- 操作符皆以 `$` 开头

#### 字段操作符

[Field Update Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/update-field/)

- 用于操作 `字段` 

```js
db.<collection>.updateOne(
	<filter>,
  {
  	<operator>: { <field>: <value>, ... }
  },
  <options>
)
```

| 字段操作符 | 描述                                          | 注意点                                                       |
| ---------- | --------------------------------------------- | ------------------------------------------------------------ |
| $set       | 更新 / 新增字段, 字段存在就更新, 不存在就新增 | 嵌套对象通过 `'field.nestedKey'` 的方式更新 / 嵌套数组通过 `'field.index'` 的方式更新 |
| $unset     | 删除字段, 若字段不存在则不做任何操作          | `<value>` 不重要 / 删除嵌套数组的元素时, 会将值设置为 `null` , 而不会改变数组长度 |
| $rename    | 修改字段名称, 若字段不存在则不做任何操作      | 修改嵌套对象的字段名时, 需要指定层级关系 / 如果重命名之后的名称已经存在了, 那么已经存贷的字段就会被删除 / 本质是先调用了 `$unset` , 再调用 `$set` / 不能操作数组 |
| $inc       | 增加 / 减少字段保存的值                       | 可以视为 `加法` , 比如 `减去2` 等于 `加上-2` / 若操作的字段不存在, 那么会自动新增字段, 赋值为操作的值 / 只能操作 `数值` 类型的字段 |
| $mul       | 乘以 / 除以字段保存的值                       | 可以视为 `乘以` , 比如 `除以2` 等于 `乘以0.5` / 若操作的字段不存在, 那么会自动新增字段, 赋值为 `0` / 只能操作 `数值` 类型的字段 |
| $min       | 比较并保留更小的数值                          | 若操作的字段不存在, 那么会自动新增字段, 赋值为操作的值 / 不同类型比较的具体排序规则见下文 |
| $max       | 比较名保留更大的数值                          | 若操作的字段不存在, 那么会自动新增字段, 赋值为操作的值 / 不同类型比较的具体排序规则见下文 |

- 针对 `$min` / `$max` 的不同的 `BSON` 数据类型比较的排序规则 (从上到下, 由大至小)

```
Null
Numbers
Symbol, String
Object
Array
BinData
ObjectId
Boolean
Date
Timestamp
Regular Expression
```

#### 数组操作符

[Array Update Operators — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/update-array/)

- 用于操作 `数组`

```js
db.<collection>.updateOne(
	<filter>,
  {
  	<operator>: { <field>: <value>, ... }
  },
  <options>
)
```

| 数组操作符 | 描述                                      | 注意点                                                       |
| ---------- | ----------------------------------------- | ------------------------------------------------------------ |
| $addToSet  | 向 `数组` 字段中添加元素 (去重)           | 若操作的字段不存在, 那么会自动新增字段, 并将操作的值赋值给新增的 `数组` 字段 / 自动去重 (文档, 数组类型必须一模一样, 包括顺序, 才会去重) / 默认情况会将整个 `数组` 作为一个元素添加进去, 若想要一个一个添加需要使用 `$each` |
| $push      | 向 `数组` 字段中添加元素 (不去重)         | 相当于不会自动去重的 `$addToSet`                             |
| $pop       | 删除 `数组` 字段中的第一个 / 最后一个元素 | `{ $pop: { <field>: 1 } }` 即为删除最后一个元素, `-1` 为删除第一个元素 / `数组` 被清空之后会保留空 `数组` |
| $pull      | 删除 `数组` 字段中所有符合条件的元素      | 可以配合 `正则表达式` , `<query>` 等指定条件 / 删除 `数组` 必须要完全一模一样 (包括顺序) 才能删除 / 删除 `文档` 即使顺序不一样或字段个数不一样, 只要有匹配的就可以删除 |
| $pullAll   | 批量删除 `数组` 字段中的元素              | 删除 `数组` / `文档` 时, 必须要一模一样 (包括顺序) 才能删除  |
| $          | 更新 `数组` 字段中满足条件的第一个元素    | 格式为 `{ "<arrayField>.$": <value> }` / 配合 `$set` 等使用 / 需要更新的 `数组` 字段必须出现在 `<query>` 中 / 相当于复用 `<query>` 条件 |
| $[]        | 更新 `数组` 字段中的所有元素              | 格式为 `{ "<arrayField>.$[]": <value> }` / 配合 `$set` 等使用 |


- 数组操作符 - Modifier

```js
db.<collection>.updateOne(
	<filter>,
  {
  	<operator>: { <field>: { <modifier>: <value> } }
  },
  <options>
)
```

| 数组操作符 - Modifier | 描述                                   |
| --------------------- | -------------------------------------- |
| $each                 | 将 `$push` 和 `$addToSet` 改为逐个添加 |

---

## 删除



### 删除文档

- 使用 `db.<collection>.deleteOne()` / `db.<collection>.deleteMany()` 来删除一个 / 多个文档
  - `<filter>` : 和 `find()` 中的 `<query>` 一样, 是筛选条件
  - `<options>` : 相关删除选项

```js
// deleteOne 会删除找到的第一个符合 <filter> 的文档, 而 deleteMany 会删除所有符合条件的
db.<collection>.updateOne(
	<filter>,
  <options>
)
```

---

## 聚合操作 (Aggregation Pipeline)

[db.collection.aggregate() — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/)

定义

- 通过一个方法完成一系列的操作
- 每一个操作称之为一个 `阶段` (stage)
- 上一个 `阶段` 处理完毕的结果会被传给下一个 `阶段`
- 所有 `阶段` 都处理完毕之后会返回一个新的 `结果集`
- 不会修改原有文档, 会返回一个新的文档

格式

- `<pipeline>` : 定义每个 `阶段` 的操作, 是一个 `数组` , 包含了各个 `聚合阶段`
- `<options>` : `聚合操作` 的额外配置

```js
db.<collection>.aggregate(
	<pipeline>,
  <options>
)
```



### 聚合阶段

[Aggregation Pipeline Stages — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)

格式

- `<value>` 取值中若需要访问原有文档中的字段, 需要在字段名称前加上 `$` , 比如 `$name.firstName` (expression)

```js
db.<collection>.aggregate(
	[
    { <stage>: { <field>: <value> } },
    ...
  ],
  <options>
)
```



#### $project

定义

- 对输入的文档进行再次投影
- 按照需要的格式生成 `结果集`

格式

```js
db.<collection>.aggregate(
	[
    { $project: { <field>: < 1 | 0 > }}
  ],
  <options>
)
```

注意点

- 若使用了原有文档中不存在的字段, 那么会自动使用 `null` 填充



#### $match

定义

- 筛选符合条件的 `文档`
- 和 `find()` 方法中的 `<query>` 一样

格式

```js
db.<collection>.aggregate(
	[
    { $match: <query> }
  ],
  <options>
)
```



#### $limit

定义

- 指定获取 `文档` 的个数
- 和 `游标` 的 `limit` 方法一样

格式

```js
db.<collection>.aggregate(
	[
    { $limit: { <field>: <number> }}
  ],
  <options>
)
```



#### $skip

定义

- 指定跳过 `文档` 的个数
- 和 `游标` 的 `skip` 方法一样

格式

```js
db.<collection>.aggregate(
	[
    { $skip: { <field>: <number> }}
  ],
  <options>
)
```

注意点

- 由于 `聚合操作` 的特性, `$skip` 和 `$limit` 的先后顺序很重要
- 一般的分页操作会将 `$skip` 写在 `$limit` 之前



#### $unwind

定义

- 展开 `数组` 字段
- `数组` 中有n个元素就返回n个 `文档`

格式

- `path` : 指定需要展开的 `数组` 字段
- `includeArrayIndex` (optional) : 指定显示 `索引` 的字段名称
- `preserveNullAndEmptyArrays` (optional) : 指定是否需要过滤数组为 `null` , 不存在字段, `[]` 的情况
  - `true` 不过滤, `false` 过滤
  - 默认为 `false`

```js
db.<collection>.aggregate(
	[
    { $unwind: { path: <field>, <option>: <value> }}
  ],
  <options>
)
```

注意点

- 若使用了原有文档中不存在的字段, 那么会自动使用 `null` 填充



#### $sort

定义

- 对 `文档` 进行排序
- 和 `游标` 中的 `sort` 方法一样

格式

```js
db.<collection>.aggregate(
	[
    { $sort: { <field>: < 1 | -1 > }}
  ],
  <options>
)
```



#### $lookup

[$lookup (aggregation) — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup)

定义

- 关联查询
- 使用 `left outer join`

格式 (关联查询)

- `from` : 关联集合名称
- `localField` : 当前集合中的字段名称
- `foreignField` : 关联集合中的字段名称
- `as` : 输出字段的名称

```js
db.<collection>.aggregate(
	[
    { $lookup: {
      from: <collection to join>,
      localField: <field from the input documents>,
      foreignField: <field from the documents of the 'from' collection>,
      as: <output array field>
    }}
  ],
  <options>
)
```

格式 (无关联查询)

- `from` : 关联集合名称
- `let` : 定义给关联集合的聚合操作中使用的当前集合的常量 (映射)
- `pipeline` : 关联集合的聚合操作, 是一个 `数组`
- `as` : 输出字段的名称

```js
db.<collection>.aggregate(
	[
    { $lookup: {
      from: <joined collection>,
      let: { <var_1>: <expression>, …, <var_n>: <expression> },
      pipeline: [ <pipeline to run on joined collection> ],
      as: <output array field>
    }}
  ],
  <options>
)
```

注意点

- 字段名称不需要 `$`
- `无关联查询` 格式想要进行关联查询需要引入 `关联查询` 格式中的 `localField` 和 `foreignField`



#### $group

[$group (aggregation) — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group)

定义

- 关联查询
- 使用 `left outer join`

格式 (关联查询)

- `_id` : 分组规则
- `<field>` : 定义新字段
- `<accumulator>` : 累加器, 诸如 `$sum` / `$push` 之类

```js
db.<collection>.aggregate(
	[
    { $group: {
      _id: <value>, // Group By value
      <field>: { <accumulator> : <value> },
      ...
    }}
  ],
  <options>
)
```



#### $out

[$out (aggregation) — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/aggregation/out/)

定义

- 将前面阶段处理完的 `文档` 写入一个新的 `集合`

格式 (输出到当前数据库)

```js
db.<collection>.aggregate([
  { $out: <collection-name> }
])
```

格式 (指定数据库)

- `db` : 输出的数据库
- `coll` : 输出的集合名称

```js
db.<collection>.aggregate([
  { $out: {
  	db: <output-db>,
    coll: <collection-name>
  }}
])
```

注意点

- 如果集合不存在, 那么会自动创建
- <span style="color: #ff0">如果集合已经存在, 那么就会覆盖</span>



### 额外配置

格式

```js
db.<collection>.aggregate(
	<pipeline>,
  {
  	<option>: <value>
  }
)
```

#### allowDiskUse

定义

- 默认情况下, `聚合操作` 占用的内存不能超过 `100MB` , 如果超过就会报错
- 将 `allowDiskUse` 设置为 `true` 会将超出 `100MB` 的数据写入到临时文件中, 然后再继续操作, 防止报错
- 默认为 `false`

格式

```js
db.<collection>.aggregate(
	<pipeline>,
  {
  	allowDiskUse: true
  }
)
```



### 表达式

#### 字段路径表达式

- 使用 `$` 开头和 `.` 来连接, 指示内嵌文档字段路径

```js
$<field>.<sub-field>
```

#### 系统变量表达式

- `$$CURRENT` 表示当前操作的文档

```js
$$CURRENT.<field> // 等价于 $<field>
```

#### 常量表达式

- `$literal: <value>` 表示常量 `<value>`

```js
$literal: <value> // 比如 $literal: '$age' 就表示常量字符串 '$age' 而不是 age 字段
```



### 数据类型转换操作符 ($convert)

[$convert (aggregation) — MongoDB Manual](https://docs.mongodb.com/manual/reference/operator/aggregation/convert/#mongodb-expression-exp.-convert)

- 将数据转换成指定类型

格式

- `input` : 需要转换的字段
- `to` : 转换之后的数据类型
- `onError` (optional) : 出现错误的处理方案, 不写的话默认会抛出一个 `Error`
- `onNull` (optional) : `input` 不存在或为 `null` 时的返回值, 不写的话默认返回 `null`

```js
{ $convert: {
  input: <expression>,
  to: <type expression>,
  onError: <expression>,
  onNull: <expression>
}}
```

---

## 索引

[Indexes — MongoDB Manual](https://docs.mongodb.com/manual/indexes/)

定义

- 和 `MySQL` 中的 `索引` 一样
- 用于提升数据的查询速度
- 默认情况下会给 `主键` `_id` 自动创建 `索引`



### 基本单值索引

[Single Field Indexes — MongoDB Manual](https://docs.mongodb.com/manual/core/index-single/)

#### 获取索引

[db.collection.getIndexes() — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/db.collection.getIndexes/)

```js
db.<collection>.getIndexes()
```

#### 创建索引

[db.collection.createIndex() — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#mongodb-method-db.collection.createIndex)

[db.collection.createIndexes() — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/db.collection.createIndexes/)

- `keys` : 需要创建索引的字段, 是一个 `文档` , 包含需要创建索引的字段名称和排序顺序
  - `order` : `1` 为升序排序, `-1` 为降序排序
- `keyPatterns` : 需要创建索引的字段, 是一个 `数组` , 包含数个 `keys`
- `options` : 索引额外配置

```js
db.<collection>.createIndex(
  {
    <field>: <order>
  },
  <options>
)

db.<collection>.createIndexes(
	<keyPatterns>,
  <options>
)
```



### 查看是否使用了索引

[db.collection.explain() — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/db.collection.explain/)

```js
db.<collection>.explain().<method()>
```

- 查看 `winningPlan` -> `stage` 中的取值来判断是否使用了索引
  - `COLLSCAN` : 遍历整个集合的查询, 没有使用索引
  - `IXSCAN` : 通过索引查询
  - `FETCH` : 通过索引存储的地址取出对应的文档



### 复合索引

[Compound Indexes — MongoDB Manual](https://docs.mongodb.com/manual/core/index-compound/)

- 将多个字段的值作为索引

```js
db.<collection>.createIndexes(
	[
  	{ <field>: <order>, <field>: <order> } // 在创建索引时指定多个字段就是符合索引
  ],
  <options>
)
```

注意点

- 只支持前缀查询
  - 比如使用了字段 `A, B, C` 创建了复合索引, 那么在查询时
    - 查询字段 `A, B, C` / `A, B` / `A, C` / `A` 会使用索引查询
    - 查询字段 `B, C` / `B` / `C` 不会使用索引查询



### 多键索引

[Multikey Indexes — MongoDB Manual](https://docs.mongodb.com/manual/core/index-multikey/)

- 专门针对 `数组` 字段
- 会为 `数组` 字段的每个元素都创建一个索引

```js
db.<collection>.createIndexes(
	[
  	{ <arrayField>: <order> } // 在创建索引时指定数组字段, 创建的就是多键索引
  ],
  <options>
)
```



### 索引对排序的影响

- 如果排序的字段正好是索引的字段, 那么会大大提升排序效率
  - 默认情况下如果排序的字段不是索引字段, 那么是在执行的时候再去排序, 然后再输出
  - 如果排序的字段正好是索引字段, 那么在执行的时候直接根据索引取出对应的文档即可
- 如果是 `复合索引` , 那么只有在排序的字段是 `前缀索引` 的情况才会使用索引, 才会使用索引来排序



### 索引额外配置

#### 唯一索引

[Unique Indexes — MongoDB Manual](https://docs.mongodb.com/manual/core/index-unique/#std-label-index-type-unique)

- 只要某个字段的取值是唯一的, 那么就可以手动给这个字段添加 `唯一索引`
- 默认情况下`MongoDB` 自动给 `主键` 添加的索引就是 `唯一索引`
- 添加 `唯一索引` 之后, 这个字段的取值就一定不能重复
- 添加其他数据时, 若不包含 `唯一索引` 的字段, 那么第一次会成功并且用 `null` 填充, 之后都会失败
- 给 `复合索引` 添加唯一性之后, `复合索引` 的取值就一定不能重复

```js
db.<collection>.createIndexes(
	[
  	{ <field>: <order> }
  ],
  {
  	unique: true // 唯一索引
  }
)
```

#### 稀疏索引

[Sparse Indexes — MongoDB Manual](https://docs.mongodb.com/manual/core/index-sparse/)

- 默认情况下会给每一个文档都创建索引
- `稀疏索引` 只会为存在索引字段, 并且取值不为 `null` 的文档创建索引
- 可以优化索引占用的存储空间
- `唯一索引` 配合 `稀疏索引` 可以让缺少索引字段的相同数据被多次添加

```js
db.<collection>.createIndexes(
	[
  	{ <field>: <order> }
  ],
  {
  	sparse: true // 稀疏索引
  }
)
```

#### 日期索引

[TTL Indexes — MongoDB Manual](https://docs.mongodb.com/manual/core/index-ttl/)

- 专门用于处理 `日期` 字段或包含 `日期` 的 `数组` 字段
- 可以在创建索引的时候, 指定索引的 `生存时间`
- 一旦索引超过了指定的生存时间, 那么会被 `MongoDB` 自动删除
- `数组` 字段中会选取最早的一个日期来进行计算
- `MongoDB` 无法保证及时性, 就是不一定会精准的在指定时间删除, 但是一定会在之后的某个时间删除
- 只能给 `单值索引` / `多键索引` 设置 `生存时间` , `复合索引` 不可以使用

```js
db.<collection>.createIndexes(
	[
  	{ <dateField>: <order> }
  ],
  {
  	expireAfterSeconds: 5 // 5秒后删除
  }
)
```



### 删除索引

[db.collection.dropIndex() — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/db.collection.dropIndex/)

[db.collection.dropIndexes() — MongoDB Manual](https://docs.mongodb.com/manual/reference/method/db.collection.dropIndexes/)

- 在 `MongoDB` 中没有修改索引的方法, 想要修改必须先删除再添加
- 可以使用 `索引名称` 或创建索引时的定义来删除
- 使用 `索引定义` 删除 `复合索引` 时, 必须要一模一样 (包括顺序) 才能删除

```js
db.<collection>.dropIndexes(
	[
    <indexName | indexDefine>
  ]
)
```

---

## 文档之间的关系

- `MongoDB` 对于 `文档` 的格式并没有强制性要求, 但是仍然可以在 `文档` 中表达数据之间的关系
- 在 `MongoDB` 中文档之间的关系可以分为
  - `内嵌式结构` : 在一个 `文档` 中包含了另一个 `文档`
  - `规范式结构` : 将 `文档` 存储在不同的 `集合` 中, 然后通过某一个字段来建立 `文档` 之间的关系



### 一对一

`内嵌式结构` 的表达

- 优势
  - 一次查询就能得到所有数据
- 劣势
  - 如果数据比较复杂, 不方便管理和更新
- 应用场景
  - 数据不复杂 / 查询频率比较高的数据

```js
{
  name: 'zs',
  age: 18,
  card: {
    num: '1234567890123456',
    date: '2022-12-08'
  }
}
```

`规范式结构` 的表达

- 优势
  - 数据比较复杂时, 方便管理和更新
- 劣势
  - 查询数据相对于 `内嵌式结构` 稍微有一点复杂
- 应用场景
  - 数据比较复杂 / 更新频率比较高的数据
- 可以使用 `$lookup` 聚合操作查询

```js
// 集合persons
{
  _id: 456,
  name: 'zs',
  age: 18,
  cardId: 123
}

// 集合cards
{
  _id: 123,
  num: '1234567890123456',
  date: '2022-12-08',
  userId: 456
}
```



### 一对多

`内嵌式结构` 的表达

- 优势
  - 一次查询就能得到所有数据
- 劣势
  - 冗余数据较多, 不方便管理和更新
- 应用场景
  - 数据不复杂 / 查询频率比较高的数据

```js
{
  name: 'zs',
  age: 18,
  books: [
    {
      name: 'HTML',
      price: 88
    }, {
      name: 'CSS',
      price: 88
    }
  ]
}
```

`规范式结构` 的表达

- 优势
  - 冗余数据较少, 方便管理和更新
- 劣势
  - 查询数据相对于 `内嵌式结构` 稍微有一点复杂
- 应用场景
  - 数据比较复杂 / 更新频率比较高的数据
- 可以使用 `$lookup` 聚合操作查询

```js
// 集合persons
{
  _id: 123,
  name: 'ls',
  age: 20,
  booksId: [1, 2]
}

// 集合books
{
  _id: 1,
  name: 'HTML',
  price: 88,
  userId: 123
}
{
  _id: 2,
  name: 'CSS',
  price: 88,
  userId: 123
}
```



### 多对多

`内嵌式结构` 的表达

- 优势
  - 一次查询就能得到所有数据
- 劣势
  - 冗余数据较多, 不方便管理和更新
- 应用场景
  - 数据不复杂 / 查询频率比较高的数据

```js
// 集合students
{
  name: 'zs',
  teachers: [
    { name: 'it666' },
    { name: 'itzb' }
  ]
}
{
  name: 'ls',
  teachers: [
    { name: 'it666' },
    { name: 'itzb' }
  ]
}

// 集合teachers
{
  name: 'it666',
  students: [
    { name: 'zs' },
    { name: 'ls' }
  ]
}
{
  name: 'itzb',
  students: [
    { name: 'zs' },
    { name: 'ls' }
  ]
}
```

`规范式结构` 的表达

- 优势
  - 冗余数据较少, 方便管理和更新
- 劣势
  - 查询数据相对于 `内嵌式结构` 稍微有一点复杂
- 应用场景
  - 数据比较复杂 / 更新频率比较高的数据
- 可以使用 `$lookup` 聚合操作查询

```js
// 集合students
{
  _id: 1,
  name: 'zs'
}
{
  _id: 2,
  name: 'ls'
}

// 集合teachers
{
  _id: 3,
  name: 'it666'
}
{
  _id: 4,
  name: 'itzb'
}

// 关系 (中间表)
{
  stuId: 1,
  teacherId: 3
}
{
  stuId: 1,
  teacherId: 4
}
{
  stuId: 2,
  teacherId: 3
}
{
  stuId: 2,
  teacherId: 4
}
```



### 树形结构

- 除开 `内嵌式结构` / `规范式结构` 之外的另一种表达数据之间关系的方式
- 对于经常需要查询子节点的数据, 添加 `parent` 属性

```js
// 要查看非关系型数据库有几种类型, 使用 db.<collection>.find({ parent: 'No-Relational' }) 即可
{ name: 'Database', parent: 'null' }
{ name: 'No-Relational', parent: 'Database' }
{ name: 'Document', parent: 'No-Relational' }
{ name: 'MongoDB', parent: 'Document' }
{ name: 'Key-Value', parent: 'No-Relational' }
{ name: 'Redis', parent: 'Key-Value' }
```

- 对于经常需要查询父节点的数据, 添加 `children` 属性

```js
// 要查看MongoDB是什么类型的数据库, 使用 db.<collection>.find({ children: { $in: ['MongoDB'] } }) 即可
{ name: 'Database', children: ['Relational', 'No-Relational'] }
{ name: 'No-Relational', children: ['Key-Value', 'Document'] }
{ name: 'Document', children: ['MongoDB'] }
{ name: 'MongoDB', children: [] }
```

- 对于经常查询祖先或后代节点的数据, 添加 `ancestors` 属性

```js
// 若要查询MongoDB的祖先, 使用 db.<collection>.find({ name: 'MongoDB' })
// 若要查询Database的后代, 使用 db.<collection>.find({ ancestors: { $in: ['Database'] } })
{ name: 'Database', ancestors: [] }
{ name: 'No-Relational', ancestors: ['Database'] }
{ name: 'Document', ancestors: ['Database', 'No-Relational'] }
{ name: 'MongoDB', ancestors: ['Database', 'No-Relational', 'Document'] }
```

- 结合 `DFS` / `BFS` 算法来实现树形结构

---

## 复制集 (Replication)

[Replication — MongoDB Manual](https://docs.mongodb.com/manual/replication/)

[MongoDB Clusters | MongoDB](https://www.mongodb.com/basics/clusters)

- 将多台保存了相同内容的 `MongoDB` 服务器组成一个 `集群`
- 集群中的每一台 `MongoDB` 服务器称之为一个 `节点`
- 一般有 `奇数` 个节点, 且最少需要 `3` 个节点 (为了选举)



### 解决的问题

- 所有数据都存储在一台 `MongoDB` 服务器的弊端
  - 不具备高可用性
  - 不具备数据安全性
  - 不能对数据进行分流

- 高可用性

  - 如果所有用户都从同一台MongoDB服务器上读写数据, 那么如果这台MongoDB服务器宕机了, 用户就不能进行读写了

  - 如果我们有多台MongoDB服务器, 并且每台服务器中存储的内容都相同, 那么即使有一台服务器宕机了, 用户依然可以进行读写数据, 因为用户还可以继续使用其它保存了相同内容的服务器

- 数据安全性

  - 如果所有数据都保存在同一台MongoDB服务器上, 那么如果这台MongoDB服务器坏了, 那么很有可能会导致数据丢失

  - 如果我们有多台MongoDB服务器, 并且每台服务器中存储的内容都相同, 那么即使有一台服务器坏了, 那么依然不会导致数据丢失, 因为我们还有其它保存了相同内容的服务器

- 数据分流

  - 如果所有用户都从同一台MongoDB服务器上读写数据, 那么由于服务器的性能限制和网络传输速度的限制, 会导致同一时刻用户量较多时, 服务器负荷增大, 数据处理速度变慢的问题, 会导致由于用户距离服务器较远, 网络传输时间变长, 响应速度变慢的问题

  - 如果我们有多台MongoDB服务器, 并且每台服务器中存储的内容都相同, 并且安放到了不同的地区, 那么我们可以采用就近原则返回数据, 提升网络的传输速度, 那么我们可以采用请求分流, 降低每台服务器负荷, 提升数据处理速度



### 特点

- 复制集中最多只能有50个 `节点` (即50台保存了相同内容的 `MongoDB` 的服务器)
  - 由于节点之间会互相发送 `心跳请求` , 会消耗性能, 所以不是节点越多越好

- 复制集中必须有一个 `主节点` (PRIMARY)
  - 主要负责数据的写入和读取
  - 在复制集中唯一一个可以写入数据的节点
- 除了 `主节点` 以外的节点称之为 `副节点` (SECONDARY)
  - `副节点` 只能读取数据, 不能写入数据
- 节点之间默认每隔 `2` 秒就会相互发送 `心跳请求`
  - 目的是相互检查节点的健康程度 (是否发生故障)
  - 默认情况下频率为 `2` 秒一次
  - 默认情况下如果 `10` 秒没有收到某一个节点的心跳请求, 系统就会认定为超时
- 如果 `主节点` 的 `心跳请求` 超时了 (宕机等) , 那么 `副节点` 就会自动发起投票, 重新选举 `主节点`
  - 避免没有 `主节点` 不能写入数据的情况



### 选举

触发条件

- 一旦发现 `主节点` 没有响应 `心跳请求` , 那么 `副节点` 就会认为 `主节点` 无了, 那么任意一个 `副节点` 都可以发起选举
- 初始化 `复制集` 时
- 有新 `节点` 加入时

规则

- 发起选举的 `副节点` 称之为 `候选节点` , 每一个节点内部有一个 `选举计数器`
- `候选节点` 会先给自己投一票, 然后将自己的票数随着 `选举请求` 依次发送给其他所有 `副节点`
- 其他 `副节点` 收到 `选举请求` 之后, 会先利用 `选举请求` 中的计数器的值更新自己的值
- 更新完计数器的值后, 会对比自己保存的数据和 `候选节点` 保存的数据谁比较完整
  - 若自己的数据比 `候选节点` 的数据完整, 那么就会投出 `反对票`
  - 若自己的数据没有 `候选节点` 的数据完整, 那么就会投出 `同意票`
- 所有的 `副节点` 都投票完成之后
  - 如果超过半数 (大于) 同意, 那么 `候选节点` 就会变为 `主节点`
  - 如果不足半数 (小于等于) 同意, 那么其他 `副节点` 就会再次发起选举, 重复上述过程, 直到有一个节点成为 `主节点` 为止

注意点

- 如果某些没有返回投票结果, 那么默认为反对票
  - 挂掉的节点无法返回投票结果

- 在 `复制集` 中, 能够参与投票的节点最多只能有 `7` 个
- 由于需要超过半数同意才能成为 `主节点` , 所以 `复制集` 创建时最少需要 `3 ` 个节点, 并且一般为 `奇数` 个节点



### 同步

定义

- 用于保证节点之间的数据是同步的

初始化同步

- 将一个新的节点加入到 `复制集` 中时, 就会自动进行 `初始化同步`
- 将 `主节点` 中所有的 `数据库` / `集合` / `文档` / `索引` 都拷贝一份给新加入的节点
- 由于拷贝需要时间, 所以无法完全保证自己的数据和 `主节点` 完全相同

同步写库记录

- 在每一个节点中都有一个 `local` 数据库, 其中有一个 `oplog` 集合, 保存了当前服务器的所有操作
- 执行完 `初始化同步` 之后, `副节点` 会定期的同步 `写库记录` 到自己的 `local` 数据库中, 并执行 `写库记录` 
- 可以保证自己的数据和 `主节点` 高度一致 



### 投票节点

定义

- 不保存任何数据, 只参与投票的节点
- 由于不需要进行 `同步` , 可以提升服务器的性能
- 保证不会出现 `副节点` 过少, 无法完成投票的问题



### 搭建

1. 在安装目录下新建 `data` / `conf` / `log` 文件夹

2. 在 `conf` 文件夹下新建 `mongo.config` 文件

3. 在 `mongo.config` 文件中配置

   - 保存数据的地址

   - 保存日志文件的地址

   - 端口号

```
# Where and how to store data.
storage:
  dbPath: D:\Developer\MongoDB666\mongodb27020\data
  journal:
    enabled: true
# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path:  D:\Developer\MongoDB666\mongodb27020\log\mongo.log
# network interfaces
net:
  port: 27020
  bindIp: 127.0.0.1
```

4. 注册服务

```shell
mongod --config path\to\mongo.config --serviceName "serviceName" --serviceDisplayName "serviceDisplayName" --replSet "replSetName" --install
```

5. 手动启动服务
6. 测试连接

```shell
mongo --host host --port port
```

7. 初始化复制集
   - `_id` : (整数) 节点唯一表示
   - `host` : (字符串) 节点的 `IP` 地址, 包含 `端口号`
   - `arbiterOnly` : (布尔值) 是否为 `投票节点` , 默认为 `false`
   - `priority` : (整数) 选举为主节点的权值, 默认为 `1` , 取值范围 `0 ~ 1000`
   - `hidden` : (布尔值) 是否隐藏, 默认为 `false`
   - `votes` : (整数) 投票数, 默认为 `1` , 取值范围 `0 ~ 1` , `投票节点` 相关参数
   - `slaveDelay` : (整数) 延时复制, 单位为 `s` , `延时节点` 相关参数

```js
rs.initiate({
  _id :  "rs0",
  members: [
    { _id: 0, host: "mongodb0.example.net:27017" },
    { _id: 1, host: "mongodb1.example.net:27017" },
    { _id: 2, host: "mongodb2.example.net:27017" }
  ]
})
```

8. 使用 `rs.status()` 确认 `主节点`
9. 在 `副节点` 中调用 `rs.slaveOk()` 来启用读取权限

---

## 分片 (Sharding)

[Sharding — MongoDB Manual](https://docs.mongodb.com/manual/sharding/)

- 将数据库集合中的数据拆分成多份, `分布式` 的保存到多台电脑上
  - 不同电脑保存了不同数据, 大大提升了服务器容量

- 用于增加服务器容量

- 并不是所有数据库的集合都需要使用 `分片`
  - 对于不使用 `分片` 的集合会统一保存到 `主分片` 中
- 每个数据库都有一个 `主分片` , 保存那些不需要 `分片` 的集合数据
- 在创建数据库的时候, 系统会自动选择存储内容最少的 `分片` 作为 `主分片`



### 结构

- `分片服务器` : 用于存储不同数据的 `MongoDB` 服务器
- `配置服务器` : 用于存储 `分片服务器` 存储数据的范围
  - 只有有了范围, 将来才能确定如何存储和查询数据
- `路由服务器` : 一般称作 `mongos` , 用于负责分发用户请求



### 路由分发 / 用户存储查询数据流程

1. 用户将请求发送到 `路由服务器`

2. `路由服务器` 去 `配置服务器` 查询数据范围

3. 根据查询的结果到对应的 `分片服务器` 上进行处理

   - 若操作位 `存储` , 则直接存储到对应的 `分片服务器` 中, 并返回存储结果

   - 若操作为 `查询` , 则拿到对应的数据, 并返回给用户



### 片键 (Shard Key)

定义

1. 可以将 `文档` 的一个或多个 `字段` 设置为 `分片片键`
2. 设置完 `分片片键` 之后, `MongoDB` 会自动对字段可能的取值进行划分, 划分出一个个 `数据段`
3. 划分完 `数据段` 之后, `MongoDB` 会自动决定哪些 `分片服务器` 保存哪些 `数据段` 对应的数据

注意点

- `片键` 可以是一个或多个字段
- 只有 `索引` 字段才能设置为 `片键`
- `分片服务器` 保存哪些 `数据段` 的值是随机的, 并不是连续的
- `数据段` 的划分可以使用 `片键` 的取值, 也可以使用 `片键` 取值的 `哈希值`
- <span style="color: #ff0;">`片键` 一旦选择就不能更改, 所以选择时一定要再三权衡</span>

选择规则

- 选择取值范围 `更广` 的字段
  - 如果取值范围太小, 那么划分出来的数据段就太少, 分配到不同服务器的概率就越小
  - 比如将 `布尔值` 作为取值的字段就只能划分出 `2` 个数据段, 不太好
- 选择取值分配 `更平衡` 的字段
  - 如果取值范围不平衡, 就会导致某一个数据段的数据太多, 某一台 `分片服务器` 压力过大
  - 比如将 `age` 作为 `片键` , 但是如果用户 90% 都集中在 `20 ~ 30` 岁, 那么保存这些数据的服务器压力就会过大
- 不选择单向增加 / 减少的字段
  - 可能会出现最小值 / 最大值数据段保存的数据过多, 导致对应的 `分片服务器` 压力过大

选择技巧

- 使用 `复合片键` 解决 `片键` 字段取值 `不够广` , `不够平衡` 的问题
- 使用 `片键` 字段的 `哈希值` 解决 `片键` 字段取值是单向增加 / 减少的问题





















