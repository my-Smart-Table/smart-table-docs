import { defineConfig } from 'vitepress'
import zhCN from './locales/zh-CN.mts'
import enUS from './locales/en-US.mts'

export default defineConfig({
  title: 'SmartTable',
  description: '智能多维表格系统文档',

  // 多语言配置
  locales: {
    '/zh-CN/': zhCN,
    '/en-US/': enUS
  },

  // 主题配置
  themeConfig: {
    logo: '/images/logo.png',
    siteTitle: 'SmartTable',

    // 搜索配置
    search: {
      provider: 'local'
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/my-Smart-Table/smart-table-spec' }
    ],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2026 SmartTable Team'
    }
  }
})