# MongoDB - NodeJS



## 概念

- 在 `NodeJS` 中可以借助第三方库来连接 `MongoDB` 服务器, 给 `MongoDB` 服务器发送指令
- 使用 `Mongoose` 配合 `mongodb` 来进行操作

---

# Mongoose

[Mongoose ODM v6.1.6](https://mongoosejs.com/)

[mongoose - npm](https://www.npmjs.com/package/mongoose)

- 在 `NodeJS` 中使用的 `ODM` (对象文档映射) 库



## ODM (对象文档映射)

定义

- 全称是 Object-Document Mapping

映射

- 在 `Mongoose` 中
- JavaScript中的一个 `类` ( `Mongoose` 中的 `模型` ) 就对应数据库中的一个 `集合`
- JavaScript中的一个 `对象` 就对应集合中的一个 `文档`
- JavaScript中的 `对象` 的 `属性` 就对应 `文档` 的一个 `字段`

---

## 基本使用



### 连接数据库

- `test` 是要连接的数据库的名称

```js
import mongoose from 'mongoose'

await mongoose.connect('mongodb://127.0.0.1:27017/test')
```



### 定义集合中存储数据的规则

[Mongoose v6.1.6: Schemas](https://mongoosejs.com/docs/guide.html)

[Mongoose v6.1.6: SchemaTypes](https://mongoosejs.com/docs/schematypes.html)

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
})
```



### 创建集合

[Mongoose v6.1.6: Model - API](https://mongoosejs.com/docs/api/model.html)

- 只要通过 `mongoose.model` 方法创建了集合, 那么以后就可以使用其返回值 ( `Model` ) 来操作这个集合

```js
const User = mongoose.model('User', userSchema, 'User') // 第三个参数为集合名称, 默认是第一个参数 (模型名称) 的复数
```



### 创建文档

- 要将文档保存到 `MongoDB` 需要调用 `save()` 方法

```js
const user = new User({ name: 'zs', age: 18 })
```

---

## 数据

[Mongoose v6.1.6: Model - API](https://mongoosejs.com/docs/api/model.html)

[Mongoose v6.1.6: Document - API](https://mongoosejs.com/docs/api/document.html)



### 增加

- 第一种方式是定义完文档之后调用 `save()`

```js
await user.save() // 将文档保存到MongoDB
```

- 第二种方式是使用 `Model.create()` 方法, 相当于调用了 `new Model()` 以及 `save()`
  - `docs` : 是需要添加的文档, 可以是单个文档也可以是一个 `数组`
  - `options` (Optional) : 传给 `save()` 方法的额外配置
  - `返回值` : 被添加的文档

```js
await User.create([
  { name: 'zs', age: 18 },
  { name: 'ls', age: 22 },
  { name: 'ww', age: 21 },
  { name: 'zl', age: 23 }
])
```



### 查询

- 使用 `find` 打头的方法
  - `filter` : 过滤条件
  - `projection` (Optional) : 投影
  - `options` (Optional) : 额外配置
  - `返回值` 
    - 理论上: 一个 `Query` , 需要调用 `exec()` 来执行 (其实好像不调用也可以, 没什么区别)
    - 实际上: 查询到的结果

```js
// 调不调用 exec() 似乎没什么区别
const res = await User.find({ name: 'zs' }, '-_id name age', { skip: 0, limit: 5 })
const res = await User.find({ name: 'zs' }, '-_id name age', { skip: 0, limit: 5 }).exec()
```



### 修改

- 使用 `Model.updateOne()` / `Model.updateMany()` 方法
  - `filter` : 过滤条件
  - `update` : 更新内容 (不指定操作符的情况下, 默认会被包裹在 `$set` 操作符中)
  - `options` (Optional) : 额外配置
  - `返回值` : 更新的结果

```js
await User.updateMany({ name: 'ls' }, { $set: { age: 888 } })
```



### 删除

- 使用 `Model.deleteOne()` / `Model.deleteMany()` 方法
  - `conditions` : 删除条件
  - `options` (Optional) : 额外配置
  - `返回值` : 删除的结果

```js
await User.deleteMany({ name: 'ww' })
```

