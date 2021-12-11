# MySQL



> [MySQL](https://www.mysql.com/)



## 定义



### 数据库

定义

- 存储数据的仓库
- 本质上是一个 `文件`

发展

- 第一代数据库
  - `层次模型` 数据库
    - 代表: `IBM` 公司的 `IMS` (Information Management System)
    - 类似于 `HTML` 结构
    - 通过树状结构来保存管理数据
    - 只有 `根节点` 没有 `父节点`
    - 其它节点只能有一个 `父节点`
    - 所有 `子节点` 不能脱离 `父节点` 单独存在
  - `网状模型` 数据库 (层次模型的升级版)
    - 代表: `HP` 公司的 `IMAGE` 等
- 第二代数据库
  - `关系型` 数据库 (Relational Database)
    - 代表: `SQL Server` / `Oracle` / `MySQL`
    - 数据库中有很多的 `表`
    - 每张 `表` 都是用来存储数据的
    - 每个表相互独立
    - 表与表之间通过 `公共字段` 来建立关系
    - 多表查询效率低
  - `非关系型` 数据库 (NoSQL Database)
    - 代表: `Redis` / `MongoDB`
    - 解决了 `关系型` 数据库多表查询效率低下的问题



### MySQL

- 由瑞典 `MySQL AB` 公司开发的 `关系型` 数据库 (Relational Database)
- 目前数据 `Oracle` 旗下产品
- 开源免费
- 默认端口为 `3306`
- MySQL中可以有 `0~N` 个数据库, 数据库中可以有 `0~N` 个表, 表中可以有 `0~N` 个数据



### SQL

- 结构化查询语言 (Structured Query Language)
- 专门用于操作 `关系型` 数据库的一门语言
- `关系型` 数据库通用的操作语言
- 各大厂商都会在标准的 `SQL` 基础上扩展一些自己的东西
  - `SQL Server` : 使用 `T-SQL` 语言
  - `Oracle` : 使用 `PL/SQL` 语言
  - `MySQL` : 使用 `MySQL` 语言
- `SQL` 语句功能划分
  - `DDL` : 数据定义语言, 用来定义数据库对象, 创建库, 表, 列等等
  - `DML` : 数据操作语言, 用来操作数据库表中的记录
  - `DQL` : 数据查询语言, 用来查询数据
  - `DCL` : 数据控制语言, 用来定义访问权限和安全级别
- 数据类型 [MySQL :: MySQL 8.0 Reference Manual :: 11 Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
  - 大致可以分为 `数值` / `字符串` / `日期和时间` 三大类

---

## 安装

[MySQL :: Download MySQL Installer](https://dev.mysql.com/downloads/installer/)

- 安装完毕之后需要设置环境变量才能在 `Terminal` 中使用 `mysql`

---

## 基本使用



### 链接MySQL服务器

```shell
mysql -h 127.0.0.7 -u root -p
```

- `-h` : 服务器地址 (默认为 `localhost` ) (安装到本地的情况下可以省略)
- `-P` : 服务器端口 (默认为 `3306` ) (端口没有改变的情况下可以省略)
- `-u` : 用户名
- `-p` : 是否需要密码
- 看到 `Welcome to the MySQL monitor.` 即代表链接成功



### 断开链接

- `exit` / `quit` / `\q`



### 数据库 (Database)

查看所有数据库

- 一定要以 `;` 结尾

```mysql
show databases;
```

默认创建的数据库

- `information_schema` : 保存关于MySQL服务器所维护的所有其他数据库的信息, 比如数据库名, 数据库表, 表栏的数据类型与访问权限等等, <span style="color: #ff0;">一般不会修改</span>
- `mysql` : MySQL系统数据库, 保存了登录用户名, 密码, 以及每个用户的权限等等, <span style="color: #ff0;">一般不会修改</span>
- `performance_schema` : 保存数据库服务器性能的参数, <span style="color: #ff0;">有时需要修改</span>
- `sys` : 通过视图的形式把 `information_schema` 和 `performance_schema` 结合起来, 展示出更加令人容易理解的数据, <span style="color: #ff0;">一般不会修改</span>

---

## 数据库增删改查 (Database CRUD)









