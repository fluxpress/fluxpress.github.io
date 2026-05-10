# 主题配置

每个主题都有自己的配置文件 `fluxpress.config.<theme>.js`，用于配置主题特定的选项。本文档以官方 `classic` 主题为例说明配置方法。

## classic 主题配置

### 配置文件示例

```javascript
export default {
  need_data: ['issues'],
  site: {
    lang: 'zh',
    title: 'FluxPress',
    copyright: '2024',
    author: 'LaoLiang',
    cname: 'example.com',  // 可选
    ipc: '京ICP备xxxxxxxx号',  // 可选
  },
  per_page: 10,
}
```

## 配置字段

### need_data

- **类型**: `Array<'issues' | 'users'>`
- **必填**: 是
- **默认值**: `['issues']`

指定需要从 GitHub 获取的数据类型。执行 `fluxpress fetch` 时会根据此配置拉取对应数据。

**支持的数据类型**:
- `'issues'` - GitHub Issues、Labels、Milestones 数据（用于博客文章）
- `'users'` - GitHub 用户信息、社交账号、关注者数据

**示例**:
```javascript
need_data: ['issues'],           // 仅获取 Issues 数据
// 或
need_data: ['issues', 'users'],  // 同时获取 Issues 和用户数据
```

::: tip
classic 主题当前仅使用 `issues` 数据。`users` 数据支持已在核心库中实现，但主题模板尚未集成。
:::

### site

站点基本信息配置。

#### site.lang

- **类型**: `string`
- **必填**: 是

站点语言代码，用于 HTML `<html lang="...">` 属性。

**示例**:
```javascript
site: {
  lang: 'zh',   // 中文
  // 或
  lang: 'en',   // 英文
}
```

#### site.title

- **类型**: `string`
- **必填**: 是

站点标题，显示在页面标题、导航栏等位置。

**示例**:
```javascript
site: {
  title: '我的技术博客',
}
```

#### site.copyright

- **类型**: `string`
- **必填**: 是

版权信息，显示在页脚。通常填写年份或版权声明文字。

**示例**:
```javascript
site: {
  copyright: '2024',
  // 或
  copyright: '2024 LaoLiang. All rights reserved.',
}
```

#### site.author

- **类型**: `string`
- **必填**: 是

站点作者名称，显示在关于页面和页脚。

**示例**:
```javascript
site: {
  author: 'LaoLiang',
}
```

#### site.cname

- **类型**: `string`
- **必填**: 否

自定义域名。配置后会在生成时自动创建 `public/CNAME` 文件，用于 GitHub Pages 自定义域名。

**示例**:
```javascript
site: {
  cname: 'blog.example.com',
}
```

生成的 `public/CNAME` 文件内容：
```
blog.example.com
```

::: tip
如果不使用 GitHub Pages 或不需要自定义域名，可以省略此配置。
:::

#### site.ipc

- **类型**: `string`
- **必填**: 否

ICP 备案号，显示在页脚（中国大陆网站需要）。

**示例**:
```javascript
site: {
  ipc: '京ICP备12345678号',
}
```

### per_page

- **类型**: `number`
- **必填**: 是
- **推荐值**: `10`

每页显示的文章数量，用于首页、分类页、标签页的分页计算。

**示例**:
```javascript
per_page: 10,  // 每页显示 10 篇文章
```

## 完整示例

```javascript
/**
 * @type import('@fluxpress/theme-classic').ThemeConfig
 */
export default {
  need_data: ['issues'],
  site: {
    lang: 'zh',
    title: '我的技术博客',
    copyright: '2024',
    author: 'LaoLiang',
    cname: 'blog.example.com',
    ipc: '京ICP备12345678号',
  },
  per_page: 10,
}
```

::: tip TypeScript 类型提示
在配置文件顶部添加 JSDoc 注释可以获得 IDE 的类型提示和自动补全：

```javascript
/**
 * @type import('@fluxpress/theme-classic').ThemeConfig
 */
export default {
  // ...
}
```
:::

## 其他主题

不同主题各有其配置字段，使用其他主题时请参考对应主题的文档。

官方主题文档：
- [classic 主题](/theme/official/classic)
- [doclite 主题](/theme/official/doclite) — Coming soon...
