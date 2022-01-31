# PM2



> [pm2 - npm](https://www.npmjs.com/package/pm2)
>
> [PM2 - Home](https://pm2.keymetrics.io/)
>
> [Unitech/pm2: Node.js Production Process Manager with a built-in Load Balancer.](https://github.com/Unitech/pm2)



## 定义

- 一个用于 `上线` 环境的 `NodeJS` 应用的 `进程管理器`

- 自带 `进程守护` , 可以在程序崩溃后自动重启
- 自带 `日志记录` , 可以很方便的记录 `错误日志` / `自定义日志`
  - 自定义日志: `console.log()` 的内容会被自动记录到 `自定义日志` 中
  - 错误日志: `console.error()` 的内容会被自动记录到 `错误日志` 中
- 能够启动多个 `NodeJS` 进程, 充分利用服务器资源

---

## 安装

```shell
npm i -g pm2
```

---

## 基本使用



### 查看版本

```shell
pm2 --version
```



### 启动

```shell
pm2 start app.js
```

---

## 常用指令

| 命令                       | 描述                     |
| -------------------------- | ------------------------ |
| pm2 start app.js\|config   | 启动应用程序             |
| pm2 list                   | 列出启动的所有应用程序   |
| pm2 restart appName\|appId | 重启指定应用程序         |
| pm2 info appName\|appId    | 查看指定应用程序详细信息 |
| pm2 log appName\|appId     | 显示指定应用程序的日志   |
| pm2 monit [appName\|appId] | 监控应用程序             |
| pm2 stop appName\|appId    | 停止指定应用程序         |
| pm2 delete appName\|appId  | 关闭并删除指定应用程序   |

---

## 常用配置

[PM2 - Ecosystem File](https://pm2.keymetrics.io/docs/usage/application-declaration/)

- 经典配置 `pm2.config.json` (也可以是 `JavaScript` 文件)

```json
{
  "apps": {
    "name": "reg-login-proj",
    "script": "./www.js",
    "watch": true,
    "ignore_watch": [
      "node_modules",
      "logs"
    ],
    "error_file": "./logs/error.log",
    "out_file": "./logs/custom.log",
    "log_date_format": "YYYY-MM-DD HH:mm:ss"
  }
}

```

- 根据 `配置文件` 启动应用程序

```shell
pm2 start pm2.config.json
```

---

## 集群模式 (Cluster mode)

- 开启多个 `NodeJS` 进程, 充分利用服务器资源

- 在 `配置文件` 中加上需要开启的进程数
  - 不要超过 `CPU` 的核数
  - `-1` 代表 `CPU` 核数 `-1`

```json
"instances": 4
```























