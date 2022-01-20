# ECMAScript Module - 技巧



## __dirname的代替方案

```js
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
```



## __filename的代替方案

```js
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
```

