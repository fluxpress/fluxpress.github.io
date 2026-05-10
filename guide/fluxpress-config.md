# 站点配置

FluxPress 的站点配置文件位于项目根目录的 `fluxpress.config.js`，用于配置 GitHub 数据源和主题选择。

## 配置文件示例

```javascript
export default {
  github: {
    owner: 'your-github-username',
    repo: 'your-repo-name',
  },
  theme: 'classic',
}
```

## 配置字段

### github

- **类型**: `Object`
- **必填**: 是

GitHub 仓库配置，用于指定从哪个仓库获取数据。

#### github.owner

- **类型**: `string`
- **必填**: 是

GitHub 仓库所有者，可以是用户名或组织名。

**示例**:
```javascript
github: {
  owner: 'liangpengyv',  // 用户名
  // 或
  owner: 'fluxpress',    // 组织名
}
```

#### github.repo

- **类型**: `string`
- **必填**: 是

GitHub 仓库名称。

**示例**:
```javascript
github: {
  owner: 'liangpengyv',
  repo: 'git-blog',
}
```

### theme

- **类型**: `string`
- **必填**: 是

使用的主题名称。FluxPress 会按以下顺序查找主题：

1. `themes/<theme>/` - 本地主题目录
2. `node_modules/@fluxpress/theme-<theme>/` - 官方主题包
3. `node_modules/fluxpress-theme-<theme>/` - 社区主题包

**示例**:
```javascript
theme: 'classic',  // 使用官方 classic 主题
```

::: tip 开发模式
当设置环境变量 `NODE_ENV=development` 时，主题路径会解析为项目根目录，方便主题开发调试。
:::

## 完整示例

```javascript
export default {
  github: {
    owner: 'liangpengyv',
    repo: 'git-blog',
  },
  theme: 'classic',
}
```

## 环境变量

### GITHUB_TOKEN

FluxPress 需要 GitHub Personal Access Token 来访问 GitHub API。

**开发环境配置**:

在项目根目录创建 `.env` 文件：

```bash
GITHUB_TOKEN=your_github_personal_access_token
```

::: warning 安全提示
- 切勿将 `.env` 文件提交到远程仓库
- 请将 `.env` 添加到 `.gitignore` 文件中
:::

**GitHub Actions 配置**:

在 GitHub Actions 工作流中使用内置的 `GITHUB_TOKEN`：

```yaml
- name: Fetch and Generate
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    npm run fetch
    npm run generate
```

::: tip Token 权限
对于公开仓库，无需 token 也可以访问数据，但会受到 GitHub API 的速率限制（每小时 60 次请求）。使用 token 后限制提升至每小时 5000 次。
:::

## 相关配置

除了 `fluxpress.config.js`，每个主题还有自己的配置文件 `fluxpress.config.<theme>.js`，用于配置主题特定的选项。详见 [主题配置](./theme-config.md)。
