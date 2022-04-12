# React - 样式 (Style)



> [样式与 CSS – React](https://zh-hans.reactjs.org/docs/faq-styling.html)



## 基本概念

- `React` 中并没有像 `Vue` 的 `SFC` 中提供了特定的 `<style>` 标签编写 `css` 代码
- 在 `React` 中, `css` 的写法千奇百怪

---

## 内联样式

优点

- 没有层级关系, 不会被覆盖或冲突
- 可以动态获取 `state` 中的状态

缺点

- 命名都需要使用 `camelCase`
- 某些样式没有提示
- 大量样式导致代码混乱
- `伪类` / `伪元素` 之类的样式无法编写

```tsx
import { Component } from 'react'


interface AppState {
  color: string
}

class App extends Component<{}, AppState> {
  public state: Readonly<AppState> = {
    color: '#f00'
  }

  private btnClick = (): void => {
    this.setState({
      color: '#00f'
    })
  }

  public render() {
    return (
      <>
        <p style={ { fontSize: 50, color: this.state.color } }>I'm paragraph 1</p>
        <p style={ { fontSize: 50, color: '#0f0' } }>I'm paragraph 2</p>
        <button onClick={ this.btnClick }>Button</button>
      </>
    )
  }
}

export default App
```

---

## 外链样式

- 将 `css` 代码写到一个单独的文件当中, 在使用的时候导入进来

优势

- 编写简单
- 有代码提示
- 支持所有语法

劣势

- 无法动态获取当前 `state` 中的状态
- 属于全局 `css` , 样式之间会相互影响

`Home.tsx`

```tsx
import { Component } from 'react'
import './Home.css'


class Home extends Component {
  public render() {
    return (
      <>
        <p>I'm Home's paragraph</p>
        <a href="#">I'm Home's hyperlink</a>
      </>
    )
  }
}

export default Home
```

`Home.css`

```css
p {
    font-size: 50px;
    color: #f00;
}

a {
    color: #ff0;
}
```

---

## CSS Modules

- `Vite` 中默认已经配置好了 `CSS Modules` 的配置
- 任何以 `.module.css` 后缀名结尾的文件都会视为 `CSS Modules`

优点

- 编写简单
- 有代码提示
- 支持所有语法
- 样式不是全局的, 不会互相污染

劣势

- 无法动态获取当前 `state` 中的状态

`vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
})
```

`Home.tsx`

```tsx
import { Component } from 'react'
import { titleAaC, link } from './Home.module.css'


class Home extends Component {
  public render() {
    return (
      <>
        <p className={ titleAaC }>I'm Home's paragraph</p>
        <a href="#" className={ link }>I'm Home's hyperlink</a>
      </>
    )
  }
}

export default Home
```

`Home.module.css`

```css
.title-aa-c {
    font-size: 50px;
    color: #f00;
}

.link {
    color: #ff0;
}
```

---

## CSS-in-JS

- 一种利用 `JavaScript` 来编写 `CSS` 的方式

优势

- 让 `CSS` 具备样式嵌套, 函数定义, 逻辑服用, 动态修改状态等特性
- 某种层面上, 提供了比 `Less` / `SASS` 更强大的功能



### styled-components

[styled-components](https://styled-components.com/)

[styled-components - npm](https://www.npmjs.com/package/styled-components)

[styled-components/styled-components: Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress 💅](https://github.com/styled-components/styled-components)

安装

```shell
npm i styled-components
npm i -D @types/styled-components
```

#### 基本使用

```tsx
import { Component } from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
    p {
        font-size: 50px;
        color: #f00;
    }

    a {
        font-size: 25px;
        color: #0f0;
    }
`

class Home extends Component {
  public render() {
    return (
      <StyledDiv>
        <p>I'm Home's paragraph</p>
        <a href="#">I'm Home's hyperlink</a>
      </StyledDiv>
    )
  }
}

export default Home
```

#### props

- 由于 `styled-components` 原理是创建了一个 `组件` , 所以可以给 `组件` 传递 `props`
- 由于使用的是 `字符串模板` , 所以可以给进行 `插值`
- `插值` 中可以放入一个函数, 参数为 `props` , 返回值会被插入到 `CSS` 中

```tsx
import { Component } from 'react'
import styled from 'styled-components'


interface Props {
  color: string
}

const StyledDiv = styled.div`
    p {
        font-size: 50px;
        color: ${ props => props.color };
    }

    a {
        font-size: 25px;
        color: #0f0;
    }
`

class Home extends Component<{}, Props> {
  public state: Readonly<Props> = {
    color: '#f00'
  }

  private btnClick = (): void => {
    this.setState({
      color: '#0f0'
    })
  }

  public render() {
    return (
      <StyledDiv color={ this.state.color }>
        <p>I'm Home's paragraph</p>
        <a href="#">I'm Home's hyperlink</a>
        <button onClick={ this.btnClick }>Button</button>
      </StyledDiv>
    )
  }
}

export default Home
```

#### attrs

- 通过 `.attrs()` 链式调用来给 `组件` 的 `props` 添加额外 `props`
- 可以是静态的也可以是动态的
- 原生 `DOM` 的属性也在这里添加
- 可以直接返回一个非 `函数` 的值, 或通过参数为 `props` 的 `函数` 返回这个值

```tsx
import { Component } from 'react'
import styled from 'styled-components'


/*
const StyledInput = styled.input.attrs({
  type: 'password'
})`
    color: #f90;
`
*/
const StyledInput = styled.input.attrs({
  type: 'password'
})`
    color: #f90;
`


class Home extends Component {
  public render() {
    return (
      <StyledInput />
    )
  }
}

export default Home
```

#### Theme

[styled-components: Advanced Usage](https://styled-components.com/docs/advanced#theming)

- 可以通过 `styled-components` 设置 `主题`
- 原理是使用了 `Context`
- 使用 `ThemeProvider` 提供 `主题` 内容
- 在 `组件` 中直接使用 `props.theme` 访问

`App.tsx`

```tsx
import { Component } from 'react'
import Home from './components/Home'
import About from './components/About'
import { ThemeProvider } from 'styled-components'


class App extends Component {
  public render() {
    return (
      <ThemeProvider theme={ { size: '100px', color: '#f00' } }>
        <Home />
        <About />
      </ThemeProvider>
    )
  }
}

export default App
```

`Home.tsx`

```tsx
import { Component } from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
    p {
        font-size: ${ props => props.theme.size };
        color: ${ props => props.theme.color };
    }
`

class Home extends Component {
  public render() {
    return (
      <StyledDiv>
        <p>I'm Home's paragraph</p>
      </StyledDiv>
    )
  }
}

export default Home
```

#### 继承

- `styled` 可以作为一个 `函数` 使用, 接收一个 `组件`
- 可以链式调用, 返回一个 `组件`
- 会继承传入 `组件` 的样式

```tsx
import { Component } from 'react'
import styled from 'styled-components'


const baseStyledDiv = styled.div`
    font-size: 100px;
    background: #00f;
`

const StyledDiv1 = styled(baseStyledDiv)`
    color: #f00;
`
const StyledDiv2 = styled(baseStyledDiv)`
    color: #0f0;
`

class App extends Component {
  public render() {
    return (
      <>
        <StyledDiv1>Div 1</StyledDiv1>
        <StyledDiv2>Div 2</StyledDiv2>
      </>
    )
  }
}

export default App
```



























































