# 部署

FluxPress 生成的是纯静态文件（`public/` 目录），可以部署到任意静态托管平台。

## 构建产物

执行完整的构建流程后，`public/` 目录即为最终的部署产物：

```
public/
├── index.html          # 首页
├── page/2/index.html   # 第 2 页（如有）
├── posts/<id>/         # 文章详情页
├── archives/           # 归档页
├── categories/         # 分类页
├── tags/               # 标签页
├── about/              # 关于页
├── 404.html            # 404 页面
├── CNAME               # 自定义域名（如配置了 site.cname）
└── css/                # 主题样式文件
```

## 部署到 GitHub Pages

推荐使用 GitHub Actions 自动化构建和部署。

### 1. 创建 GitHub Actions 工作流

在你的项目仓库中创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy FluxPress Site

on:
  push:
    branches:
      - main
  issues:
    types:
      - opened
      - edited
      - deleted
      - labeled
      - unlabeled
      - milestoned
      - demilestoned

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Fetch data from GitHub
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx fluxpress fetch

      - name: Generate static site
        run: npx fluxpress generate

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './public'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2. 启用 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 保存设置

### 3. 配置自定义域名（可选）

如需使用自定义域名，在 `fluxpress.config.classic.js` 中配置 `site.cname`：

```javascript
export default {
  site: {
    cname: 'blog.example.com',
    // ...
  },
}
```

FluxPress 会在构建时自动生成 `public/CNAME` 文件。然后在域名 DNS 服务商处添加对应的 CNAME 记录，指向 `<username>.github.io`。

### 触发时机说明

上面的工作流配置了以下触发条件：

- **`push` 到 main 分支**：当推送代码（如修改配置）时触发
- **Issues 事件**：当 Issue 被创建、编辑、删除、添加/移除标签或 Milestone 时自动触发重新构建

这样每次在 GitHub 上发布或编辑文章，站点会自动更新。

## 部署到 Vercel

1. 将项目推送到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com)，点击 **Add New Project**
3. 导入你的 GitHub 仓库
4. 配置构建设置：
   - **Build Command**: `npx fluxpress fetch && npx fluxpress generate`
   - **Output Directory**: `public`
   - **Environment Variables**: 添加 `GITHUB_TOKEN`
5. 点击 **Deploy**

::: tip
Vercel 的免费计划不支持 GitHub Issues 触发自动重新部署。如需自动更新，可结合 GitHub Actions 和 Vercel 的 Deploy Hooks 实现。
:::

## 部署到 Netlify

1. 将项目推送到 GitHub 仓库
2. 登录 [Netlify](https://www.netlify.com)，点击 **Add new site** → **Import an existing project**
3. 连接 GitHub，选择你的仓库
4. 配置构建设置：
   - **Build command**: `npx fluxpress fetch && npx fluxpress generate`
   - **Publish directory**: `public`
5. 在 **Environment variables** 中添加 `GITHUB_TOKEN`
6. 点击 **Deploy site**

## 手动部署

如果你希望手动部署，只需执行构建命令并将 `public/` 目录上传到服务器：

```bash
npx fluxpress fetch
npx fluxpress generate

# 然后将 public/ 目录的内容上传到你的 Web 服务器
```

`public/` 目录是完整的静态站点，可以用任意 Web 服务器（Nginx、Apache、Caddy 等）直接托管。
