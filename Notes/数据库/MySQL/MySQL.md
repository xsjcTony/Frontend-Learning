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
| LIKE                | 模糊查询                            | 见 `高级查询` -> `模糊查询`                                  |



---

## 数据库 (CRUD)



### 基本

MySQL默认创建的数据库

- `information_schema` : 保存关于MySQL服务器所维护的所有其他数据库的信息, 比如数据库名, 数据库表, 表栏的数据类型与访问权限等等, <span style="color: #ff0;">一般不会修改</span>

- `mysql` : MySQL系统数据库, 保存了登录用户名, 密码, 以及每个用户的权限等等, <span style="color: #ff0;">一般不会修改</span>

- `performance_schema` : 保存数据库服务器性能的参数, <span style="color: #ff0;">有时需要修改</span>

- `sys` : 通过视图的形式把 `information_schema` 和 `performance_schema` 结合起来, 展示出更加令人容易理解的数据, <span style="color: #ff0;">一般不会修改</span>



创建 (Create)

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

 

删除 (Delete)

- 最基础的语句, 如果要删除的数据库不存在, 那么就会报错

```mysql
drop database databaseName;
```

- `if exists` : 如果数据库存在就删除, 如果不存在就跳过 <span style="color: #0ff;">(企业开发中常用)</span>

```mysql
drop database if exists databaseName;
```



修改 (Update)

- 对于 `数据库` , 只能修改它的 `字符集`

```mysql
alter database databaseName charset=utf8mb4;
```



查看 (Read)

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



查看 (Read)

- 查看某个数据库中所有表 (需要指定数据库之后才能查看)

```mysql
show tables;
```

- 查看某个表中的数据结构

```mysql
desc tableName;
```



创建 (Create)

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



删除 (Delete)

- 添加 `if exists` 来在表不存在的情况下跳过删除操作, 避免报错

```mysql
drop table if exists tableName;
```



修改 (Update)

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



### 多表之间的关系

一对一

- 一般不需要拆分
- 比如一夫一妻制

一对多

- 一般需要拆分
- 比如一个人有多个汽车, 一个班有多个学生, ......
- 一般会拆分成两张表

多对多

- 一般需要拆分
- 比如一个学生有多个老师并且一个老师有多个学生
- 一般会拆分成两张表, 外加一张中间关系表

---

## 数据 (Data)



### 增删改查 (CRUD)

插入 (Create)

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



查询 (Read)

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



更新 (Update)

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



删除 (Delete)

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
- 在 `MySQL` 中每一行最多存储 `65,534` 个字节, 除非使用 `大文本` 数据类型



#### 整数

- 专门用于保存整数
- 默认情况下为有符号的
- 在数据类型后面加上 `unsigned` 来将其变成无符号的
- 在数据类型后面加上 `(x)` 来指定位宽, 比如 `tinyint(2)` 则意为2位位宽
- 在数据类型后面你加上 `zerofill` 来通过 `0` 来补足位宽
- 若数值超出范围会报错

| 整数类型种类  | 存储空间 | 存储数字范围 (有符号 / 无符号) (signed / unsigned)           | 描述       |
| ------------- | -------- | ------------------------------------------------------------ | ---------- |
| TINYINT       | 1 Byte   | (-128, 127) / (0, 255)                                       | 超小整数值 |
| SMALLINT      | 2 Byte   | (-32,768, 32,767) / (0, 65,535)                              | 小整数值   |
| MEDIUMINT     | 3 Byte   | (-8,388,608, 8,388,607) / (0, 16,777,215)                    | 中整数值   |
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



#### 大文本

- 用于存储长文本
- 可以突破每行数据最多 `65,534` 字节的限制
- 本质是占用了 `10` 个字节, 引用了实际保存数据的地址, 并没有占用每一行所能保存的字节数

| 大文本类型种类 | 存储空间               | 描述         |
| -------------- | ---------------------- | ------------ |
| TINYTEXT       | 0 ~ 255 Byte           | 短文本数据   |
| TEXT           | 0 ~ 65,535 Byte        | 普通文本数据 |
| MEDIUMTEXT     | 0 ~ 16,777,215 Byte    | 中等文本数据 |
| LONGTEXT       | 0 ~ 4,294,967,295 Byte | 长文本数据   |

```mysql
create table tableName (
		column1 text,
  	column2 longtext
);
```



#### 枚举

- 取值只能是几个固定值中的 `一个` 时使用
- 若插入了可选取值之外的值会报错
- 本质上是通过 `整数类型` 来实现的
- 不同于其他编程语言, `MySQL` 的 `枚举` 是从 `1` 开始的, 其他语言是从 `0` 开始的
- 可以通过 `整数类型` 来插入

```mysql
create table tableName (
		column1 enum(value1, value2)
);

insert into tableName values (2); /* 可以使用数字插入, 插入的是value2 */
```



#### 集合

- 取值只能是几个固定值中的 `任意几个` 时使用
- 若插入了可选取值之外的值会报错
- <span style="color: #ff0;">插入值的时候 `,` 两边不能有空格, 不然会报错</span>
- 本质上是通过 `整数类型` 来实现的
- 每一项取值的数值是 `2^n` , `n` 从 `0` 开始递增, 结果为所有数值加起来, 比如同时选择了第 `1 / 2 / 4` 项, 则底层存储的数值为 `1 + 2 + 8 = 11`

```mysql
create table tableName (
    column1 set('value1', 'value2', 'value3')
);

insert into tableName values ('value1,value3'); /* 每个值中间的,两边不可以有空格 */
```



#### 日期

- 专门用于保存时间 / 日期
- 插入时间 / 日期的时候需要用 `''` 单引号包裹起来

| 日期类型种类 | 存储空间 | 格式                | 描述              |
| ------------ | -------- | ------------------- | ----------------- |
| DATE         | 3 Byte   | YYYY-MM-DD          | 日期值            |
| TIME         | 3 Byte   | HH:MM:SS            | 时间值 / 持续时间 |
| DATETIME     | 8 Byte   | YYYY-MM-DD HH:MM:SS | 混合日期和时间值  |



#### 布尔 (Boolean)

- 用于保存真假值
- 本质上是通过 `整数类型` 来实现的
- `0` 表示 `false` , 其他任何数表示 `true` (同 `C / C++` )
- 传 `整数类型` / `true` / `false` 以外的值会报错

```mysql
create table person (
    flag boolean
);

insert into person values (false);
insert into person values (true);
insert into person values (0); /* false */
insert into person values (1); /* true */
```

---

## 数据完整性

定义

- 确保保存到数据库中的数据都是正确的
- 在创建表时给表添加约束
- 分为三类:
  - 实体完整性: 表中的每一行数据都是一个 `实体` (entity)
  - 域完整性: 一行数据中的每个单元格都是一个 `域`
  - 参照完整性: 又名引用完整性



### 实体完整性

定义

- `实体完整性` 意为保证每一行数据的 `唯一性`
- 约束类型共有 `主键` / `唯一` / `自动增长列` 三种

#### 主键 (primary key)

- 用于唯一的标识表中的每一条数据, 类似于现实生活中的身份证
- 一张表中只有一个 `primary key` , 不能出现多个
- 其数据不能为 `null` , 且不能重复
- 在某一列之后添加 `primary key` 关键字, 或者在最后写上 `primary key(columnName)` 来指定主键
- 添加数据时如果发现了重复的 `primary key` , 那么就会报错

```mysql
create table tableName (
		column1 dataType primary key
);
/* 或者 */
create table tableName (
		column1 dataType,
  	primary key(column1)
);
```

- `联合主键` : 将表中的多个列当做一个整体, 作为主键使用

```mysql
create table tableName (
  	column1 dataType,
  	column2 dataType,
  	primary key(column1, column2)
);
```

#### 唯一 (unique)

- 约束表中的某个列中的数据永不重复
- 在定义列之后加 `unique` 关键字
- 与 `primary key` 不同的是, `unique` 在一张表中可以有多个并且值可以是 `null` , 而 `primary key` 只能有一个且值不能为 `null`

```mysql
create table tableName (
  	column1 dataType unique
);
```

#### 自动增长列 (auto_increment)

- 让某一列的取值从 `1` 开始递增
- 设置 `auto_increment` 的列必须是 `主键` 或 `联合主键` 中的列之一, 或者是 `唯一` 的键
- 传值的时候除了可以传 `数字` 之外, 还可以传 `default` / `null` , 那么会自动插入上一次插入的值+1 (若已存在, 则继续+1直到值不存在为止)

#### <span style="color: #0ff;">主键选择规则</span>

- <span style="color: #0ff;">最少性: 能用一个列作为 `主键` , 就不要使用多个列</span>
- <span style="color: #0ff;">稳定性: 能用不被操作 (修改) 的列作为 `主键` , 就不要用会被操作 (修改) 的列</span>
- <span style="color: #0ff;">一般情况下会定义一个叫做 `id` 的列, 类型是 `整数类型` (int) , 并且 `自动增长` (auto_increment)</span>

#### 修改约束

- 添加 `主键`

```mysql
alter table tableName add primary key(columnName);
```

- 添加 `唯一`

```mysql
alter table tableName add unique(columnName);
```

- 添加 `自动增长列` (前提是该列必须是 `主键` 之一或 `唯一` 的)

```mysql
alter table tableName modify columnName dataType auto_increment;
```



### 域完整性

定义

- 保证每个单元格数据的正确性

#### 正确的数据类型

- 使用 `TINYINT UNSIGNED` 来表示人的年龄
- 使用 `ENUM` 来表示人的性别
- 使用 `TEXT` 类型来存储比较多的文字
- ......

#### 非空 (NOT NULL)

- 插入值的时候若没有填值或插入 `null` 的时候会报错
- 可以和 `default` 配合使用

```mysql
create table tableName (
		column1 dataType NOT NULL
);
```

#### 默认值 (DEFAULT)

- 来给某一列指定默认的值, 在插入的数据中没有被指定时或传入 `default` 时使用
- 可以和 `not null` 配合使用

```mysql
create table tableName (
		column1 dataType DEFAULT defaultValue
);
```



### 参照完整性

定义

- 保证多个表之间引用关系的正确性
- 通过 `外键` 来实现关系引用并保证参照完整性

#### 外键 (foreign key)

- 一张表中指向另一张表中的 `主键` 的列
- 在表最后通过 `foreign key` 以及 `references` 关键字即可
- 只有 `InnoDB` 存储引擎支持
- `外键` 的数据类型必须和他指向的 `主键` 的数据类型一致
- 在 `一对多` 的关系中, `外键` 应该被定义到多的那个表
- 在 `对对对` 的关系中, `外键` 应该被定义到中间关系表, 并且其拥有多个 `外键`
- 定义 `外键` 的表称之为 `从表` , 被 `外键` 引用的表称之为 `主表`

```mysql
create table table1 (
		column1 dataType primary key
);

create table table2 (
		column1 dataType,
  	column2 dataType,
  	foreign key (column1) references table1(column1) 
);
```

#### 修改约束

- 添加 `外键`

```mysql
alter table tableName add foreign key (columnName) references mainTableName(primaryKeyName)
```

- 查看 `外键`

```mysql
show create table tableName;
```

- 删除 `外键`

```mysql
alter table tableName drop foreign key foreignKeyName; /* 外键名称要通过查看外键查看 */
```

#### 外键操作

- 严格操作 (上述都是严格操作)
  - 主表不存在对应数据, 从表就不允许添加
  - 主表不允许删除从表引用着的数据
  - 主表不允许修改从表引用着的数据
- 置空操作
  - 在删除主表中被从表引用着的数据时, 同时删除从表关联的数据 (变成 `null` )

```mysql
foreign key (column1) references table1(column1) on delete set null
```

- 级联操作 (cascade)
  - 在修改主表中被从表引用着的数据时, 同时修改从表关联的数据 (无法删除)

```mysql
foreign key (column1) references table1(column1) on update cascade
```

- 可以配合起来使用

```mysql
foreign key (column1) references table1(column1) on delete set null on update cascade
```

---

## 高级查询 (Query)



### 完整单表查询

```mysql
select [all | distinct] columnNames from tableName [where conditions] [order by asc | desc] [group by columnName] [having conditions] [limit startIndex number];
```



### 结果集

定义

- 通过 `查询语句` 查询出来的结果
- 以 `表` 的形式返回
- 是单独的一张新的 `表`
- 不是真实存在的, 存储在 `内存` 中

#### 给列起别名

```mysql
select column1 as alias1, column2 as alias2, ... from tableName;
```



### 伪表 (dual)

- 一张虚拟的, 不存在的表
- 为了让一些查询方式符合 `MySQL` 规范, 比如字段表达式
- 名称为 `dual` , 查询的时候使用 `from dual` , 意为从 `伪表` 中查询



### 字段表达式

- 可以直接利用查询语句来查询表达式的结果
- 为了符合 `MySQL` 规范, 从 `伪表` 中查询

```mysql
select 6+6; /* 不符合规范 */
select 6+6 from dual; /* 符合MySQL规范, 但本质上 from dual 是废话 */
```



### 通配符

- 配合 `模糊查询` 使用

- `_` : 表示任意 `一个` 字符
  - `a_c` : abc, adc, ......
  - `_a_c` : 1abc, 3adc, ......
- `%` : 表示任意 `0 ~ N个` 字符
  - `a%c` : abc, adc, abbc, ac, ......
  - `%a%c` : 1abc, abc1, 2abbc, 3adc, ......



### 模糊查询 (LIKE)

- `WHERE` 条件表达式种类之一
- 利用 `通配符` 完成

```mysql
select columnName from tableName where columnName like expression;
```



### 排序 (ORDER BY)

- `asc` : 升序排序
- `desc` : 降序排序
- 只指定 `order by` 不指定顺序的话, 默认按照 `升序` 进行排序
- 可以指定多个列的排序顺序, 若前一个相等, 则应用后一个

```mysql
select column1, column2, ... from tableName order by column1 [asc | desc], column2 [asc | desc], ...;
```



### 聚合函数

#### 常用

| 函数    | 示例                                                        | 描述                 |
| ------- | ----------------------------------------------------------- | -------------------- |
| count() | select count(columnName) from tableName [where conditions]; | 统计查询到的结果数量 |
| sum()   | select sum(columnName) from tableName [where conditions];   | 求和                 |
| avg()   | select avg(columnName) from tableName [where conditions];   | 求平均值             |
| max()   | select max(columnName) from tableName [where conditions];   | 获取最大值           |
| min()   | select min(columnName) from tableName [where conditions];   | 获取最小值           |

#### 数值类

| 函数       | 示例                                                         | 描述               |
| ---------- | ------------------------------------------------------------ | ------------------ |
| rand()     | select rand() from dual; / select columnName from tableName order by rand(); (随机排序) | 生成随机数 (0 ~ 1) |
| round()    | select round(3.5) from dual;                                 | 四舍五入           |
| ceil()     | select ceil(3.1) from dual;                                  | 向上取整           |
| floor()    | select floor(3.9) from dual;                                 | 向下取整           |
| truncate() | select truncate(3.14159265, 2) from dual; (截取两位小数)     | 截取小数位         |

#### 字符串类

| 函数        | 示例                                                     | 描述                         |
| ----------- | -------------------------------------------------------- | ---------------------------- |
| ucase()     | select ucase('tony') from dual;                          | 转换为大写                   |
| lcase()     | select lcase('TONY') from dual;                          | 转换为小写                   |
| left()      | select left('hello world', 3) from dual; (hel)           | 从左边指定位置开始截取       |
| right()     | select right('hello world', 3) from dual; (rld)          | 从右边指定位置开始截取       |
| substring() | select substring('hello world', 3, 5) from dual; (llo w) | 从指定位置开始截取指定个字符 |



### 数据分组 (GROUP BY)

- 将数据分组, 相同的数据会被分到一个组中
- `select` 后面必须是 `分组字段` / `聚合函数` , 否则就只会返回分组中的第一条数据
- `group by` 后面跟的也是 `分组字段` , 前后必须一致

```mysql
select [columnName || functions] from tableName group by [columnName] /* 前后 columnName 分组字段必须一致 */
```



### having (条件查询)

- 是 `条件查询` , 和 `where` 很像
- 但是 `where` 去 `数据库` 中查找, 而 `having` 是去 `结果集` 中查找
- 当需要寻找 `结果集` 中有但 `数据库` 中没有的数据时使用

```mysql
select columnName from tableName having conditions;
```



### 分页 (limit)

- 根据 `开始的索引` 和 `需要的个数` 来返回相应的数据

```mysql
select columnName from tableName limit startIndex, number; /* 从第 startIndex 索引的数据开始, 返回 number 条数据 */
```



### 查询选项

- `all` : 显示所有查询出来的数据 (默认行为)
- `distinct` : 去除结果集中重复的数据之后再显示 (只有所有查询的列的数据都相同才会去重)

```mysql
select [all | distinct] columnName from tableName; /* all 可以省略 */
```





### 多表查询

- 只需要在 `单表查询` 的基础上增加额外的 `表` 即可
- 默认返回 `笛卡尔` 集 (拿一张表的每一条数据去和另一张表的每一条数据相乘)

```mysql
select columnName from table1, table2, ...;
```



#### union

- 在 `纵向` 上将多张表的数据拼接起来
- 使用 `union` 将多个 `单表查询语句` 拼接起来
- 返回的 `结果集` 的 `列名` 是第一张表的
- <span style="color: #f90">必须要保证每张表查询的字段个数一致</span>
- 默认情况下会自动去重 (必须所有查询的字段都相同)
- 使用 `union all` 来避免默认的去重行为

```mysql
select columnName from table1 union select columnName from table2 union ...; /* 默认去重 */
select columnName from table1 union all select columnName from table2 union all ...; /* 使用 union all 指定不去重 */
```



#### 连接查询 (join)

- 将多张表中关联的字段连接在一起
- 用于查询多张表中满足数据的条件
- 在查询指定字段时, 必须要在字段前加上其表名, 比如 `table1.column1`

内连接 (inner join)

- 和 `where` 作用相同
- 只会返回满足条件的数据

```mysql
select tableName.columnName from tabl1 inner join table2 on conditions; /* 比如 on table1.column1 = table2.column2 */
```



外连接

- 会返回不符合条件的数据, 返回哪张表取决于是 `左外连接` 还是 `右外连接`

左外连接 (left join)

- 左边的表不看条件, 会返回其中的所有数据
- 右边的表只会返回满足条件的数据

```mysql
select tableName.columnName from table1 left join table2 on conditions;
```

右外连接 (right join)

- 右边的表不看条件, 会返回其中的所有数据
- 左边的表只会返回满足条件的数据

```mysql
select tableName.columnName from table1 right join table2 on conditions;
```



交叉连接 (cross join)

- 如果没有指定条件, 那么会返回 `笛卡尔` 集 (即基本多表查询的返回结果)
- 如果指定了条件, 那么就相当于 `内连接` (inner join)

```mysql
select tableName.columnName from table1 cross join table2;
select tableName.columnName from table1 cross join table2 on conditions;
```



全连接 (full join)

- `MySQL` 不支持



#### 自然连接 (natural)

- 用于简化 `内连接` / `外连接`
- 如果多张表需要判断的条件的字段名称一致, 那么 `自然连接` 会自动判断, 不用编写条件
- 如果既没有指定条件, 又没有同名的字段, 那么就会返回 `笛卡尔` 集 (即基本多表查询的返回结果)
- 默认情况下会去除重复的判断字段 (比如条件)

自然内连接 (natural join)

```mysql
select tableName.columnName from table1 natural join table2;
```

自然左外连接 (natural left join)

```mysql
select tableName.columnName from table1 natural left join table2;
```

自然右外连接 (natural right join)

```mysql
select tableName.columnName from table1 natural right join table2;
```



#### using

- 在使用 `连接查询` 时, 若多张表需要判断的条件的字段名称一致时, 可以使用 `using` 来简化语法

内连接 (inner join)

```mysql
select tableName.columnName from table1 inner join table2 using(columnName);
```

左外连接 (left join)

```mysql
select tableName.columnName from table1 left join table2 using(columnName);
```

右外连接 (right join)

```mysql
select tableName.columnName from table1 right join table2 using(columnName);
```



#### 子查询

- 将一个 `查询语句` 的 `结果` 作为另一个 `查询语句` 的 `条件` / `表` 来使用

作为条件

- 标准子查询 (结果为一条数据)

```mysql
select columnName from tableName where columnName = (select columnName from tableName ......);
```

- 非标准子查询 (结果为多条数据)

```mysql
select columnName from tableName where columnName in(select columnName from tableName ......);
```

作为表

- <span style="color: #ff0;">必须要给子查询的结果起一个 `别名` 才能作为表使用</span>

```mysql
select columnName from (select columnName from tableName ......) as t;
```

---

## 事务 (transaction)

定义

- 用于处理容易出错的数据
- 用来维护数据库的完整性
- 保证成批的 `SQL` 语句要么全部执行, 要么全部不执行
- 用来管理 `insert` / `update` / `delete` 语句
- 只有 `InnoDB` 引擎才支持 `事务`

本质

- 开启事务的时候拷贝一张一模一样的表
- 执行相关的操作都是在拷贝的这张表中进行操作
- 如果失败了, 执行 `rollback` , 那么系统会自动删除这张拷贝的表, 不会影响原有的数据
- 如果陈宫了, 执行 `commit` , 那么系统会利用拷贝的这张表中的最新的数据覆盖原有表中的数据, 会影响到原有的数据



### 基本语法

- 开启事务

```mysql
start transaction;
```

- 提交事务 (用于成功时)

```mysql
commit;
```

- 回滚事务 (用于失败时)

```mysql
rollback;
```



### 回滚点

- 为 `事务` 创建 `回滚点`
- 使用 `savepoint` 关键字跟上 `回滚点` 名称
- 回滚时使用 `rollback to` 关键字跟上想要回滚的 `回滚点` 名称

```mysql
start transaction;
/* transaction updates */
savepoint rollbackPointName;
/* transaction updates */

rollback to rollbackPointName;
```



### 特点

#### 原子性

- 关注的是状态
- 事务开启后的所有操作, 要么全部成功, 要么全部失败, 不可能出现部分成功或失败的情况
- 事务执行过程中如果出错, 哪怕不手动回滚, 系统也会强制自动回滚

#### 永久性

- 事务完成后, 事务对数据库的所有操作是永久的, 操作完成之后就不能再回滚

#### 隔离性 (重点)

- 数据库允许多个并发事务同时对齐数据进行读写和修改
- `隔离性` 可以防止多个事务并发执行时由于交叉执行而导致的数据不一致

隔离级别

- 不同的隔离级别有不同的行为模式

| 隔离级别          | 英文 (也用于设置) | 描述                                         | 脏读 | 不可重复读 | 幻读 |
| ----------------- | ----------------- | -------------------------------------------- | ---- | ---------- | ---- |
| 读未提交          | read uncommitted  | 一个事务可以读取另一个未提交事务的数据       | ✔    | ✔          | ✔    |
| 读已提交          | read committed    | 一个事务要等另一个事务提交后才能读取数据     | ❌    | ✔          | ✔    |
| 可重复读          | repeatable read   | 一个事务范围内多个相同的查询返回相同的结果   | ❌    | ❌          | ✔    |
| 串行化 (性能很差) | serializable      | 前一个事务没有执行完, 后面一个事务就不能执行 | ❌    | ❌          | ❌    |

概念

- 脏读: 能够读取到其他事务没有提交的数据
- 不可重复读: 一个事务范围内多次查询的结果不同
- 幻读: 由于其他事务对数据的更改, 导致当前事务读取到的数据并不是最新的数据, 会导致一些操作失败

查看隔离级别

- 全局

```mysql
select @@global.transaction_isolation;
```

- 当前会话 (一个终端窗口就是一个会话)

```mysql
select @@transaction_isolation;
```

设置隔离级别

- 全局

```mysql
set global transaction isolation level levelName;
```

- 当前会话

```mysql
set session transaction isolation level levelName;
```

---

## 视图 (view)

定义

- 将 `结果集` 缓存起来
- 本质和 `结果集` 一样是一张虚拟的表

作用

- 简化 `SQL` 语句
- 隐藏表的真实结构
- 提升数据安全性



### 基本语法

- 创建视图
- 一般 `视图` 名称使用下划线拼接

```mysql
create view view_name as select ...;
```

- 使用 `视图` 时, 将其当做 `表` 来使用即可

```mysql
select columnName from view_name;
```

- 修改 `视图` 内容

```mysql
alter view view_name as select ...;
```

- 删除 `视图`
- 加上 `if exists` 来自动跳过不存在的情况, 避免报错

```mysql
drop view view_name;
drop view if exists view_name;
```



### 更新视图数据 (增删改查)

- 语法和 `表` 中的增删改查基本一致
- <span style="color: #ff0">操作 `视图` 中的数据本质上是操作原始 `表` 中的数据</span>
- 修改数据时只能修改原表中有的数据, 由其他方法 (比如说 `聚合函数` ) 生成的数据不能修改



### 视图算法

- 在 `create` 和 `view ` 关键字中间指定

```mysql
create [algorithm={merge | temptable | undefined}] view view_name as select ...;
```

- `merge` : 合并式 (替代式) 算法
  - 将视图的语句和外层的语句合并之后再执行
  - ✔ **允许** 更新视图中的数据

```mysql
/* 视图语句 */
create algorithm=merge view view_name as select * from tableName;
/* 查询语句 */
select * from view_name;
/* merge模式本质上会合并成如下语句在执行 */
select * from (select * from tableName) as t;

/* 可以执行针对视图的增删改查 */
insert into view_name values ...; /* ✔ */
```

- `temptable` : 临时表 (具代式) 算法
  - 将视图生成一个临时表, 再执行外层的语句
  - ❌ **不允许** 更新视图中的数据

```mysql
/* 视图语句 */
create algorithm=temptable view view_name as select * from tableName;
/* 查询语句 */
select * from view_name;
/* temptable模式本质上会先生成一个临时表 */
(select * from tableName) as t;
/* 再执行查询语句 */
select * from t;

/* 不可以执行针对视图的增删改查 */
insert into view_name values ...; /* ❌ */
```

- `undefined` : 未定义算法 (默认)
  - 由 `MySQL` 自己决定使用哪种算法
  - 不指定即为该算法
  - 一般情况下 `MySQL` 会自动选择 `merge` 算法



### 视图限制

- 在创建视图的语句最后加上 `with check option`

```mysql
create view view_name as select ... with check option;
```

#### 基本限制

- 在有 `with check option` 的情况下
  - 保证数据 `update` 之后也要符合 `where` 的条件, 否则报错
  - 保证 `insert` 之后的数据也能被视图查询出来
  - 不限制 `delete`
  - 对于没有 `where` 条件的视图, `with check option` 是多余的

#### 更新限制

- 只能更新原始表中有的数据
- 由下列生成的数据都是不能更新的
  - 聚合函数
  - distinct
  - group by
  - having
  - union
  - from子句包含多张表
  - select中应用了不可更新的形势图

---

## 变量 (variable)

- 在 `MySQL` 中, 采用下划线全小写的命名方式, 比如 `user_name`



### 定义变量

- 全局变量
- 可以在任何地方定义

```mysql
@variableName
```

- 局部变量
- 只能在 `存储过程` 或 `函数` 中定义

```mysql
declare variableName dataType;
declare variableName dataType default defaultValue; /* 使用 default 关键字来给局部变量定义一个默认值 */
```



### 变量赋值

```mysql
set @globalVariable=var_value;
set localVariable=var_value;
select columnName into @globalVariable from tableName;
select columnName into localVariable from tableName;
```

---

## 预处理

定义

- 由 `MySQL` 提出的一种减轻服务器压力的技术



### 传统MySQL处理流程

1. 在客户端准备 `SQL` 语句
2. 发送 `SQL` 语句到 `MySQL` 服务器
3. `MySQL` 服务器对 `SQL` 语句进行解析, 然后编译, 再执行该 `SQL` 语句
4. 服务器将执行结果返回给客户端

弊端

- 哪怕多次传递的语句大部分内容是相同的, 每次还是要重复传递
- 哪怕语句是相同的, 每次执行之前还是要先解析, 编译之后才能执行



### 预处理的处理流程

1. 在客户端准备 `预处理SQL` 语句

```mysql
/* 格式 */
prepare preprocessing_name from SQL_statement;
/* 例子 */
prepare example from 'select * from tableName where id=?;';
```

2. 发送 `预处理SQL` 语句到 `MySQL` 服务器
3. `MySQL` 服务器对 `预处理SQL` 语句进行解析, 但不会执行
4. 在客户端准备相关数据
   - <span style="color: #f90;">预处理只能使用 `全局变量` , 不能使用 `局部变量`</span>

```mysql
set @data=xx;
```

5. `MySQL` 服务器对数据和 `预处理SQL` 编译, 然后执行该 `SQL` 语句

```mysql
execute preprocessing_name using @data;
```

6. 服务器将执行结果返回给客户端

优点

- 只对 `SQL` 语句进行了一次解析
- 重复内容大大减少 (网络传输更快)

---

## 存储过程 (Stored Procedure)

[MySQL :: MySQL 8.0 Reference Manual :: 13.1.17 CREATE PROCEDURE and CREATE FUNCTION Statements](https://dev.mysql.com/doc/refman/8.0/en/create-procedure.html)

定义

- 类似于其他编程语言的 `函数`
- 用于封装一组特定功能的 `SQL` 语句集



### 基本语法

- 创建

```mysql
create procedure procedureName (parameter dataType, ...)
begin
		/* SQL statements */
		/* 可以使用 declare 关键字定义局部变量 */
end;
```

- 调用

```mysql
call procedureName(arguments);
```

- 删除
  - 加上 `if exists` 防止不存在时报错

```mysql
drop procedure procedureName;
drop procedure if exists procedureName;
```



### 查看存储过程

- `MySQL` 服务器中所有存储过程

```mysql
show procedure status;
```

- 指定 `数据库` 中的存储过程

```mysql
show procedure status where db='db_name';
```

- 指定存储过程的 `源代码`

```mysql
show create procedure procedureName;
```



### 参数

存储过程的参数有三种

- `in` : 输入参数 (默认)
- `out` : 输出参数
- `inout` : 输入输出参数

```mysql
create procedure procedureName (in parameter dataType, out parameter dataType)
begin
		/* SQL statements */
end;
```

输入参数

- 外界传递的参数

输出参数

- `MySQL` 返回给外界的参数
- `MySQL` 的 `存储过程` 中不能使用 `return` 返回值, 需要通过 `输出参数` 来向外返回一个值
- 使用方法是在外界定义一个变量, 然后将这个变量当做 `输出参数` 传进来, 那么调用该 `存储过程` 之后这个变量的值就会被修改, 形成返回值的效果

输入输出参数

- 同时具备了 `输入参数` 和 `输出参数` 的功能
- 要注意 `数据类型`

---

## 自定义函数

[MySQL :: MySQL 8.0 Reference Manual :: 13.1.17 CREATE PROCEDURE and CREATE FUNCTION Statements](https://dev.mysql.com/doc/refman/8.0/en/create-procedure.html)

定义

- 和 `存储过程` 很像, 但是不需要手动通过 `call` 调用
- 和 `聚合函数` 一样会在 `SQL` 语句中自动被调用



### 基本语法

- 创建

```mysql
create function functionName (parameter dataType, ...) returns dataType characteristic
begin
		/* SQL statements */
		return exampleValue;
end;		
```



### 特征 (characteristic)

- `函数` 必须指定 `特征`
- 可以指定多个特征, 通过 `空格` 来分隔

- `存储过程` 一样可以使用 `特征` , 但不是强制要求

| 函数特征                                       | 描述                                             |
| ---------------------------------------------- | ------------------------------------------------ |
| DETERMINISTIC                                  | 确定的, 相同的参数 **一定** 会输出相同的结果     |
| NOT DETERMINISTIC (默认, 若上述两条都没有指定) | 不确定的, 相同的参数 **不一定** 会输出相同的结果 |
| NO SQL                                         | 没有SQL语句                                      |
| READS SQL DATA                                 | 包含SQL语句, 但只读取数据, 不会修改数据          |
| MODIFIES SQL DATA                              | 包含SQL语句, 会读取 / 修改数据                   |
| CONTAINS SQL (默认, 若上述四条都没有指定)      | 包含SQL语句, 但既不会读取, 也不会修改数据        |

- `DETERMINISTIC` / `NOT DETERMINISTIC` 必须要指定其一
- `NO SQL` / `READS SQL DATA` / `MODIFIES SQL DATA` / `CONTAINS SQL` 只是用于声明, 并不会影响程序执行

```mysql
/* 例子 */
create function fn_add (a int, b int) returns int deterministic contains sql /* 确定的, 包含SQL语句但不读写数据 */
begin
    declare sum int default 0;
    set sum = a + b;
    return sum;
end;

select fn_add(1, 4) from dual; /* 输出 5 */
```



### 条件语句

- 同样适用于 `存储过程`

#### if

```mysql
if conditions then
		/* statements */
elseif conditions then
		/* statements */
else
		/* statements */
end if;
```

#### case

```mysql
case
when conditions then
		/* statements */
when conditions then
		/* statements */
else	/* 可选, 相当于其他语言的 default */
		/* statements */
end case;
```



### 循环语句

- 同样适用于 `存储过程`

#### while

```mysql
while conditions do
		/* statements */
end while;
```

#### repeat

- 类似于其他编程语言中的 `do ... while` 循环

```mysql
repeat
		/* statements */
until conditions
end repeat;
```

---

## 批量处理数据

- 在 `存储过程` / `自定义函数` 中都可以使用
- 用于批量执行 `SQL` 语句, 避免逐条执行造成的性能浪费
- 在批量语句之前加上 `set autocommit = 0;`
- 调用完之后加上 `commit;` 即可
- 本质是 `set autocommit = 0` 之后, 所有的操作要在 `commit` 之后才执行, 约等于开启了一个 `事务` , 但还是有所不同

```mysql
set autocommit = 0;
/* SQL statements */
commit;
```

---

## 索引

定义

- 相当于字典中的目录 (拼音 / 偏旁部首)
- 可以通过索引快速的找到想要的结果
- 若没有索引就只能从前往后一条一条的查询
- 帮助提升数据的查询速度

优点

- 大大加快数据索引速度
- 没有任何限制, 所有 `MySQL` 字段都可以用作索引

缺点

- 索引是真实存在的并且会占用空间, 增加数据库的体积
- 对作为索引的字段进行增删改查, 那么系统会花费时间去更新维护索引

原则

- 对经常用于查询的字段应该创建索引

  - `where` 条件字段
  - `group by` 分组字段
  - `order by` 排序字段

  - ......

- 对于 `主键` / `外键` / `唯一` 键, 系统都会自动创建索引, 无需手动操作

- 对于数据量小的表, **不要**刻意使用索引

分类

- 单值索引: 将某个字段的值作为索引
- 复合索引: 将多个字段的值作为索引
- 唯一索引 (唯一键) : 索引列中的值必须是唯一的, 但 **允许** 为 `null`
- 主键索引: 是一种特殊的 `唯一索引` , 但 **不允许** 为 `null`



### 查看是否使用索引

- 在 `查询语句` 前添加 `explain` 关键字
- 若结果中 `key` 这个字段不为 `null` , 那么说明该 `查询语句` 用到了索引

```mysql
explain select ...;
```



### 添加索引

- 默认添加索引

  - 给表设置 `主键` / `外键` , 那么系统就会自动创建对应的所以

  - 给表设置 `唯一` 键, 那么系统就会创建对应的索引


- 创建表时通过指定字段来添加索引

```mysql
create table table_name (
		column_name dataType,
  	index index_name (column_name) /* 为 column_name 字段添加索引 */
);
```

- 给已存在的表的指定字段添加索引
  - `create index` 的方法必须要指定索引名称
  - `alter table` 的方式不一定要指定

```mysql
create index index_name on tableName (column_name) /* 必须要有 index_name */
alter table tableName add index index_name (column_name)  /* 可以没有 index_name */
```



### 删除索引

```mysql
drop index index_name on tableName;
```



### 索引算法

[MySQL :: MySQL 8.0 Reference Manual :: 8.3.9 Comparison of B-Tree and Hash Indexes](https://dev.mysql.com/doc/refman/8.0/en/index-btree-hash.html)

- 决定了如何创建索引
- 决定了如何查找索引对应的数据
- 分为 `BTREE` / `HASH` 两种

#### BTREE

- 默认算法

- 基于 `平衡多叉排序树` 实现
- 能够缩短查找的次数

#### HASH

- 只能用于 `Memory ` 存储引擎

- 基于 `哈希表` 实现
- 能够一次性定位到指定数据

---

## 连接池 (connection pool)

- 负责分配, 管理和释放数据库连接
- 允许应用程序重复使用一个现有的数据库连接, 而不是重新再建立一个
- 不使用连接池而频繁的创建 / 销毁连接非常消耗服务器的性能
- `NodeJS` 中可以使用 `Sequelize` 

![connection_pool.png](D:\xsjcTony\it666\Frontend-Learning\Notes\数据库\MySQL\images\connection_pool.png)





















