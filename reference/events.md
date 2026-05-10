# 事件

FluxPress 使用事件驱动架构，通过 Node.js 的 `EventEmitter` 实现 CLI 与主题之间的解耦。主题通过监听事件来执行自定义的生成逻辑。

## 事件系统概览

当执行 `fluxpress generate` 时，CLI 会：

1. 创建一个 `EventEmitter` 实例
2. 加载主题目录下 `scripts/events/` 中的所有 `.js` 文件
3. 将 `EventEmitter` 实例传递给每个事件脚本
4. 触发相应的事件（如 `generate`）

主题通过导出函数接收 `EventEmitter`，并注册事件监听器：

```javascript
// theme/scripts/events/generate.js
export default function (fluxpress) {
  fluxpress.on('generate', async () => {
    // 生成逻辑...
  })
}
```

## 当前支持的事件

### generate

- **触发时机**: 执行 `fluxpress generate` 命令时
- **用途**: 主题在此事件中执行所有页面生成逻辑

**示例**（来自 classic 主题）：

```javascript
export default function (fluxpress) {
  fluxpress.on('generate', async () => {
    const data_issues = await loadDataFromFile('issues')
    
    await generatePosts(data_issues)       // 生成文章详情页
    await generatePage(data_issues)        // 生成首页和分页
    await generateArchives(data_issues)    // 生成归档页
    await generateCategories(data_issues)  // 生成分类页
    await generateTags(data_issues)        // 生成标签页
    await generateAbout()                  // 生成关于页
    await generate404()                    // 生成 404 页
    await generateCNAME()                  // 生成 CNAME 文件（如配置）
    
    // 拷贝主题静态资源到输出目录
    await fs.copy(THEME_SOURCE_PATH, OUTPUT_PATH)
  })
}
```

## 在主题中使用事件

### 1. 创建事件脚本

在主题目录下创建 `scripts/events/` 文件夹，并添加事件处理脚本：

```
theme-name/
├── scripts/
│   └── events/
│       └── generate.js    # 处理 generate 事件
└── ...
```

### 2. 导出事件处理函数

事件脚本必须导出一个默认函数，接收 `fluxpress`（EventEmitter 实例）作为参数：

```javascript
export default function (fluxpress) {
  // 注册事件监听器
  fluxpress.on('generate', async () => {
    // 你的生成逻辑
  })
}
```

### 3. 注册多个监听器

同一个事件可以注册多个监听器，它们会按注册顺序依次执行：

```javascript
export default function (fluxpress) {
  fluxpress.on('generate', async () => {
    console.log('第一个监听器')
  })
  
  fluxpress.on('generate', async () => {
    console.log('第二个监听器')
  })
}
```

也可以在不同的事件脚本文件中注册同一事件的监听器，CLI 会加载所有 `.js` 文件。

## 可用的 API

在事件处理函数中，可以使用 `@fluxpress/core` 提供的工具函数：

```javascript
import {
  loadDataFromFile,      // 加载 data/ 目录中的数据
  OUTPUT_PATH,           // public/ 目录路径
  readFluxPressThemeConfig,  // 读取主题配置
  readThemePath,         // 读取主题路径
} from 'fluxpress'
```

**示例**：

```javascript
import { loadDataFromFile, OUTPUT_PATH } from 'fluxpress'
import path from 'node:path'
import fs from 'fs-extra'

export default function (fluxpress) {
  fluxpress.on('generate', async () => {
    // 加载 Issues 数据
    const data = await loadDataFromFile('issues')
    
    // 生成 HTML 文件到 public/ 目录
    await fs.outputFile(
      path.join(OUTPUT_PATH, 'index.html'),
      '<h1>Hello, FluxPress!</h1>'
    )
  })
}
```

## 未来计划

我们计划在后续版本中添加更多事件，例如：

- `beforeFetch` - 数据获取前触发，可用于修改请求参数
- `afterFetch` - 数据获取后触发，可用于数据预处理
- `beforeGenerate` - 生成前触发，可用于准备工作
- `afterGenerate` - 生成后触发，可用于后处理（如压缩、优化）

敬请期待！
