# 主题开发规范

本文档介绍如何为 FluxPress 开发自定义主题。

## 主题目录结构

一个标准的 FluxPress 主题包含以下目录结构：

```
theme-name/
├── layout/                        # EJS 模板文件
│   ├── _partials/                 # 可复用的模板片段（如 header、footer）
│   ├── _widgets/                  # 小部件（如分页组件）
│   ├── html-container.ejs         # HTML 外层容器（<html>、<head>、<body>）
│   ├── page/                      # 首页模板
│   ├── posts/                     # 文章详情页模板
│   ├── archives/                  # 归档页模板
│   ├── categories/                # 分类页模板
│   ├── tags/                      # 标签页模板
│   ├── about/                     # 关于页模板
│   └── 404.ejs                    # 404 页面模板
├── scripts/
│   └── events/
│       └── generate.js            # 生成事件处理脚本
├── source/                        # 静态资源（CSS、JS、图片等）
│   ├── css/
│   └── favicon.ico
├── fluxpress.config.<theme>.js    # 主题配置文件模板
├── index.d.ts                     # TypeScript 类型定义（可选）
└── package.json
```

## 核心文件说明

### scripts/events/generate.js

主题的核心逻辑文件，处理 `generate` 事件，负责生成所有页面。

**必须导出默认函数**：

```javascript
export default function (fluxpress) {
  fluxpress.on('generate', async () => {
    // 你的生成逻辑
  })
}
```

## 数据结构

### Issues 数据

当 `need_data` 包含 `'issues'` 时，可通过 `loadDataFromFile('issues')` 获取：

```typescript
{
  version: string
  metadata: {
    fetch_time: string
    github: { owner: string; repo: string }
  }
  issues: Array<{
    id: number
    number: number
    title: string
    body: string
    created_at: string
    milestone: { id: number; title: string } | null
    labels: Array<{ id: number; name: string; color: string }>
    comments_list: Array<{
      id: number
      body: string
      user: { login: string; avatar_url: string }
      created_at: string
    }>
    // ...其他 GitHub Issue 字段
  }>
  labels: Array<{ id: number; name: string; color: string }>
  milestones: Array<{ id: number; title: string; description: string }>
}
```

### Users 数据

当 `need_data` 包含 `'users'` 时，可通过 `loadDataFromFile('users')` 获取用户信息、社交账号、关注者等数据。

## 发布主题

### 官方主题

官方主题发布到 npm，包名格式为 `@fluxpress/theme-<name>`。

**package.json 配置**：

```json
{
  "name": "@fluxpress/theme-classic",
  "version": "0.1.0",
  "type": "module",
  "files": [
    "layout/",
    "scripts/",
    "source/",
    "fluxpress.config.classic.js",
    "index.d.ts"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

### 社区主题

社区主题发布到 npm，包名格式为 `fluxpress-theme-<name>`。

**package.json 配置**：

```json
{
  "name": "fluxpress-theme-awesome",
  "version": "1.0.0",
  "type": "module",
  "files": [
    "layout/",
    "scripts/",
    "source/",
    "fluxpress.config.awesome.js",
    "index.d.ts"
  ],
  "keywords": ["fluxpress", "fluxpress-theme"]
}
```

## 最佳实践

1. **使用 TypeScript 类型定义** - 提供 `index.d.ts` 文件，方便用户获得类型提示
2. **模板复用** - 将公共部分抽取到 `_partials/` 和 `_widgets/`
3. **响应式设计** - 确保主题在移动端和桌面端都有良好体验
4. **性能优化** - 压缩 CSS/JS，优化图片，减少外部依赖
5. **文档完善** - 在 README 中说明主题特性、配置选项和使用方法

## 参考示例

查看官方 classic 主题的完整实现：

- [GitHub 仓库](https://github.com/fluxpress/theme-classic)
- [npm 包](https://www.npmjs.com/package/@fluxpress/theme-classic)
