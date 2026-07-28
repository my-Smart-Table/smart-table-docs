import { defineLocaleConfig } from 'vitepress'

export default defineLocaleConfig({
  label: '简体中文',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '产品介绍', link: '/zh-CN/introduction/what-is-smarttable' },
      {
        text: '用户指南',
        link: '/zh-CN/user-guide/getting-started',
        items: [
          { text: '快速开始', link: '/zh-CN/user-guide/getting-started' },
          { text: '表格操作', link: '/zh-CN/user-guide/table-operations' },
          {
            text: '视图管理',
            items: [
              { text: '表格视图', link: '/zh-CN/user-guide/views/table-view' },
              { text: '看板视图', link: '/zh-CN/user-guide/views/kanban-view' },
              { text: '甘特图', link: '/zh-CN/user-guide/views/gantt-view' },
              { text: '日历视图', link: '/zh-CN/user-guide/views/calendar-view' }
            ]
          },
          { text: '字段类型', link: '/zh-CN/user-guide/field-types' },
          { text: '协作功能', link: '/zh-CN/user-guide/collaboration' },
          { text: '工作流自动化', link: '/zh-CN/user-guide/workflow' }
        ]
      },
      {
        text: '部署指南',
        link: '/zh-CN/developer/deployment/docker',
        items: [
          { text: 'Docker 部署', link: '/zh-CN/developer/deployment/docker' },
          { text: '手动部署', link: '/zh-CN/developer/deployment/manual' },
          { text: '配置说明', link: '/zh-CN/developer/deployment/configuration' }
        ]
      },
      {
        text: 'API 文档',
        link: '/zh-CN/developer/api/overview',
        items: [
          { text: 'API 概览', link: '/zh-CN/developer/api/overview' },
          { text: '认证', link: '/zh-CN/developer/api/authentication' },
          { text: '数据表 API', link: '/zh-CN/developer/api/table' },
          { text: '记录 API', link: '/zh-CN/developer/api/record' },
          { text: '工作流 API', link: '/zh-CN/developer/api/workflow' }
        ]
      },
      { text: '架构设计', link: '/zh-CN/developer/architecture' },
      { text: '更新日志', link: '/zh-CN/changelog' }
    ],

    sidebar: {
      '/zh-CN/introduction/': [
        {
          text: '产品介绍',
          items: [
            { text: 'SmartTable 是什么？', link: '/zh-CN/introduction/what-is-smarttable' },
            { text: '核心功能', link: '/zh-CN/introduction/core-features' },
            { text: '使用场景', link: '/zh-CN/introduction/use-cases' }
          ]
        }
      ],
      '/zh-CN/user-guide/': [
        {
          text: '用户指南',
          items: [
            { text: '快速开始', link: '/zh-CN/user-guide/getting-started' },
            { text: '表格操作', link: '/zh-CN/user-guide/table-operations' },
            {
              text: '视图管理',
              collapsed: false,
              items: [
                { text: '表格视图', link: '/zh-CN/user-guide/views/table-view' },
                { text: '看板视图', link: '/zh-CN/user-guide/views/kanban-view' },
                { text: '甘特图', link: '/zh-CN/user-guide/views/gantt-view' },
                { text: '日历视图', link: '/zh-CN/user-guide/views/calendar-view' }
              ]
            },
            { text: '字段类型', link: '/zh-CN/user-guide/field-types' },
            { text: '协作功能', link: '/zh-CN/user-guide/collaboration' },
            { text: '工作流自动化', link: '/zh-CN/user-guide/workflow' }
          ]
        }
      ],
      '/zh-CN/developer/': [
        {
          text: '开发者文档',
          items: [
            {
              text: '部署指南',
              collapsed: false,
              items: [
                { text: 'Docker 部署', link: '/zh-CN/developer/deployment/docker' },
                { text: '手动部署', link: '/zh-CN/developer/deployment/manual' },
                { text: '配置说明', link: '/zh-CN/developer/deployment/configuration' }
              ]
            },
            {
              text: 'API 文档',
              collapsed: false,
              items: [
                { text: 'API 概览', link: '/zh-CN/developer/api/overview' },
                { text: '认证', link: '/zh-CN/developer/api/authentication' },
                { text: '数据表 API', link: '/zh-CN/developer/api/table' },
                { text: '记录 API', link: '/zh-CN/developer/api/record' },
                { text: '工作流 API', link: '/zh-CN/developer/api/workflow' }
              ]
            },
            { text: '架构设计', link: '/zh-CN/developer/architecture' }
          ]
        }
      ]
    },

    editLink: {
      pattern: 'https://github.com/my-Smart-Table/smart-table-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})