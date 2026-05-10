# fluxpress

`fluxpress` 是 FluxPress 的核心 CLI 工具，提供数据获取、静态站点生成和本地预览功能。

## 安装

通过 npm 安装：

```bash
npm install fluxpress
```

或作为全局命令安装：

```bash
npm install -g fluxpress
```

## 概览

```
fluxpress <command>

Commands:
  fluxpress fetch     从 GitHub 拉取数据并保存到本地
  fluxpress generate  根据本地数据和主题生成静态站点
  fluxpress preview   启动本地服务器预览生成的站点
```

## fluxpress fetch

从 GitHub 拉取数据，保存为 JSON 文件到项目的 `data/` 目录。

```bash
fluxpress fetch
```

**执行流程**：

1. 清空 `data/` 目录（全量重新拉取）
2. 读取 `fluxpress.config.<theme>.js` 中的 `need_data` 配置
3. 按配置逐一从 GitHub API 获取对应数据
4. 将数据序列化为 JSON 文件保存到 `data/` 目录

**输出文件**：

| `need_data` 值 | 输出文件 |
|---------------|---------|
| `'issues'` | `data/issues.json` |
| `'users'` | `data/users.json` |

**环境变量**：

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `GITHUB_TOKEN` | 推荐 | GitHub Personal Access Token，用于提高 API 速率限制 |

::: tip
未设置 `GITHUB_TOKEN` 时仍可运行，但公开仓库的 API 请求受限于每小时 60 次。对于内容较多的博客，强烈建议配置 token。
:::

## fluxpress generate

读取 `data/` 目录中的本地数据，结合主题模板生成静态文件到 `public/` 目录。

```bash
fluxpress generate
```

**执行流程**：

1. 查找主题目录（依次查找 `themes/<theme>/`、`node_modules/@fluxpress/theme-<theme>/`、`node_modules/fluxpress-theme-<theme>/`）
2. 清空 `public/` 目录（全量重新生成）
3. 加载主题 `scripts/events/` 目录下所有 `.js` 文件中的事件处理器
4. 触发 `generate` 事件，由主题脚本完成所有页面的生成

**主题路径查找顺序**：

```
1. themes/<theme>/
2. node_modules/@fluxpress/theme-<theme>/
3. node_modules/fluxpress-theme-<theme>/
```

::: tip 开发模式
设置 `NODE_ENV=development` 时，主题路径解析为项目根目录，方便在项目根目录直接开发主题。
:::

## fluxpress preview

启动一个本地静态文件服务器，用于预览生成的站点。

```bash
fluxpress preview
```

**默认端口**: `9895`

启动后访问 `http://localhost:9895` 即可预览站点。

::: tip
`preview` 命令仅用于本地预览，不会自动监听文件变化并重新生成。如需修改后自动更新，需手动重新执行 `fluxpress generate`。
:::

## 完整工作流

```bash
# 1. 从 GitHub 获取最新数据
npx fluxpress fetch

# 2. 根据数据生成静态站点
npx fluxpress generate

# 3. 本地预览
npx fluxpress preview
```

## 在 package.json 中配置脚本

推荐在 `package.json` 中配置常用脚本：

```json
{
  "scripts": {
    "fetch": "fluxpress fetch",
    "generate": "fluxpress generate",
    "preview": "fluxpress preview",
    "build": "fluxpress fetch && fluxpress generate"
  }
}
```

使用方式：

```bash
npm run build    # 拉取数据并生成站点
npm run preview  # 本地预览
```
