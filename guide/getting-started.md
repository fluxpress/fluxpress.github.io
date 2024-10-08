# 快速开始

## 前置准备

- [Node.js](https://nodejs.org/) 20 及以上版本。
- 通过命令行界面（CLI）访问 FluxPress 的终端。

## 安装向导

FluxPress 提供了一个官方的脚手架工具 create-fluxpress，使用它可以快速创建一个站点，只需运行下面的命令：

```sh
npm create fluxpress@latest
```

执行后，你将通过类似下面的交互的方式，快速配置完成你的站点。

```
✔ Project name: … your-fluxpress-project
✔ Repository owner: … liangpengyv
✔ Repository name: … git-blog
✔ Select a theme (Channel): › Official
✔ Select a theme: › classic
```

接下来你只需要：

```sh
cd your-fluxpress-project
npm install

npx fluxpress fetch
npx fluxpress generate
npx fluxpress preview
```

你现在应该已经可以在 http://localhost:9895 预览到你的站点了！
