# MySQL - NodeJS



## 概念

- 在 `NodeJS` 中可以借助第三方库来连接 `MySQL` 服务器, 给 `MySQL` 服务器发送指令
- 使用 `sequelize` 配合 `mysql2` 来进行操作

---

## mysql2

[mysql2 - npm](https://www.npmjs.com/package/mysql2)

https://github.com/sidorares/node-mysql2

定义

- 用于操作 `MySQL` 数据库

---

## sequelize

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



### ORM (对象关系映射)

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



### 连接数据库

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



### 创建表

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
  // tableName: 'student',
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

































