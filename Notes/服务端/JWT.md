# JWT



> [JSON Web Tokens - jwt.io](https://jwt.io/)
>
> [jsonwebtoken - npm](https://www.npmjs.com/package/jsonwebtoken)



## 定义

- 全称为 `JSON Web Tokens`
- 是一种 `客户端` 保存登录状态的解决方案
- 支持 `分布式架构`

---

## 格式 (令牌)

- `JWT` 分为 `3` 个部分, 使用 `.` 分隔, 示例:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- 头部 (Header)
  - 数据类型
  - 加密方式

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- 负载 (Payload)
  - 保存的数据

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

- 签名 (Verify Signature)
  - 独一无二
  - 可以方式数据被篡改

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
)
```

---

## 使用方式

- 在 `服务端` 生成 `JWT` 令牌, 发送给 `客户端`
- `客户端` 将 `令牌` 保存到 `cookie` / `sessionStorage` / `localStorage` 中
  - 一般保存到 `sessionStorage` 中
- `客户端` 每次发送请求将 `令牌` 一并发送到 `服务端`
- `服务端` 通过 `秘钥` 来验证 `令牌`

---

## 基本使用

[jsonwebtoken - npm](https://www.npmjs.com/package/jsonwebtoken)

- 使用 `jsonwebtoken` 库进行操作



### 生成令牌

- 使用 `jwt.sign()`
- 接收 `3` 个参数
  - 保存的 `数据`
  - 签名使用的 `秘钥`
  - 额外配置

```js
const token = jwt.sign(user, this.config.keys, { expiresIn: '7d' })
```



### 验证令牌

- 使用 `jwt.verify()`
- 接收 `2` 个参数
  - `令牌`
  - 签名使用的 `秘钥`
- 若验证不通过会抛出 `Error`

```js
try {
  const data = jwt.verify(token, this.config.keys)
} catch (err) {
  console.error(err)
}
```











































