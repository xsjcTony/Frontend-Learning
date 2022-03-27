# TypeScript - 技巧



## 工具类型



### 将一个对象中的某些属性变成可选

```typescript
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
```



---









































