# 插件开发规范

::: warning 开发中
FluxPress 的插件系统正在设计和开发中。本文档描述的是计划中的插件架构，当前版本尚未实现。
:::

## 设计理念

FluxPress 插件系统旨在提供灵活的扩展能力，允许开发者：

- 扩展数据获取能力（支持更多数据源）
- 在生成流程中注入自定义逻辑
- 为主题提供额外的数据和功能
- 集成第三方服务（如评论系统、统计分析等）

## 计划中的插件类型

### 1. 数据源插件

扩展 FluxPress 的数据获取能力，支持从更多来源获取数据。

**示例用例**：
- 从 GitHub Discussions 获取讨论数据
- 从 GitHub Projects 获取项目管理数据
- 从豆瓣 API 获取读书/观影记录
- 从 Notion 获取笔记数据

### 2. 生成器插件

在站点生成过程中注入自定义逻辑。

**示例用例**：
- 生成 RSS/Atom feed
- 生成 sitemap.xml
- 图片优化和压缩
- 代码块语法高亮增强

### 3. 工具插件

为主题提供额外的工具函数和数据处理能力。

**示例用例**：
- Markdown 渲染增强
- 数据过滤和排序
- 日期格式化
- SEO 优化工具

## 预期的插件结构

```
fluxpress-plugin-name/
├── src/
│   └── index.js           # 插件入口
├── package.json
└── README.md
```

## 预期的 API 设计

```javascript
// fluxpress-plugin-example/src/index.js
export default {
  name: 'example',
  
  // 注册自定义数据源
  registerDataSource(fluxpress) {
    fluxpress.addDataType('custom', async () => {
      // 获取自定义数据
      return { /* data */ }
    })
  },
  
  // 监听事件
  hooks: {
    beforeFetch(context) {
      // 数据获取前执行
    },
    afterFetch(context, data) {
      // 数据获取后执行
    },
    beforeGenerate(context) {
      // 生成前执行
    },
    afterGenerate(context) {
      // 生成后执行
    },
  },
}
```

## 预期的使用方式

在 `fluxpress.config.js` 中配置插件：

```javascript
export default {
  github: {
    owner: 'username',
    repo: 'repo',
  },
  theme: 'classic',
  plugins: [
    'fluxpress-plugin-rss',
    'fluxpress-plugin-sitemap',
    ['fluxpress-plugin-douban', {
      userId: 'your-douban-id',
    }],
  ],
}
```

## 官方计划中的插件

- **fluxpress-plugin-douban** - 获取豆瓣读书/电影数据
- **fluxpress-plugin-rss** - 生成 RSS feed
- **fluxpress-plugin-sitemap** - 生成 sitemap.xml
- **fluxpress-plugin-search** - 本地搜索功能

## 时间线

- **v0.2.0** - 插件系统基础架构
- **v0.3.0** - 官方插件发布
- **v0.4.0** - 插件市场和文档完善

敬请期待！
