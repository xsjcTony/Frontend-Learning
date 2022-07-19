# 30/03/2022



## 给 `<el-table>` 的展开行触发按钮添加文字

- `element-plus` 版本 `v2.0.5`

思路

- 通过 `伪元素` 添加文字
- 指定列的宽度
- 指定列的 `类名`
- 通过 `:deep` 查找对应元素
- 使用 `flex` 布局来排版
- 设置 `伪元素` 的 `line-height` 来微调

`<template>`

```html
<el-table-column type="expand" class-name="expand-column" width="150">
    <!-- 列的内容, 一般为插槽 -->
<el-table-column/>
```

`<style>`

```scss
.el-table {
    :deep(td.expand-column) { // 必须要查找 td, 否则标题栏也会有
        .cell {
        		display: flex; // 不能设置 align-items: center, 否则不能微调
        
        		&::after {
          			content: 'Privileges' // 添加的文字内容
          			line-height: 18px; // 用于微调水平居中
        		}
        }
    }
}
```

效果

![el-table_expand_column_custom_text.png](D:\xsjcTony\it666\Frontend-Learning\images\el-table_expand_column_custom_text.png)





## 修复 `<el-table>` 展开行触发按钮宽度改变后可点击范围区域旋转的问题

- `element-plus` 版本 `v2.0.5`

思路

- 取消外层 `wrapper` 的 `transform`
- 将 `transform` 应用于 `el-icon` 图标上

`<style>`

```scss
.el-table{
    :deep(.el-table__expand-icon--expanded) {
    		transform: none; // 取消 wrapper 的旋转
      	
      	.el-icon {
        		transform: rotate(90deg); // 将图标本身旋转
      	}
    }
}
```

效果

![el-table_expand_column_fix_clickable_area_rotation.png](D:\xsjcTony\it666\Frontend-Learning\images\el-table_expand_column_fix_clickable_area_rotation.png)



---

# 26/04/2022



## `ant design` 在 `Vite` 下的样式自动 `按需导入`

- `ant design` 版本: `v4.20.0`
- `vite` 版本: `v2.9.5`

思路

- 通过插件自动导入 `css.js` 文件, 其中包含样式

插件

```shell
npm i -D vite-plugin-imp
```

`vite.config.ts`

```typescript
import vitePluginImp from 'vite-plugin-imp'


export default defineConfig({
  plugins: [
    // ...
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${ name }/style/css` // css.js
        }
      ]
    })
  ]
})
```



## `ant design` 在 `Vite` 下自定义主题

- 版本同上

思路

- 在上面的基础上, 改为使用 `less` 文件
- 通过 `vite` 的 `预处理器选项` 来操作变量覆盖

安装 `less`

```shell
npm i -D less
```

`vite.config.ts`

```typescript
import vitePluginImp from 'vite-plugin-imp'


export default defineConfig({
  plugins: [
    // ...
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${ name }/style` // 修改为使用less文件: index.js => import './index.less'
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      // 配置 less 相关配置
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  }
})
```



---

# 11/05/2022



## 基于 `React Router v6` 的 `路由守卫`

- `react-router-dom` 版本: `^6.3.0`
- `react` 版本: `^18.1.0`

思路

- 定义一个 `函数式组件` 作为 `路由守卫`
- 通过 `useLocation` 来获取 `location` 信息
- 通过 `<Navigate>` 组件来进行 `路由跳转`
  - 可以设置 `replace` 删除 `栈` 中的无用历史记录
  - 可以设置 `state` 来让跳转后的页面执行一些操作 (比如提示一些信息)
- 将该组件作为所有需要守卫的 `父路由` , 通过 `<Outlet>` 组件来渲染子路由

坑

- 尽量简洁, 不要包含不必要的 `Hook` 
  - 比如 `react-intl` 的 `useIntl` , 会导致很多的重复渲染
- 不要包含任何 `副作用` , 尤其是关于 `DOM` 的
  - 若实在需要则放在 `useEffect` 中, 尽量放到 `子路由` 的组件中处理
- 不要使用 `useNavigate` 返回的函数进行函数式导航
  - 属于 `副作用` 范畴

示例

```tsx
let authenticated = false

const RouteGuard = (): JSX.Element => {
  /**
   * Utils
   */
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()


  /**
   * Data
   */
  const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn)
  const { pathname } = location


  /**
   * OAuth cookie
   */
  const t = Cookies.get('token')
  if (t) {
    authenticated = false
    localStorage.setItem('token', t)
    Cookies.remove(t)
  }


  /**
   * Authentication
   */
  if (!authenticated) {
    try {
      // Authentication request here
    } catch (err) {
      dispatch(setLoggedIn(false))
    }

    authenticated = true
  }

  
  /**
   * Guard
   */
  if (pathname === '/login' || pathname === '/register') {
    if (loggedIn) {
      return <Navigate to="/admin" replace />
    } else {
      return <Outlet />
    }
  }

  if (!loggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          type: 'prompt',
          promptInfo: {
            type: 'error',
            intlId: 'error.need-login',
            duration: 3,
            path: pathname,
            noPrivilege: false
          }
        }}
      />
    )
  }

  return <Outlet />
}


/**
 * App Component
 */
const App = (): JSX.Element => (
  <Routes>
    <Route element={<RouteGuard />}> {/* Wrap all routes that need to be guardede */}
      <Route index element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Welcome />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="privileges" element={<Privileges />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Page404 lang />} />
    </Route>
  </Routes>
)

export default App
```



---

# 13/05/2022



## `Redux` 循环引用问题

- 比如封装了一个网络请求器, 若在请求器中用到了 `redux` 中的数据
- 在编写 `redux-thunk` 之类的异步代码时, 调用封装的 `请求器` 会报错
  - `cannot access xxx before initialization`



---

# 31/05/2022



## `Vite` + `React TS` 的 `alias` 配置方案

- 例如 `@/components` 中的 `@` 即为 `/src` 的意思

方案

- 在 `tsconfig.json` 中配置 `baseUrl` 为 `./`

- 配置 `paths` 中的 `@/*` 为 `["src/*"]`

  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      // ...
      "baseUrl": "./", // 和 tsconfig.json 文件相同的目录, 一般为根目录
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
  ```

- 安装 `vite-tsconfig-paths` 插件 [vite-tsconfig-paths - npm](https://www.npmjs.com/package/vite-tsconfig-paths)

- 在 `vite.config.ts` 中配置该插件, 将 `tsconfig.json` 中的 `paths` 映射到 `vite` 的 `resolve.alias` 中

  ```ts
  // vite.config.ts
  import tsconfigPaths from 'vite-tsconfig-paths'
  
  export default defineConfig({
    plugins: [
      // ...
      tsconfigPaths()
    ]
  })
  ```



---

# 11/06/2022



## `Sequelize` 中使用 `Transaction` 必须要结束

- 无论 `commit` 或 `rollback` , 一定要进行其中之一, 如果中途 `return` 掉, 那么过多的 `transaction` 会导致数据库阻塞



## `Grid` 布局中的横向分割线解决方案

方案

- 将横向分割线的 `grid-column` 设置为 **横跨整个 `grid`**

示例

- `grid` 为 **两列N行**
- 那么分割线就需要设置为 `grid-column: 1 / span 2`

效果

- 蓝色为分割线

![dispaly-grid_horizontal_divider](D:\xsjcTony\it666\Frontend-Learning\images\dispaly-grid_horizontal_divider.png)



---

# 20/07/2022



## `Vite` 开发时让其他设备通过IP地址访问

- 需要将 `vite.config.ts` 中的 `server` 设置为 `0.0.0.0` 或 `true`

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  server: {
    host: true
  }
})
```



## `Retina` 屏幕上 `1px` 的解决方案

- 使用 `postcss-write-svg` 在 `css` 中直接画出 `1px` 的 `svg`

示例

- `1px` 的 `border`

```css
@svg 1px-border {
    width: 4px;
    height: 4px;

    @rect {
        fill: transparent;
        width: 100%;
        height: 100%;
        stroke-width: 25%;
        stroke: var(--color, #000);
    }
}

.onepx-test-svg {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color red)) 1 stretch;
}
```































