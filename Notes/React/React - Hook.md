# React Hook



> [Hook 简介 – React](https://zh-hans.reactjs.org/docs/hooks-intro.html)
>
> [Hook API 索引 – React](https://zh-hans.reactjs.org/docs/hooks-reference.html)

> [Hooks | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/)
>
> [React Hooks in TypeScript. Released in React v16.8.0, React Hooks… | by James Ravenscroft | Medium](https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d)
>
> [TypeScript and React: Hooks](https://fettblog.eu/typescript-react/hooks/)



## 基本概念

- `v16.8` 新增的特性
- 可以让 `函数式组件` 拥有 `类组件` 特性
- 规范中, 以 `use` 打头的 `camelCase` 方法就是 `Hook`

优势

- 无需安装额外的第三方库
- 可以让代码的可读性和可维护性变高

注意点

- 只能在 `函数式组件` / `自定义Hook` 中使用
- 只能在最外层调用, 不可以在 `循环` / `条件判断` 或 `子函数` 中调用

---

## useState

[使用 State Hook – React](https://zh-hans.reactjs.org/docs/hooks-state.html)

- 可以让 `函数式组件` 保存自己的 `state`

基本使用

- 导入

```tsx
import { useState } from 'react'
```

- 每当需要保存一个 `state` , 就调用一次 `useState()`
- 接收一个参数, 为 `初始值`
- 返回一个 `数组` , 可以通过 `数组结构` 的方式获取
  - 第一个元素: `state` 本身
  - 第二个元素: 修改该 `state` 的 `方法`
- <span style="color: #0ff;">\<TypeScript></span> 类型会根据 `初始值` 自动推断, 也可以显示指定
  - 有需要时可以使用 `typeof state` (比如 `state` 作为参数时)

```tsx
const [count, setCount] = useState<number>(0)
```

- 使用 `state` 时直接使用即可, 无需 `this`
- 修改 `state` 时调用接收到的修改方法, 传入新的值作为参数即可, 无需 `this`
  - 也可以接收一个 `函数` , 接收 `prevState` 为参数, 机制和 `setState` 相同

```tsx
<div>
  <p>{count}</p>
  <button onClick={() => void setCount(count + 1)}>+1</button>
  <button onClick={() => void setCount(prevCount => prevCount - 1)}>-1</button>
</div>
```

- 可以使用 `...` 扩展运算符来灵活的修改 `对象state` 的一部分

完整示例

```tsx
import { useState } from 'react'


const App = (): JSX.Element => {
  const [age, setAge] = useState<number>(0)
  const [name, setName] = useState<string>('Aelita')
  const [student, setStudent] = useState({ // 自动推断类型为 { lastName: string, age: number }
    lastName: 'Schaeffer',
    age: 24
  })

  return (
    <div>
      <p>{age}</p>
      <button onClick={() => void setAge(age + 1)}>+1</button>
      <button onClick={() => void setAge(prevAge => prevAge - 1)}>-1</button>
      <p>{name}</p>
      <button onClick={() => void setName('Tequila')}>change to "Tequila"</button>
      <button onClick={() => void setName('Aelita')}>change to "Aelita"</button>
      <p>{student.lastName}</p>
      <p>{student.age}</p>
      <button onClick={() => void setStudent({ ...student, age: 77 })}>change AGE to "77"</button>
    </div>
  )
}

export default App
```

---

## useEffect

[使用 Effect Hook – React](https://zh-hans.reactjs.org/docs/hooks-effect.html)

- 用于在 `组件` 中执行 `副作用` 操作, 比如
  - 设置订阅
  - 手动更改 `真实DOM`
- 可以视为 `ComponentDidMount` , `ComponentDidUpdate` 和 `ComponentWillUnmount` 的组合
- 默认情况下会在 `DOM` 每次渲染之后都执行一次 (包括 `清除` 操作)
  - 可以使用第二个 `参数` 控制

基本使用

- 导入

```tsx
import { useEffect } from 'react'
```

- 接收 `2` 个参数
  - 第一个参数: `副作用` 函数体
    - 返回值为清除该 `副作用` 的 `函数`
    - 会在和 `ComponentWillUnmount` 相同的时机执行
  - 第二个参数: 一个 `数组` , 包含了一些依赖, 只有其中的值更新了才会重新执行这个 `useEffect`
    - <span style="color: #f90">必须要包含所有可能会因为外部变化的依赖值, 否则会导致使用旧数据的 `BUG`</span>
    - 可以传入一个空数组 `[]` 让该 `useEffect` 只执行一次

完整示例

```tsx
import { useEffect, useState } from 'react'


const App = (): JSX.Element => {
  const [isHomeShow, setIsHomeShow] = useState<boolean>(true)

  return (
    <>
      {isHomeShow && <Home />}
      <hr />
      <button onClick={() => void setIsHomeShow(!isHomeShow)}>Show / hide Home</button>
    </>
  )
}

const Home = (): JSX.Element => {
  const [name, setName] = useState<string>('Aelita')
  const [age, setAge] = useState<number>(18)

  useEffect(() => {
    // componentDidMount + componentDidUpdate
    console.log('modify DOM')
  })

  useEffect(() => {
    console.log('subscribe')

    // componentWillUnmount
    return () => {
      console.log('unsubscribe')
    }
  })

  useEffect(() => {
    console.log(`Only trigger when age changes ${age}`)
  }, [age])

  return (
    <div>
      <p>{name}</p>
      <button onClick={() => void setName('Tequila')}>change name to "Tequila"</button>
      <p>{age}</p>
      <button onClick={() => void setAge(age + 1)}>+1</button>
      <button onClick={() => void setAge(age - 1)}>-1</button>
    </div>
  )
}

export default App
```

---

## useLayoutEffect

- 和 `useEffect` 用法基本相同
- 一般用于 `组件` 挂在之后需要更新 `DOM` 的布局 / 样式, 或一些特殊需求时才使用
  - 比如想要确保 `ref` 的值在其他所有代码执行之前更新到位
- 能用 `useEffect` 就尽量用

不同点

- 执行时机
  - `useEffect` 会在浏览器重新渲染 `DOM` 之后执行
  - `useLayoutEffect` 会在 `React` 更新 `DOM` 之后, 浏览器重新渲染 `DOM` 之前同步执行 (会阻塞视觉更新)
- 卸载 `组件` 时, 清除 `useEffect` 的 `函数` 会比 `useLayoutEffect` 的先执行

完整示例

- 该例子中, 如果使用 `useEffect` , 电脑慢的话会出现闪屏情况
- `App.tsx`

```tsx
import './App.css'
import { useLayoutEffect, useRef, useState } from 'react'


const App = (): JSX.Element => {
  const [isHomeShow, setIsHomeShow] = useState(true)

  return (
    <>
      {isHomeShow && <Home />}
      <hr />
      <button onClick={() => void setIsHomeShow(!isHomeShow)}>Hide / Show</button>
    </>
  )
}

const Home = (): JSX.Element => {
  const pRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    if (!pRef.current) {
      throw new Error('p is not rendered')
    }

    pRef.current.style.left = '0'
    pRef.current.style.left = '500px'
  })

  return (
    <p ref={pRef} />
  )
}

export default App
```

- `App.css`

```css
p {
    position: relative;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: #f00;
}
```

---

## useContext

- 返回一个 `context` 的值
- 相当于 `Context.Consumer`

基本使用

- 导入

```tsx
import { useContext } from 'react'
```

- 接收一个 `Context`
  - `createContext()` 的返回值
- <span style="color: #0ff;">\<TypeScript></span> 类型会根据 `初始值` 自动推断, 也可以显示指定

完整示例

```tsx
import { createContext, useContext } from 'react'


const UserContext = createContext({
  name: 'Tequila',
  age: 18
})
const ColorContext = createContext<string>('#ffc0cb')

const App = (): JSX.Element => {
  return (
    <UserContext.Provider value={{ name: 'Aelita', age: 18 }}>
      <ColorContext.Provider value="pink">
        <Home />
      </ColorContext.Provider>
    </UserContext.Provider>
  )
}

const Home = (): JSX.Element => {
  const { name, age } = useContext(UserContext)
  const color = useContext(ColorContext)

  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{color}</p>
    </div>
  )
}

export default App
```

---

## useReducer

- `useState` 的一种代替方案
- 可以复用操作数据的逻辑代码
- `reducer` 和 `redux` 中的类似, 为 `(state, action) => newState`

基本使用

- 导入

```tsx
import { useReducer } from 'react'
```

- 接收 `3` 个参数
  - 第一个参数: `reducer`
  - 第二个参数: 初始的 `默认值`
  - 第三个参数: 初始化函数, 若此项被指定, 那么 `第二个参数` 将会被作为该函数的 `参数` 被传入
    - 也可以为后续重置数据提供便利
- 返回一个 `数组` , 可以通过 `数组结构` 的方式获取
  - 第一个元素: `state` 本身
  - 第二个元素: 执行 `action` 的 `dispatch` 函数
- <span style="color: #0ff;">\<TypeScript></span> 需要指定 `state` 和 `action` 的类型
  - `action` 的类型可以使用 `联合类型`

```tsx
type NumAction =
  | { type: 'increment', payload: number }
  | { type: 'decrementBy1' }
```

- 使用 `state` 时直接使用即可, 无需 `this`
- 修改 `state` 时调用 `dispatch` 函数, 传入包含 `type` 和 `payload` (可选) 的一个 `对象` , 无需 `this`

```tsx
<div>
  <p>{state.num}</p>
  <button onClick={() => void dispatch({ type: 'increment', payload })}>+1</button>
  <button onClick={() => void dispatch({ type: 'decrement' })}>-1</button>
</div>
```

- 可以使用 `...` 扩展运算符来灵活的修改 `state` 的一部分

完整示例

```tsx
import { useReducer } from 'react'


const App = (): JSX.Element => {
  return (
    <>
      <Home />
      <hr />
      <About />
    </>
  )
}

// Types
type NumAction =
  | { type: 'increment', payload: number }
  | { type: 'decrementBy1' }

interface NumState {
  num: number
}

// 初始值
const initialNum: NumState = { num: 0 }

// 初始化函数
const initNum = (initialNum: NumState): NumState => initialNum

// reducer
const numReducer = (state: NumState, action: NumAction): NumState => {
  switch (action.type) {
    case 'increment':
      return { ...state, num: state.num + action.payload }
    case 'decrementBy1':
      return { ...state, num: state.num - 1 }
    default:
      console.warn(`Invalid action type: "${(action as NumAction).type}". The original state is returned`)
      return state
  }
}

const Home = (): JSX.Element => {
  const [state, dispatch] = useReducer(numReducer, initialNum, initNum)

  return (
    <div>
      <p>Home</p>
      <p>{state.num}</p>
      <button onClick={() => void dispatch({ type: 'increment', payload: 7 })}>+7</button>
      <button onClick={() => void dispatch({ type: 'decrementBy1' })}>-1</button>
    </div>
  )
}

const About = (): JSX.Element => {
  const [state, dispatch] = useReducer(numReducer, initialNum, initNum)

  return (
    <div>
      <p>About</p>
      <p>{state.num}</p>
      <button onClick={() => void dispatch({ type: 'increment', payload: 3 })}>+3</button>
      <button onClick={() => void dispatch({ type: 'decrementBy1' })}>-1</button>
    </div>
  )
}

export default App
```

---

## useCallback

- `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`
- 将 `函数` 缓存, 只有依赖改变时才更新 (修改) 该 `函数`
- 对于将 `函数` 传递给被 `memo` 优化过的 `子组件` 时特别有用

基本使用

- 导入

```tsx
import { useCallback } from 'react'
```

- 接收 `2` 个参数
  - 第一个参数: 需要进行缓存的 `函数`
  - 第二个参数: 一个 `数组` , 包含了一些依赖, 只有其中的值更新了才会更新 (修改) 这个 `函数`
    - <span style="color: #f90">必须要包含所有可能会因为外部变化的依赖值</span>
    - 传入一个空数组 `[]` 代表让该被缓存的 `函数` 永远不更新

完整示例

```tsx
import { useState, memo, useCallback } from 'react'


const App = (): JSX.Element => {
  console.log('App re-rendered')

  const [num, setNum] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const increment = useCallback((): void => {
    setNum(num + 1)
  }, [num])

  const decrement = useCallback((): void => {
    setCount(count - 1)
  }, [count])

  return (
    <>
      <p>num: {num}</p>
      <p>count: {count}</p>
      <hr />
      <Home handler={increment} />
      <hr />
      <About handler={decrement} />
    </>
  )
}

const Home = memo((props: { handler: () => void }): JSX.Element => {
  console.log('Home re-rendered')

  return (
    <div>
      <p>Home</p>
      <button onClick={() => void props.handler()}>App's num +1</button>
    </div>
  )
})

const About = memo((props: { handler: () => void }): JSX.Element => {
  console.log('About re-rendered')

  return (
    <div>
      <p>About</p>
      <button onClick={() => void props.handler()}>App's count -1</button>
    </div>
  )
})

export default App
```

---

## useMemo

- 可以视为 `useCallback` 的底层实现

```typescript
function useCallback(fn, arr) {
  return useMemo(() => fn, arr)
}
```

- 将 `创建函数` 的 `返回值` 缓存, 只有依赖改变时才会重新执行 `创建函数` 计算 `返回值`

基本使用

- 导入

```tsx
import { useMemo } from 'react'
```

- 接收 `2` 个参数
  - 第一个参数: 需要进行
  - 第二个参数: 一个 `数组` , 包含了一些依赖, 只有其中的值更新了才会重新执行 `创建函数` 计算 `返回值`
    - <span style="color: #f90">必须要包含所有可能会因为外部变化的依赖值</span>
    - 传入一个空数组 `[]` 代表让该被缓存的 `返回值` 永远不更新
- <span style="color: #0ff;">\<TypeScript></span> 类型会根据 `返回值` 自动推断, 也可以显示指定

```typescript
function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T
```

完整示例

```tsx
import { useState, memo, useMemo } from 'react'


const App = (): JSX.Element => {
  console.log('App re-rendered')

  const [num, setNum] = useState<number>(0)

  const increment = useMemo(() => (): void => {
    setNum(num + 1)
  }, [num])
  const user = useMemo(() => ({ name: 'Aelita', age: 18 }), [])

  return (
    <>
      <p>num: {num}</p>
      <hr />
      <Home handler={increment} />
      <hr />
      <About user={user} />
    </>
  )
}

const Home = memo((props: { handler: () => void }): JSX.Element => {
  console.log('Home re-rendered')

  return (
    <div>
      <p>Home</p>
      <button onClick={() => void props.handler()}>App's num +1</button>
    </div>
  )
})

const About = memo((props: { user: { name: string, age: number } }): JSX.Element => {
  console.log('About re-rendered')

  return (
    <div>
      <p>About</p>
      <p>{props.user.name}</p>
      <p>{props.user.age}</p>
    </div>
  )
})

export default App
```

---

## useRef

- 用于访问 `DOM`
  - 如果需要在 `ref` 被改变时执行操作, 则需要使用 `回调ref` , 而不是 `useRef`
- 用于存储一个可变的值, 值会被保存在 `ref.current` 属性中
  - 除非手动修改, 否则永远不会改变
- <span style="color: #f90">`ref` 发生改变时, 不会收到任何通知, 也不会引发组件重新渲染</span>

基本使用

- 导入

```tsx
import { useRef } from 'react'
```

- 接收 `1` 个参数, 为 `初始值`
- <span style="color: #0ff;">\<TypeScript></span> 需要显示指定, 且分两种情况
  - 如果用于访问 `DOM` , 则需要指定的越细致越好, 且不需要 `null` 作为 `联合类型`
    - 比如 `HTMLParagraphElement` 就比 `HTMLElement` 好
  - 如果用于存储一个可变的值, 则需要指定该值的类型, 且保证 `初始值` 属于这个类型
    - 需要指定所有可能出现的类型, 包括 `null` / `undefined` 等

```tsx
const pRef = useRef<HTMLParagraphElement>(null)
const timerInterval = useRef<number | null>(null)
```

完整示例

```tsx
import { useRef, useState, useEffect } from 'react'


const App = (): JSX.Element => {
  const pRef = useRef<HTMLParagraphElement>(null)

  const [num, setNum] = useState(0)
  const previousNum = useRef<number | null>(null)

  useEffect(() => {
    previousNum.current = num
  }, [num])

  return (
    <>
      <p ref={pRef}>App</p>
      <button onClick={() => void console.log(pRef)}>Print pRef</button>
      <hr />
      <p>previous num: {previousNum.current}</p>
      <p>current num: {num}</p>
      <button onClick={() => void setNum(num + 1)}>num +1</button>
    </>
  )
}

export default App
```

---

## useImperativeHandle

- 自定义暴露给 `父组件` 的 `ref` 的 `实例值`
- 必须配合 `forwardRef` 使用

基本使用

- 导入

```tsx
import { forwardRef, useImperativeHandle } from 'react'
```

- 接收 `3` 个参数
  - 第一个参数: 需要自定义的 `ref` , 由 `forwardRef` 提供为 `组件` 的 `第二个参数`
  - 第二个参数: 一个 `函数` , 返回自定义的 `实例值`
  - 第三个参数 (可选): 一个 `数组` , 内置依赖值, 变化时会重新通过第二个参数的 `函数` 计算 `实例值`
    - 忽略的话, 即为每次组件重新渲染都重新计算
- <span style="color: #0ff;">\<TypeScript></span> 需要显示指定为 `实例值` 的类型, 同时 `父组件` 的 `ref` 也需要是这个类型

```typescript
function useImperativeHandle<T, R extends T>(ref: Ref<T>|undefined, init: () => R, deps?: DependencyList): void
```

完整示例

```tsx
import { forwardRef, useRef, useImperativeHandle } from 'react'


// Types
interface FocusHandle {
  myFocus(): void
}

const App = (): JSX.Element => {
  const homeRef = useRef<FocusHandle>(null)

  const btnClick = (): void => {
    if (!homeRef.current) {
      throw new Error('input is not rendered')
    }

    homeRef.current.myFocus()
  }

  return (
    <>
      <Home ref={homeRef} />
      <hr />
      <button onClick={() => void btnClick()}>focus</button>
    </>
  )
}

const Home = forwardRef<FocusHandle, {}>((props, homeRef): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle<FocusHandle, FocusHandle>(homeRef, () => {
    return {
      myFocus: () => {
        if (!inputRef.current) {
          throw new Error('input is not rendered')
        }

        inputRef.current.focus()
      }
    }
  })

  return (
    <div>
      <p>Home</p>
      <input type="text" placeholder="Enter some contents" ref={inputRef} />
    </div>
  )
})

export default App
```

---

## 自定义Hook

- 将 `组件` 逻辑提取到可重复使用的 `函数` 中
- 以 `use` 开头的 `函数` 就被 `React` 认为是一个 `Hook`
- 在 `Hook` 中可以使用其他 `Hook` (也必须在最顶层)
  - 换言之, 若抽取的代码中有 `Hook` , 则必须使用 `自定义Hook`

完整示例

```tsx
import { useEffect, createContext, useContext } from 'react'


// Types
interface User {
  name: string
  age: number
}

interface Info {
  gender: string
}

const UserContext = createContext<User>({} as User)
const InfoContext = createContext<Info>({} as Info)

const App = (): JSX.Element => {
  return (
    <UserContext.Provider value={{ name: 'Aelita', age: 18 }}>
      <InfoContext.Provider value={{ gender: 'male' }}>
        <Home />
        <hr />
        <About />
      </InfoContext.Provider>
    </UserContext.Provider>
  )
}

const Home = (): JSX.Element => {
  const [user, info] = useGetContext()

  return (
    <div>
      <p>Home</p>
      <p>{user.name}</p>
      <p>{user.age}</p>
      <p>{info.gender}</p>
    </div>
  )
}

const About = (): JSX.Element => {
  const [{ name, age }, { gender }] = useGetContext() // 解构

  return (
    <div>
      <p>About</p>
      <p>{name}</p>
      <p>{age}</p>
      <p>{gender}</p>
    </div>
  )
}

// custom Hook
const useGetContext = (): [User, Info] => [useContext(UserContext), useContext(InfoContext)]

export default App
```

















































