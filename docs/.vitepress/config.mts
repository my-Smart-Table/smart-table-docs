import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/smart-table-docs/',
  title: 'SmartTable',
  description: '智能多维表格系统文档',
  lastUpdated: true,
  ignoreDeadLinks: ['http://localhost:5173', /^http:\/\/localhost:5000/],

  // 默认语言为中文
  lang: 'zh-CN',

  // 多语言配置
  locales: {
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN/',
      themeConfig: {
        nav: [
          { text: '产品介绍', link: '/zh-CN/introduction/what-is-smarttable.html' },
          {
            text: '用户指南',
            activeMatch: '/zh-CN/user-guide/',
            items: [
              { text: '快速开始', link: '/zh-CN/user-guide/getting-started.html' },
              { text: '表格操作', link: '/zh-CN/user-guide/table-operations.html' },
              {
                text: '视图管理',
                items: [
                  { text: '表格视图', link: '/zh-CN/user-guide/views/table-view.html' },
                  { text: '看板视图', link: '/zh-CN/user-guide/views/kanban-view.html' },
                  { text: '甘特图', link: '/zh-CN/user-guide/views/gantt-view.html' },
                  { text: '日历视图', link: '/zh-CN/user-guide/views/calendar-view.html' }
                ]
              },
              { text: '字段类型', link: '/zh-CN/user-guide/field-types.html' },
              { text: '协作功能', link: '/zh-CN/user-guide/collaboration.html' },
              { text: '工作流自动化', link: '/zh-CN/user-guide/workflow.html' }
            ]
          },
          {
            text: '开发者文档',
            activeMatch: '/zh-CN/developer/',
            items: [
              { text: 'Docker 部署', link: '/zh-CN/developer/deployment/docker.html' },
              { text: '手动部署', link: '/zh-CN/developer/deployment/manual.html' },
              { text: '配置说明', link: '/zh-CN/developer/deployment/configuration.html' },
              { text: 'API 概览', link: '/zh-CN/developer/api/overview.html' },
              { text: '认证', link: '/zh-CN/developer/api/authentication.html' },
              { text: '架构设计', link: '/zh-CN/developer/architecture.html' }
            ]
          },
          { text: '更新日志', link: '/zh-CN/changelog.html' }
        ],

        sidebar: {
          '/zh-CN/introduction/': {
            base: '/zh-CN/introduction/',
            items: [
              { text: 'SmartTable 是什么？', link: 'what-is-smarttable.html' },
              { text: '核心功能', link: 'core-features.html' },
              { text: '使用场景', link: 'use-cases.html' }
            ]
          },
          '/zh-CN/user-guide/': {
            base: '/zh-CN/user-guide/',
            items: [
              { text: '快速开始', link: 'getting-started.html' },
              { text: '表格操作', link: 'table-operations.html' },
              {
                text: '视图管理',
                collapsed: false,
                items: [
                  { text: '表格视图', link: 'views/table-view.html' },
                  { text: '看板视图', link: 'views/kanban-view.html' },
                  { text: '甘特图', link: 'views/gantt-view.html' },
                  { text: '日历视图', link: 'views/calendar-view.html' }
                ]
              },
              { text: '字段类型', link: 'field-types.html' },
              { text: '协作功能', link: 'collaboration.html' },
              { text: '工作流自动化', link: 'workflow.html' }
            ]
          },
          '/zh-CN/developer/': {
            base: '/zh-CN/developer/',
            items: [
              {
                text: '部署指南',
                collapsed: false,
                items: [
                  { text: 'Docker 部署', link: 'deployment/docker.html' },
                  { text: '手动部署', link: 'deployment/manual.html' },
                  { text: '配置说明', link: 'deployment/configuration.html' }
                ]
              },
              {
                text: 'API 文档',
                collapsed: false,
                items: [
                  { text: 'API 概览', link: 'api/overview.html' },
                  { text: '认证', link: 'api/authentication.html' },
                  { text: '数据表 API', link: 'api/table.html' },
                  { text: '记录 API', link: 'api/record.html' },
                  { text: '工作流 API', link: 'api/workflow.html' }
                ]
              },
              { text: '架构设计', link: 'architecture.html' }
            ]
          }
        },

        outline: {
          label: '页面导航',
          level: 'deep'
        },

        docFooter: {
          prev: '上一页',
          next: '下一页'
        },

        lastUpdated: {
          text: '最后更新于',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },

        editLink: {
          pattern: 'https://github.com/my-Smart-Table/smart-table-docs/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        },

        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    },
    'en-US': {
      label: 'English',
      lang: 'en-US',
      link: '/en-US/',
      themeConfig: {
        nav: [
          { text: 'Introduction', link: '/en-US/introduction/what-is-smarttable.html' },
          {
            text: 'User Guide',
            activeMatch: '/en-US/user-guide/',
            items: [
              { text: 'Getting Started', link: '/en-US/user-guide/getting-started.html' },
              { text: 'Table Operations', link: '/en-US/user-guide/table-operations.html' },
              {
                text: 'Views',
                items: [
                  { text: 'Table View', link: '/en-US/user-guide/views/table-view.html' },
                  { text: 'Kanban View', link: '/en-US/user-guide/views/kanban-view.html' },
                  { text: 'Gantt Chart', link: '/en-US/user-guide/views/gantt-view.html' },
                  { text: 'Calendar View', link: '/en-US/user-guide/views/calendar-view.html' }
                ]
              },
              { text: 'Field Types', link: '/en-US/user-guide/field-types.html' },
              { text: 'Collaboration', link: '/en-US/user-guide/collaboration.html' },
              { text: 'Workflow Automation', link: '/en-US/user-guide/workflow.html' }
            ]
          },
          {
            text: 'Developer',
            activeMatch: '/en-US/developer/',
            items: [
              { text: 'Docker Deployment', link: '/en-US/developer/deployment/docker.html' },
              { text: 'Manual Deployment', link: '/en-US/developer/deployment/manual.html' },
              { text: 'Configuration', link: '/en-US/developer/deployment/configuration.html' },
              { text: 'API Overview', link: '/en-US/developer/api/overview.html' },
              { text: 'Authentication', link: '/en-US/developer/api/authentication.html' },
              { text: 'Architecture', link: '/en-US/developer/architecture.html' }
            ]
          },
          { text: 'Changelog', link: '/en-US/changelog.html' }
        ],

        sidebar: {
          '/en-US/introduction/': {
            base: '/en-US/introduction/',
            items: [
              { text: 'What is SmartTable?', link: 'what-is-smarttable.html' },
              { text: 'Core Features', link: 'core-features.html' },
              { text: 'Use Cases', link: 'use-cases.html' }
            ]
          },
          '/en-US/user-guide/': {
            base: '/en-US/user-guide/',
            items: [
              { text: 'Getting Started', link: 'getting-started.html' },
              { text: 'Table Operations', link: 'table-operations.html' },
              {
                text: 'Views',
                collapsed: false,
                items: [
                  { text: 'Table View', link: 'views/table-view.html' },
                  { text: 'Kanban View', link: 'views/kanban-view.html' },
                  { text: 'Gantt Chart', link: 'views/gantt-view.html' },
                  { text: 'Calendar View', link: 'views/calendar-view.html' }
                ]
              },
              { text: 'Field Types', link: 'field-types.html' },
              { text: 'Collaboration', link: 'collaboration.html' },
              { text: 'Workflow Automation', link: 'workflow.html' }
            ]
          },
          '/en-US/developer/': {
            base: '/en-US/developer/',
            items: [
              {
                text: 'Deployment',
                collapsed: false,
                items: [
                  { text: 'Docker Deployment', link: 'deployment/docker.html' },
                  { text: 'Manual Deployment', link: 'deployment/manual.html' },
                  { text: 'Configuration', link: 'deployment/configuration.html' }
                ]
              },
              {
                text: 'API Docs',
                collapsed: false,
                items: [
                  { text: 'API Overview', link: 'api/overview.html' },
                  { text: 'Authentication', link: 'api/authentication.html' },
                  { text: 'Table API', link: 'api/table.html' },
                  { text: 'Record API', link: 'api/record.html' },
                  { text: 'Workflow API', link: 'api/workflow.html' }
                ]
              },
              { text: 'Architecture', link: 'architecture.html' }
            ]
          }
        },

        outline: {
          label: 'On this page',
          level: 'deep'
        },

        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },

        lastUpdated: {
          text: 'Last updated on',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },

        editLink: {
          pattern: 'https://github.com/my-Smart-Table/smart-table-docs/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        }
      }
    }
  },

  themeConfig: {
    logo: '/images/logo.png',
    siteTitle: 'SmartTable',

    // 顶层导航用于非 locale 页面（如首页）
    nav: [
      { text: '产品介绍', link: '/zh-CN/introduction/what-is-smarttable.html' },
      {
        text: '用户指南',
        items: [
          { text: '快速开始', link: '/zh-CN/user-guide/getting-started.html' },
          { text: '表格操作', link: '/zh-CN/user-guide/table-operations.html' },
          { text: '视图管理', link: '/zh-CN/user-guide/views/table-view.html' },
          { text: '字段类型', link: '/zh-CN/user-guide/field-types.html' },
          { text: '协作功能', link: '/zh-CN/user-guide/collaboration.html' },
          { text: '工作流自动化', link: '/zh-CN/user-guide/workflow.html' }
        ]
      },
      {
        text: '开发者文档',
        items: [
          { text: 'Docker 部署', link: '/zh-CN/developer/deployment/docker.html' },
          { text: 'API 概览', link: '/zh-CN/developer/api/overview.html' },
          { text: '架构设计', link: '/zh-CN/developer/architecture.html' }
        ]
      },
      { text: 'English', link: '/en-US/' }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/my-Smart-Table/smart-table-spec' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 SmartTable Team'
    }
  }
})
