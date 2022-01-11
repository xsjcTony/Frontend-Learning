# MySQL - NodeJS



## 概念

- 在 `NodeJS` 中可以借助第三方库来连接 `MySQL` 服务器, 给 `MySQL` 服务器发送指令
- 使用 `sequelize` 配合 `mysql2` 来进行操作

---

# mysql2

[mysql2 - npm](https://www.npmjs.com/package/mysql2)

https://github.com/sidorares/node-mysql2

定义

- 用于操作 `MySQL` 数据库

---

# sequelize

[sequelize - npm](https://www.npmjs.com/package/sequelize)

[Sequelize | Sequelize ORM](https://sequelize.org/)

[demopark/sequelize-docs-Zh-CN: Sequelize 文档的中文版本: v4.42.0 | v5.21.5 | v6.6.5](https://github.com/demopark/sequelize-docs-Zh-CN/tree/master)

- 一款基于 `Promise` 的 `NodeJS` 的 `ORM` (对象关系映射) 模块
- 可以用于 `Postgres` / `MySQL` / `MariaDB` / `SQLite` / `DB2` / `Microsoft SQL Server` , 但需要安装对应的 `包`

```shell
$ npm i sequelize # This will install v6

# And one of the following:
$ npm i pg pg-hstore # Postgres
$ npm i mysql2
$ npm i mariadb
$ npm i sqlite3
$ npm i tedious # Microsoft SQL Server
$ npm i ibm_db #DB2
```



## ORM (对象关系映射)

定义

- 全称是 Object-Relational Mapping
- 可以把 `JavaScript` 中的类和对象, 与 `数据库` 中的表和数据进行 `关系映射`
- 映射之后就可以直接通过类和对象来操作表和数据, 不用编写 `SQL` 语句
- 解决了在 `NodeJS` 中编写 `SQL` 不够直观, 不够高效, 容易出错等问题

映射

- 在 `Sequelize` 中
- JavaScript中的一个 `类` ( `Sequelize` 中的 `模型` ) 就对应数据库中的一张 `表`
- JavaScript中的一个 `对象` 就对应表中的一条 `数据`
- JavaScript中的一个 `对象` 的 `属性` 就对应一条 `数据` 中的一个 `字段`

---

## 连接数据库

```js
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('d', 'username', 'password', {
  host: '127.0.0.1', // 服务器地址
  dialect: 'mysql', // 数据库类型
  port: 3306, // 端口号
  pool: { // 连接池
    max: 5, // 最大连接数量
    min: 0, // 最小连接数量
    idle: 10000, // 客户端多久没有使用连接就断开, 单位ms
    acquire: 30000 // 多久没有拿到可用的连接之后报错, 单位ms
  }
})

await sequelize.authenticate() // 测试连接是否成功, 若没有成功会报错, 可以使用 try catch 捕获
console.log('success')
```

---

## 创建表

[Sequelize - sequelize.define() | Sequelize](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-define)

[Model - Model.init() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init)

- 创建表在 `Sequelize` 中的体现就是创建一个 `Model`
- 可以通过 `Sequelize.define()` 或新建一个 `类 extends Model` 并调用 `类.init()` 来实现, 两者等价
- 定义完 `Model` 之后, 需要调用 `sequelize.sync()` (实例方法) 来将所有的 `Model` 同步至 `数据库`

```js
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(/* ... */) // 连接数据库

const User = sequelize.define('User', { // Model 名称为 User
  id: { // 字段名称
    type: DataTypes.INTEGER.UNSIGNED, // 无符号整数
    primaryKey: true, // 是 primary key
    autoIncrement: true // 是 auto_increment
  },
  name: { // 字段名称
    type: DataTypes.STRING, // varchar(255)
    unique: true, // 是 unique
    allowNull: false // 允许 unll 值
  },
  age: { // 字段名称
    type: DataTypes.TINYINT.UNSIGNED, // 无符号的 tinyint
    defaultValue: 24 // 默认值
  },
  gender: { // 字段名称
    type: DataTypes.ENUM('male', 'female', 'unisex'), // enum 类型, 允许这三个值
    defaultValue: 'unisex' // 默认值
  }
}, {
  freezeTableName: true, // 不需要自动修改表的名称, 直接使用 Model 的名称
  // tableName: 'student', // 指定表的名称, freezeTableName会失效
  timestamps: false, // 不需要自动添加 createdAt 和 updatedAt 字段
  indexes: [ // 索引
    {
      name: 'age', // 索引名称
      fields: ['age'] // 索引字段
    }
  ]
})

sequelize.models.User // 可以通过这个访问该 Model
console.log(User === sequelize.models.User) // true, 二者等价

await sequelize.sync() // 将 Model 同步到数据库
```

---

## 数据



### 添加

[Model - Model.build() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-build)

[Model - row.save() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#instance-method-save)

[Model - Model.create() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-create)

- 利用 `Model.build()` 方法来建立一个 `Model` 的实例对象, 映射到数据库中表的一行
- <span style="color: #f90;">虽然是 `实例` , 但是不要用 `new` 来创建</span>
- 创建完后使用实例方法 `row.save()` 来验证该数据并将其保存到数据库, 注意这个方法是 `异步` 的
- <span style="color: #0ff;">可以使用 `Model.create()` 方法来合并 `build` 和 `save` , 是 `异步` 的</span>
- 查看创建好的实例建议使用 `row.toJSON()`

```js
// create data in table `user`
const tony = await User.create({ // create = build + save
  name: 'Tony',
  age: 24,
  gender: 'male'
})

console.log(tony.toJSON())
```



### 查询

- 使用 `Model.findxxx` 方法实现, 有很多
- `异步` 方法
- 若找到了, 使用 `toJSON()` 查看 `对象`
- 若没找到, 返回 `null`

```js
// find data
const res = await User.findByPk(3)
console.log(res?.toJSON())
```



### 修改

[Model - data.set() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#instance-method-set)

[Model - row.save() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#instance-method-save)

[Model - data.update() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#instance-method-update)

[Model - Model.update() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-update)

- `异步` 方法
- 有三种方法可以修改
  - 需要先通过 `查询数据` 获取到需要修改的数据的 `对象`
    - 先通过直接赋值对象键的方式 / 利用 `data.set()` 方法修改数据后, 使用 `data.save()` 提交
    - 利用 `data.update()` 方法通过键值对的方式更新 , 等于 `set` + `save`
  - 通过 `Model.update()` 方法来更新数据, 利用 `where` , 无需先获取到需要修改的数据的 `对象`
    - 不指定 `where` 就会修改表中所有数据

```js
// modify data
await User.update({
  name: 'zs'
}, {
  where: {
    id: 2
  }
})
```



### 删除

[Model - Model.destroy() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-destroy)

[Model - data.destroy() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#instance-method-destroy)

- `异步` 方法
  - 使用 `Model.destory()` 来删除多个实例, 通过 `where` 来过滤
  - 使用 `data.destory()` 来删除实例

```js
// delete data
await User.destroy({
  where: {
    id: 1
  }
})
```

---

## 高级查询



### 条件查询

[Model - Model.findAll() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll)

- 使用 `Model.findAll()` 实现
- 通过 `attributes` 来指定想要获得的字段, 是一个 `数组`
- 通过 `where` 来指定过滤的条件
  - 通过 `Op.xx` 来表示运算符, 键值对默认为 `Op.eq`
  - `where` 的第一层的多个键值对默认为 `Op.and`

```js
// Query
// find multiple instances with fields and conditions
const users = (await User.findAll({
  attributes: ['name', 'age'], // SELECT `name`, `age` from user ...
  where: { // ... where ...
    [Op.or]: { // ... where ... OR ...
      age: {
        [Op.lte]: 22 // ... where `age` <= 22 OR ...
      },
      gender: 'male' // ... where ... OR `gender` = 'male'
    }
  }
})).map(user => user.toJSON())
console.log(users)
```



### 分页 / 排序

[Model - Model.findAll() | Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll)

- 同样使用 `Model.findAll()` 实现
- 通过 `offset` 来指定开始的索引
- 通过 `limit` 来指定返回数据的个数
- 结合 `offset` 和 `limit` 实现分页
- 通过 `order` 来指定排序

```js
// find multiple instance by limit & order by
const users = (await User.findAll({
  offset: 2, // ... LIMIT 2 ...;
  limit: 4, // ... LIMIT ?, 4 ...;
  order: [ // ... ORDER BY age DESC, id DESC ...;
    ['age', 'DESC'],
    ['id', 'DESC']
  ]
})).map(user => user.toJSON())
console.log(users)
```



### 关系查询

[Association | Sequelize](https://sequelize.org/master/class/lib/associations/base.js~Association.html)

- 建立表与表之间的关系之后, 查询时就可以通过在 `options` 中指定 `include` 来一起查出相关的信息
- 在建立关系之后使用 `sequelize.sync()` , 就可以将表之间的关系同步到数据库
- 若在创建表的时候, 已经设置了 `外键` , 那么在使用 `hasOne` 等方法的时候, 不需要指定 `外键`

#### 一对一

- 使用 `hasOne` 和 `belongsTo`

```js
// relational search
// one to one
User.hasOne(Book, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})
const user = await User.findOne({
  where: {
    id: 1
  },
  include: [
    { model: Book }
  ]
})
console.log(user.toJSON())
console.log(user.Book.toJSON())


Book.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})
const book = await Book.findOne({
  where: {
    id: 1
  },
  include: [
    { model: User }
  ]
})
console.log(book.toJSON())
console.log(book.User.toJSON())
```

#### 一对多

- 使用 `hasMany` 和 `belongsTo`

```js
// one to many (one user has many books / one book belongs to one user)
User.hasMany(Book, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})
const user = await User.findOne({
  where: {
    id: 1
  },
  include: [
    { model: Book }
  ]
})
console.log(user.toJSON())
user.Books.forEach((book) => { console.log(book.toJSON()) })

Book.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})
const book = await Book.findOne({
  where: {
    id: 3
  },
  include: [
    { model: User }
  ]
})
console.log(book.toJSON())
console.log(book.User.toJSON())
```

#### 多对多

- 使用 `belongsToMany` (双向)

- 通过 `through` 指定 `关联表` (有两个 `外键` 的关系表) 的名称

```js
// many to many
// create table `student`
const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'student',
  timestamps: false
})

// create table `teacher`
const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'teacher',
  timestamps: false
})

// create relation table `student_teacher_relation`
const StudentTeacherRelation = sequelize.define('StudentTeacherRelation', {}, {
  tableName: 'student_teacher_relation',
  timestamps: false
})

// build many-to-many relationship through
Student.belongsToMany(Teacher, {
  through: StudentTeacherRelation,
  foreignKey: 'student_id' // 指定学生对应的外键名称, 不然会按照默认创建 studentId 列
})
Teacher.belongsToMany(Student, {
  through: StudentTeacherRelation,
  foreignKey: 'teacher_id' // 指定老师对应的外键名称
})

await sequelize.sync()

// queries
const student = await Student.findOne({
  where: {
    id: 1
  },
  include: [
    { model: Teacher }
  ]
})
console.log(student.toJSON())
student.Teachers.forEach((teacher) => { console.log(teacher.toJSON()) })

const teacher = await Teacher.findOne({
  where: {
    id: 1
  },
  include: [
    { model: Student }
  ]
})
console.log(teacher.toJSON())
teacher.Students.forEach((student) => { console.log(student.toJSON()) })
```

---

# sequelize-cli

[sequelize-cli - npm](https://www.npmjs.com/package/sequelize-cli)

[Migrations | Sequelize](https://sequelize.org/master/manual/migrations.html)

- 一款数据库迁移工具, 基于 `sequelize` 
- 能够追踪数据库的变更, 在各个不同版本之间随意切换





## 安装

```shell
npm i -D sequelize-cli
```





## 项目

### 初始化

- 通过 `--help` 查看每个指令的具体使用信息

```shell
npx sequelize init
```



### 结构

- `config` : 数据库配置文件, 用于告诉 `CLI` 如何连接数据库
  - 三个配置 `development` / `test` / `production` 对应三个阶段的不同数据库
- `models` : 数据库模型文件, 用于告诉 `CLI ` 如何创建表
- `migrations` : 数据库迁移文件, 用于记录用户不同版本变更
- `seeders` : 数据库种子文件, 用于编写测试数据



### 创建数据库

- 先根据当前环境来配置 `NODE_ENV`

```shell
set NODE_ENV=development
set NODE_ENV=test
set NODE_ENV=production
```

- 再执行创建数据库的命令, 它会根据当前环境的 `config` 配置来创建数据库

```shell
npx sequelize db:create
```



### 创建表

- 生成一个 `Model` 文件和其相对应的 `migration` 迁移文件

```shell
npx sequelize model:generate --name tableName --attributes fieldName:dataType, ...
```

- 配置好 `Model` 之后运行 `db:migrate` 来提交处于等待状态的 `migrations`

```shell
npx sequelize db:migrate
```

- `sequelizemeta` 这张表存储了以前的状态记录



### 修改表

- 通过 `migration:generate` 创建 `迁移文件`

```shell
npx sequelize migration:generate --name migrationName
```

- 编写修改的内容
  - `up` 方法为执行 `迁移` 的操作
  - `down` 方法为撤销 `迁移` 的操作

```js
// 示例: MySQL中添加/删除一个字段
'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'age', {
      type: Sequelize.TINYINT.UNSIGNED
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'age')
  }
}
```

- 执行迁移

```shell
npx sequelize db:migrate
```



### 回退版本

- 回到上一步

```shell
npx sequelize db:migrate:undo
```

- 回退到初始版本

```shell
npx sequelize db:migrate:undo:all
```

- 回退某一个指定操作

```shell
npx sequelize db:migrate:undo --name XXXXXXXXXXXXXXXXXX-create-XXXX.js
```

- 回退到某个版本 (包括那个版本之后的所有操作)

```shell
npx sequelize db:migrate:undo:all --to XXXXXXXXXXXXXXXXXX-create-XXXX.js
```



### 种子文件

- 专门用于编写测试数据
- 存放于 `seeders` 文件夹下
- `up` 方法用于插入数据
- `down` 方法用于撤销数据
- `种子文件` 的执行不会被保存到 `sequelizemeta` 表中
- 若想保存, 需要添加额外配置

```json
{
  "development": {
    /* ... */
    "seedStorage": "sequelize",
    "seederStorageTableName": "sequelize_seed"
  },
  /* ... */
}
```

#### 创建种子文件

```shell
npx sequelize seed:generate --name seedName
```

#### 执行种子文件

- `种子文件` 需要提前编写好 `up` 方法

```shell
npx sequelize db:seed --seed XXXXXXXXXXXXXXXXXXXXXXX-XXXX.js, ...
```

#### 回退种子文件

- 与 `迁移` 文件基本相同, 只不过把 `migrate` 换成 `seed`

- 回到上一步

```shell
npx sequelize db:seed:undo
```

- 回到初始版本

```shell
npx sequelize db:seed:undo:all
```

- 回退某一些指定操作

```shell
npx sequelize db:seed:undo --seed XXXXXXXX-XXXX.js, ...
```

