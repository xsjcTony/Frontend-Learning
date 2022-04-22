# Redux (v8)



> [React Redux | React Redux](https://react-redux.js.org/)
>
> [Redux - A predictable state container for JavaScript apps. | Redux](https://redux.js.org/)



## 基本概念 

- 一个 `可预测` 的状态管理的容器
  - `可预测` : 数据在什么时候, 因为什么, 发生了什么改变, 都是可以控制和追踪的
- 通过 `store` 保存数据
- 通过 `action` 修改数据
- 通过 `reducer` 将 `store` 和 `action` 串联起来

```
                    -------------
        --------->  | Component |  ---------
       |            -------------           |
       |                                    ↓
-------------       -------------       -------------
|   Store   | <---- |  Reducer  | <---- |  Action   |
-------------       -------------       -------------
```

![redux_dataflow.gif](D:\xsjcTony\it666\Frontend-Learning\Notes\React\images\redux_dataflow.gif)

---

## 三大原则

[Three Principles | Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles)



### 单一数据源

- 整个应用程序的 `state` 只存储在一个 `store` 中
- 让整个应用程序的 `state` 变得方便维护, 追踪, 修改
- 并不是强制性的



### `State` 是只读的

- 唯一修改 `state` 的方法是触发 `action`
- 不要试图在任何其他地方通过任何其他方式来修改 `state`
- 可以保证所有修改都被集中化处理, 并按照严格的顺序来执行, 避免 `race condition`



### 使用纯函数执行修改

- `纯函数` : `返回值` 只依赖它的 `参数` , 并且执行过程中没有任何 `副作用`

- 通过 `reducer` 将旧的 `state` 和 `action` 联系在一起, 并返回一个新的 `state`
- `reducer` 可以拆分成多个更小的 `reducer` , 分别操作不同的 `state tree` 的一部分
- 但所有的 `reducer` 都应该是 `纯函数`

---

## 安装

- `React` 使用 `react-redux`
- 非 `React` 应用使用 `redux`

```shell
npm i redux
npm i react-redux
npm i @reduxjs/toolkit
```

---

## 基本使用

- `/src/store/index.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'


const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
```

- `/src/slices/counterSlice.ts`

```typescript
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
    }
  }
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
```

- `/src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'


const root = document.querySelector('#app')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
```

- `/src/App.tsx`

```tsx
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { decrement, increment } from './store/slices/counterSlice'


const App = (): JSX.Element => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => void dispatch(increment(5))}>+5</button>
      <button onClick={() => void dispatch(decrement(5))}>-5</button>
    </div>
  )
}

export default App
```

---

## Redux-thunk

[reduxjs/redux-thunk: Thunk middleware for Redux](https://github.com/reduxjs/redux-thunk)

[Writing Logic with Thunks | Redux](https://redux.js.org/usage/writing-logic-thunks#thunk-overview)

- 可以让 `dispatch` 接收一个 `方法`
- 在 `方法` 中可以随时调用 `dispatch` 和 `getState`
- `@reduxjs/toolkit` 中自带



用途

- 从 `组件` 中抽取一些和 `UI` 无关的复杂的逻辑
- 进行一些 `异步` 操作
- 包裹多次执行 `action` 的需求
- 包裹需要 `getState` 才能执行的需求

```
                    -------------
        --------->  | Component |  ---------------------------------
       |            -------------                                   |
       |                                                            ↓
-------------       -------------       -------------       -------------
|   Store   | <---- |  Reducer  | <---- |  异步请求   | <---- |  Action   |
-------------       -------------       -------------       -------------
```



基本使用

- 接 `基本使用` 中的例子

- `/src/slices/counterSlice.ts`

```typescript
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, AnyAction, ThunkAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'


interface CounterState {
  count: number
  name: string
}

const initialState: CounterState = {
  count: 0,
  name: 'Aelita'
}

type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /* 原来的 */,
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
})

export const { increment, decrement, changeName } = counterSlice.actions

export const fetchName = (name: string): AppThunk<void> => (dispatch, getState) => {
  setTimeout(() => {
    dispatch(changeName(name))
  }, 2000)
}

export default counterSlice.reducer
```

- `/src/App.tsx`

```tsx
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { decrement, fetchName, increment } from './store/slices/counterSlice'


const App = (): JSX.Element => {
  const count = useSelector((state: RootState) => state.counter.count)
  const name = useSelector((state: RootState) => state.counter.name)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      {/* 原来的 */}
      <p>{name}</p>
      <button onClick={() => void dispatch(fetchName('Tequila'))}>Set name to "Tequila"</button>
    </div>
  )
}

export default App
```

---

## Redux-saga

[Redux-Saga - An intuitive Redux side effect manager. | Redux-Saga](https://redux-saga.js.org/)

- 用于在 `redux` 中管理 `副作用`
- 可以执行 `异步` 操作
- 基于 `generator`
- 相比 `redux-thunk` 更好扩展和测试
- 本质是拦截 `dispatch` 派发的 `action` , 从而实现在 `reducer` 执行之前进行一些操作

安装

```shell
npm i redux-saga
```

基本方法

- `takeEvery` : 拦截每个指定的 `action`
- `takeLatest` : 拦截每个指定的 `action` , 并停止前一次的 `hanlder`
- `all` : 同时进行多个 `effect` , 传入一个 `数组`

基本使用

- 接 `基本使用` 中的例子

- 注册 `redux-saga` 中间件

```typescript
// /src/store/index.ts
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  // reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware) // 不可以使用...扩展运算符, 因为或破坏类型
})

// 注册完毕之后需要run
sagaMiddleware.run(mySaga)
```

- 准备一个 `触发器`

```typescript
// /src/store/slices/counterSlice.ts
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // reducer
    changeHobby: (state, action: PayloadAction<string>) => {
      state.hobby = action.payload
    },
    fetchHobby: () => {} // type为 'counter/fetchHobby'
  }
})
```

- 在 `saga.ts` 中编写 `拦截器` 以及 `处理逻辑`
  - 使用 `generator`

```typescript
import { takeEvery, put } from 'redux-saga/effects'
import { changeHobby } from './slices/counterSlice'


function* myHandler() {
  yield new Promise(resolve => setTimeout(resolve, 2000))
  yield put(changeHobby('TypeScript'))
}

export default function* mySaga() fetchHobby
  yield takeEvery('counter/changeHobbyTrigger', myHandler)
}
```

- 在 `组件` 中触发 `触发器`

```tsx
// /src/App.tsx
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from './store'
import { fetchHobby } from './store/slices/counterSlice'


const App = (): JSX.Element => {
  // 之前的
  const hobby = useSelector((state: RootState) => state.counter.hobby)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      {/* 之前的 */}
      <p>{hobby}</p>
      <button onClick={() => void dispatch(fetchHobby())}>Set hobby to "TypeScript"</button>
    </div>
  )
}

export default App
```



























































