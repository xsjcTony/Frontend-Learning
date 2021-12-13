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

- MySQL中任何命令都一定要以 `;` 结尾



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

---

## 编码

- 查看MySQL全局默认的编码

```mysql
show variables like 'character_set_%';
```

- 查看某个特定数据库的编码

```mysql
show create database databaseName;
```

---

## 存储引擎

- `MyISAM` : 安全性低, 不支持事务和外键, 适合频繁插入和查询的应用
  - 创建表时会在对应数据库文件夹中自动创建三个文件
    - `.MYD` : 保存表中的数据
    - `.MYI` : 保存表中相关的索引
    - `.sdi` : 保存表的结构
- `InnoDB` (默认): 安全性高, 支持事务和外键, 适合对安全性, 数据完整性较高的应用
  - 创建表时会在对应数据库文件夹中自动创建一个 `.ibd` 文件, 用于保存表的结构
  - 往 `InnoDB` 的表中存储数据时, 数据会被存储到上级目录的 `ibdata1` 文件中
  - 若数据过多, 则系统会自动创建 `ibdata2` , `ibdata3` 等等
- `Memory` : 将数据存储到内存中, 访问速度极快, 但不会永久存储数据, 适合对读写速度要求较高的应用
  - <span style="color: #f90;">该模式下不能使用 `BLOB` / `TEXT` 数据类型</span>
  - 创建表时会在对应数据库文件夹中自动创建一个 `.sdi` 文件, 用于保存表的结构
  - 表中的数据不会保存到文件中, 而是保存到 `内存` 中

---

## where

定义

- 用于提供特定的条件

支持的运算符

| 运算符              | 意义                                | 示例                                                         |
| ------------------- | ----------------------------------- | ------------------------------------------------------------ |
| =                   | 等于                                |                                                              |
| !=                  | 不等于                              |                                                              |
| <>                  | 不等于                              |                                                              |
| <                   | 小于                                |                                                              |
| <=                  | 小于等于                            |                                                              |
| >                   | 大于                                |                                                              |
| >=                  | 大于等于                            |                                                              |
| IN(set)             | 值在 `set` 中                       | select * from tableName where columnName in (value1, value2); |
| BETWEEN ... AND ... | 值在哪两个范围中间 (区间查询)       | select * from tableName where columnName BETWEEN value1 AND value2; |
| IS NULL             | 为空                                | select * from tableName where columnName IS NULL;            |
| IS NOT NULL         | 不为空                              | select * from tableName where columnName IS NOT NULL;        |
| AND / `&&`          | 与 (相当于 `JavaScript` 中的 `&&` ) |                                                              |
| OR / `||`           | 或 (相当于 `JavaScript` 中的 `||` ) |                                                              |
| NOT                 | 非 (相当于 `JavaScript` 中的 `!` )  |                                                              |



---

## 数据库 (CRUD)



### 基本

MySQL默认创建的数据库

- `information_schema` : 保存关于MySQL服务器所维护的所有其他数据库的信息, 比如数据库名, 数据库表, 表栏的数据类型与访问权限等等, <span style="color: #ff0;">一般不会修改</span>

- `mysql` : MySQL系统数据库, 保存了登录用户名, 密码, 以及每个用户的权限等等, <span style="color: #ff0;">一般不会修改</span>

- `performance_schema` : 保存数据库服务器性能的参数, <span style="color: #ff0;">有时需要修改</span>

- `sys` : 通过视图的形式把 `information_schema` 和 `performance_schema` 结合起来, 展示出更加令人容易理解的数据, <span style="color: #ff0;">一般不会修改</span>



### 创建 (Create)

- 最基础的语句, 如果数据库已存在, 那么就会报错

```mysql
create database databaseName;
create schema databaseName; /* 意义相同 */
```

- `if not exists` : 如果没有就创建, 如果有就跳过 <span style="color: #0ff;">(企业开发中常用)</span>

```mysql
create database if not exists databaseName;
```

- `charset` : 指定存储数据的 `字符集` , 默认为 `utf8mb4` , 如下示例中使用 `utf8mb4`

```mysql
create database if not exists databaseName charset=utf8mb4;
```

- 如果想要将 `关键字` 作为数据库名称, 那么需要用 (``) 反引号包括起来

```mysql
create database if not exists `create` charset=utf8mb4;
```

 

### 删除 (Delete)

- 最基础的语句, 如果要删除的数据库不存在, 那么就会报错

```mysql
drop database databaseName;
```

- `if exists` : 如果数据库存在就删除, 如果不存在就跳过 <span style="color: #0ff;">(企业开发中常用)</span>

```mysql
drop database if exists databaseName;
```



### 修改 (Update)

- 对于 `数据库` , 只能修改它的 `字符集`

```mysql
alter database databaseName charset=utf8mb4;
```



### 查看 (Read)

- 查看所有数据库

```mysql
show databases;
```

- 查看某个数据库

```mysql
show create database databaseName;
```



### 使用 (Use)

```mysql
use databaseName;
```

---

## 表 (Table)



### 查看 (Read)

- 查看某个数据库中所有表 (需要指定数据库之后才能查看)

```mysql
show tables;
```

- 查看某个表中的数据结构

```mysql
desc tableName;
```



### 创建 (Create)

- 添加 `if not exists` 来在已有该名称的表的情况下跳过创建操作, 避免报错

```mysql
create table if not exists tableName (
	column1 dataType,
  column2 dataType,
  /* ... */
);
```

- 指定存储引擎

```mysql
create table if not exists tableName (
	columnName, dataType
) engine=engineName;
```



### 删除 (Delete)

- 添加 `if exists` 来在表不存在的情况下跳过删除操作, 避免报错

```mysql
drop table if exists tableName;
```



### 修改 (Update)

修改表名

```mysql
rename table oldTableName to NewTableName;
```

添加字段 (column)

- 若字段已存在则报错

- 默认情况下新增的字段会被放到最后
- 可以添加 `position` 选项
  - `first` : 放在第一项
  - `after columnName` : 放在某一列之后

```mysql
alter table tableName add columnName dataType;
alter table tableName add columnName dataType first;
alter table tableName add columnName dataType after columnName;
```

删除字段

```mysql
alter table tableName drop columnName;
```

修改字段

- 修改字段数据类型

  ```mysql
  alter table tableName modify columnName newDataType;
  ```

- 修改字段名称以及数据类型

  ```mysql
  alter table tableName change columnName newColumnName newDataType;
  ```

修改存储引擎

```mysql
alter table tableName engine=engineName;
```

---

## 数据 (Data)



### 增删改查 (CRUD)

#### 插入 (Create)

- `字段名称` 和 `值` 必须一一对应

```mysql
insert into tableName (columnName1, columnName2, ...) values (value1, value2, ...);
```

- 若 `值` 的顺序和表中 `字段名称` 的顺序一致, 那么可以省略 `字段名称`

```mysql
insert into tableName values (value1, value2, ...); /* 必须要和表中的column顺序一致 */
```

- 可以使用 `,` 分隔来同时插入多条数据

```mysql
insert into tableName (columnName1, columnName2) values (value1, value2), (value1, value2);
```



#### 查询 (Read)

- 查询表中所有的数据 ( `*` 为通配符)

```mysql
select * from tableName;
```

- 查询特定列
- 通过 `,` 同时查询列的数据

```mysql
select columnName1, columnName2, ... from tableName;
```

- 通过 `where` 指定查询条件

```mysql
select columnName1, columnName2, ... from tableName where anotherColumnName=anotherValue;
```



#### 更新 (Update)

- 更新整张表中某一列所有的数据

```mysql
update tableName set columnName=value;
```

- 通过 `where` 指定更新条件

```mysql
update tableName set columnName=value where anotherColumnName=anotherValue;
```

- 通过 `,` 同时更改多个列的数据

```mysql
update tableName set columnName1=value1, columnName2=value2 where anotherColumnName=anotherValue;
```



#### 删除 (Delete)

- 删除表中的所有数据

```mysql
delete from tableName
```

- 通过 `where` 指定删除条件

```mysql
delete from tableName where columnName=value;
```



### 数据类型

定义

- 为了合理分配存储空间来存储数据
- 设计数据库时需要合理使用数据类型, 来优化数据库体积



#### 整数

- 专门用于保存整数
- 默认情况下为有符号的
- 在数据类型后面加上 `unsigned` 来将其变成无符号的
- 在数据类型后面加上 `(x)` 来指定位宽, 比如 `tinyint(2)` 则意为2位位宽
- 在数据类型后面你加上 `zerofill` 来通过 `0` 来补足位宽
- 若数值超出范围会报错

| 整数类型种类  | 存储空间 | 存储数字范围 (有符号 / 无符号) (signed / unsigned)           | 描述       |
| ------------- | -------- | ------------------------------------------------------------ | ---------- |
| TINYINT       | 1 Byte   | (-128, 127) / (0, 255)                                       | 小整数值   |
| SMALLINT      | 2 Byte   | (-32,768, 32,767) / (0, 65,535)                              | 大整数值   |
| MEDIUMINT     | 3 Byte   | (-8,388,608, 8,388,607) / (0, 16,777,215)                    | 大整数值   |
| INT / INTEGER | 4 Byte   | (-2,147,483,648, 2,147,483,647) / (0, 4,294,967,295)         | 大整数值   |
| BIGINT        | 8 Byte   | (-9,223,372,036,854,775,808, 9,223,372,036,854,775,807) / (0, 18,446,744,073,709,551,615) | 超大整数值 |

```mysql
create table tableName (
		columnName, tinyint(2) unsigned zerofill /* 小整数值, 2位位宽, 无符号, 用0补足位宽, 2 -> 02 */
);
```



#### 浮点

- 专门用于保存小数

- 通过数据类型之后的 `(m, d)` 指定 `m` 为总位数, `d` 为小数位数
- <span style="color: #f90;">不准确, 企业开发中千万不要用浮点类型来存储用户的准确信息 (Money)</span>
- 若数值超出范围会报错

| 浮点类型种类 | 默认保留小数位数 | 精度                   | 存储空间 | 精度   |
| ------------ | ---------------- | ---------------------- | -------- | ------ |
| FLOAT        | 5                | 7位数, 包括小数点之前  | 4 Byte   | 单精度 |
| DOUBLE       | 16               | 16位数, 包括小数点之前 | 8 Byte   | 双精度 |

```mysql
create table tableName (
    column1 float(25, 19),
    column2 double(25, 19)
);
```



#### 定点

- 也是用于保存小数的
- 不会丢失精度
- 本质是将数据分为两个部分来存储, 每个部分都是整数, 非常消耗资源, 不要滥用
- 格式为 `DECIMAL(m, d)` , `m` 为总位数, `d` 为小数位数
- 若数值超出范围会报错

```mysql
create table tableName (
    column1 decimal(20, 18)
);
```



#### 字符

- 专门用于存储字符
- 格式为 `char(size)` / `varchar(size)`
- `char(2)` 对于数据 `a` , 会存储为 " a", 而 `varchar(2)` 对于数据 `a` , 存储的就是 "a"
- 是用 `''` 单引号传值
- `varchar` 理论上可以存储 `65,535` 个字符, 但具体取决于当前数据库的 `字符集`
  - 比如 `utf8mb4` 中, 只能存储 `21,845` 个字符, 因为每一个字占用 `3` 个字节
  - 比如 `gbk` 中, 只能存储 `32,767` 个字符, 因为每一个字占用 `2` 个字节
- 若字符串长度超出申请的范围就会报错

| 字符类型种类 | 默认长度        | 存储空间        | 存储空间分配类型             |
| ------------ | --------------- | --------------- | ---------------------------- |
| CHAR         | 255             | 0 ~ 255 Byte    | 长度固定, 定义多少就分配多少 |
| VARCHAR      | 取决于 `字符集` | 0 ~ 65,535 Byte | 长度不固定, 用多少就分配多少 |

```mysql
create table tableName (
		column1 char(3),
  	column2 varchar(5)
);
```



- 文本
- 枚举
- 集合
- 日期
- 布尔 (Boolean)

整数类型



---
