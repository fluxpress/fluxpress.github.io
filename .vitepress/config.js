import { defineConfig } from 'vitepress'
import fetch from 'npm-registry-fetch'

const latestVersion = (await fetch.json('/fluxpress'))['dist-tags']['latest']

export default defineConfig({
  // 站点级选项
  lang: 'zh-Hans',
  title: 'FluxPress',
  description: '围绕 GitHub 生态构建的静态站点生成器',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/png', href: '/logo-mini.png' }]],

  // 主题级选项
  themeConfig: {
    logo: '/logo-mini.png',
    socialLinks: [{ icon: 'github', link: 'https://github.com/fluxpress' }],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © ${new Date().getFullYear()} LaoLiang`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    nav: [
      {
        text: '指南',
        link: '/guide/what-is-fluxpress',
        activeMatch: '/guide/',
      },
      {
        text: '参考',
        link: '/reference/fluxpress',
        activeMatch: '/reference/',
      },
      {
        text: '主题',
        link: '/theme/standard',
        activeMatch: '/theme/',
      },
      {
        text: '插件',
        link: '/plugin/standard',
        activeMatch: '/plugin/',
      },
      {
        text: latestVersion,
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/fluxpress/fluxpress/releases',
          },
        ],
      },
    ],

    sidebar: {
      guide: {
        base: '/guide/',
        items: [
          {
            text: '简介',
            collapsed: false,
            items: [
              { text: '什么是 FluxPress', link: 'what-is-fluxpress' },
              { text: '快速开始', link: 'getting-started' },
              { text: '手动构建', link: 'manual-build' },
              { text: '部署', link: 'deploy' },
            ],
          },
          {
            text: '写作',
            collapsed: false,
            items: [
              { text: 'Markdown 扩展', link: 'markdown' },
              { text: 'frontmatter', link: 'frontmatter' },
            ],
          },
          {
            text: '自定义',
            collapsed: false,
            items: [
              { text: '站点配置', link: 'fluxpress-config' },
              { text: '主题配置', link: 'theme-config' },
            ],
          },
          {
            text: '其它',
            collapsed: false,
            items: [
              { text: '常见问题', link: 'faq' },
              { text: '路线图', link: 'roadmap' },
              { text: '贡献', link: 'contribute' },
            ],
          },
        ],
      },
      reference: {
        base: '/reference/',
        items: [
          {
            text: 'CLI',
            collapsed: false,
            items: [
              { text: 'fluxpress', link: 'fluxpress' },
              { text: 'create-fluxpress', link: 'create-fluxpress' },
            ],
          },
          {
            text: 'API',
            collapsed: false,
            items: [{ text: '事件', link: 'events' }],
          },
        ],
      },
      theme: {
        base: '/theme/',
        items: [
          {
            text: '开发',
            collapsed: false,
            items: [{ text: '规范', link: 'standard' }],
          },
          {
            text: '官方主题',
            collapsed: false,
            base: '/theme/official/',
            items: [
              { text: 'classic', link: 'classic' },
              { text: 'doclite', link: 'doclite' },
            ],
          },
          {
            text: '社区主题',
            collapsed: true,
            base: '/theme/community/',
            items: [{ text: 'Coming soon...' }],
          },
        ],
      },
      plugin: {
        base: '/plugin/',
        items: [
          {
            text: '开发',
            collapsed: false,
            items: [{ text: '规范', link: 'standard' }],
          },
          {
            text: '官方插件',
            collapsed: false,
            base: '/plugin/official/',
            items: [{ text: 'douban', link: 'douban' }],
          },
          {
            text: '社区插件',
            collapsed: true,
            base: '/plugin/community/',
            items: [{ text: 'Coming soon...' }],
          },
        ],
      },
    },
  },
})
