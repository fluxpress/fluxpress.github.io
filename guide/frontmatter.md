# frontmatter

在 FluxPress 中，文章的元数据（标题、分类、标签、发布时间等）来自 GitHub Issues 本身的字段，而非 Markdown frontmatter。这是 FluxPress 与传统静态站点生成器的重要区别之一。

## GitHub Issues 与元数据的映射关系

| 站点概念 | GitHub 对应字段 | 说明 |
|----------|----------------|------|
| 文章标题 | Issue 标题 | Issue 的 `title` 字段 |
| 文章正文 | Issue 正文 | Issue 的 `body` 字段（Markdown）|
| 分类 | Milestone | 一个 Issue 最多属于一个 Milestone |
| 标签 | Labels | 一个 Issue 可以有多个 Label |
| 发布时间 | Issue 创建时间 | Issue 的 `created_at` 字段 |
| 评论 | Issue Comments | Issue 下的所有评论 |

## 在 GitHub 上管理元数据

### 设置分类（Milestone）

1. 进入仓库页面，点击 **Issues** → **Milestones**
2. 创建 Milestone，填写名称（即分类名）
3. 编辑 Issue，在右侧面板选择对应的 Milestone

每篇文章只能属于一个分类。

### 设置标签（Labels）

1. 进入仓库页面，点击 **Issues** → **Labels**
2. 创建 Label，填写名称和颜色
3. 编辑 Issue，在右侧面板选择对应的 Labels

每篇文章可以有多个标签。

### 控制发布时间

文章的发布时间为 Issue 的创建时间，无法手动指定。如果需要控制发布顺序，可以按顺序创建 Issue，或通过 [GitHub API](https://docs.github.com/rest/issues/issues) 进行管理。

## 在正文中使用 frontmatter

当前版本中，FluxPress 可以识别并去除正文中的 YAML frontmatter 块，避免渲染为文章内容，但 frontmatter 中的字段**暂不会**被读取和使用。

如果你的 Issue 正文包含 frontmatter：

```markdown
---
custom_field: value
---

这里是正文内容...
```

FluxPress 会自动去除 `---` 包裹的 frontmatter 块，仅渲染后面的正文部分。

::: tip 未来计划
我们计划在后续版本中支持通过 frontmatter 覆盖部分元数据（如自定义发布时间、封面图片等），敬请期待。
:::
