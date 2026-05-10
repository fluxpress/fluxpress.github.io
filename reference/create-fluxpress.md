# create-fluxpress

`create-fluxpress` 是 FluxPress 的项目脚手架工具，通过交互式命令行向导快速初始化一个新项目。

## 使用方式

无需提前安装，直接使用 `npm create` 执行：

```bash
npm create fluxpress@latest
```

或通过 `npx` 执行：

```bash
npx create-fluxpress@latest
```

## 交互式向导

执行命令后，工具会依次询问以下问题：

```
✔ Project name: … your-fluxpress-project
✔ Repository owner: … liangpengyv
✔ Repository name: … git-blog
✔ Select a theme (Channel): › Official
✔ Select a theme: › classic
```

| 问题 | 说明 | 示例 |
|------|------|------|
| Project name | 项目文件夹名称 | `my-blog` |
| Repository owner | GitHub 仓库所有者（用户名或组织名）| `liangpengyv` |
| Repository name | GitHub 仓库名称 | `git-blog` |
| Select a theme (Channel) | 主题来源（目前仅支持 Official）| `Official` |
| Select a theme | 具体主题名称（目前仅支持 classic）| `classic` |

::: tip 取消向导
在任意问题输入时按 `Ctrl+C` 可取消操作，不会创建任何文件。
:::

## 生成的项目结构

完成向导后，工具会在当前目录下创建项目文件夹，结构如下：

```
<project-name>/
├── fluxpress.config.js          # 站点配置（GitHub 仓库和主题）
├── fluxpress.config.classic.js  # classic 主题配置
├── package.json                 # 项目依赖配置
├── .env                         # 环境变量（用于存放 GITHUB_TOKEN）
└── .gitignore                   # Git 忽略规则
```

### fluxpress.config.js

根据你输入的 GitHub 仓库信息自动生成：

```javascript
export default {
  github: {
    owner: '<your-github-owner>',
    repo: '<your-github-repo>',
  },
  theme: 'classic',
}
```

### package.json

自动查询 npm registry 获取最新版本号，生成对应的依赖配置：

```json
{
  "name": "<project-name>",
  "type": "module",
  "scripts": {
    "fetch": "fluxpress fetch",
    "generate": "fluxpress generate",
    "preview": "fluxpress preview"
  },
  "dependencies": {
    "fluxpress": "latest",
    "@fluxpress/theme-classic": "latest"
  }
}
```

### .env

预置了 `GITHUB_TOKEN` 的环境变量模板：

```bash
GITHUB_TOKEN=
```

填入你的 GitHub Personal Access Token 后，`fluxpress fetch` 会自动读取。

### .gitignore

预置了常用的忽略规则，其中 `.env` 文件默认被忽略，防止意外将 token 提交到仓库。

## 后续步骤

项目创建完成后，按以下步骤启动：

```bash
# 进入项目目录
cd <project-name>

# 安装依赖
npm install

# 在 .env 中填入你的 GITHUB_TOKEN（可选但推荐）

# 从 GitHub 拉取数据
npx fluxpress fetch

# 生成静态站点
npx fluxpress generate

# 本地预览
npx fluxpress preview
```

访问 [http://localhost:9895](http://localhost:9895) 即可看到你的站点。
