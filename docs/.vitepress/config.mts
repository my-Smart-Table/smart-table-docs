import { defineConfig } from 'vitepress'

const base = '/smart-table-docs/'

export default defineConfig({
  base,
  title: 'SmartTable',
  description: '智能多维表格系统文档',
  lastUpdated: true,
  ignoreDeadLinks: ['http://localhost:5173', /^http:\/\/localhost:5000/],

  // 默认语言为中文
  lang: 'zh-CN',

  // 站点 favicon，用于浏览器标签页图标
  head: [
    ['link', { rel: 'icon', href: `${base}images/favicon.ico`, type: 'image/x-icon' }]
  ],

  // 对包含 {{ }} 的 inline code 添加 v-pre，避免被 Vue 解析为插值
  markdown: {
    config: (md) => {
      const defaultRender = md.renderer.rules.code_inline!
      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const content = token.content
        if (content.includes('{{') || content.includes('}}')) {
          const escaped = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
          return `<code v-pre>${escaped}</code>`
        }
        return defaultRender(tokens, idx, options, env, self)
      }
    }
  },

  // 多语言配置
  locales: {
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN/',
      themeConfig: {
        nav: [
          {
            text: '产品介绍',
            activeMatch: '/zh-CN/introduction/',
            items: [
              { text: 'SmartTable 是什么？', link: '/zh-CN/introduction/what-is-smarttable.html' },
              { text: '核心功能', link: '/zh-CN/introduction/core-features.html' },
              { text: '使用场景', link: '/zh-CN/introduction/use-cases.html' },
              { text: '客户案例', link: '/zh-CN/introduction/customer-cases.html' },
              { text: '关注我们', link: '/zh-CN/introduction/follow-us.html' }
            ]
          },
          {
            text: '用户指南',
            activeMatch: '/zh-CN/user-guide/',
            items: [
              { text: '快速开始', link: '/zh-CN/user-guide/getting-started.html' },
              { text: '表格操作', link: '/zh-CN/user-guide/table-operations.html' },
              {
                text: '基础功能',
                items: [
                  { text: '视图管理', link: '/zh-CN/user-guide/views/table-view.html' },
                  { text: '文档管理', link: '/zh-CN/user-guide/document-management.html' },
                  { text: '仪表盘管理', link: '/zh-CN/user-guide/dashboard-management.html' },
                  { text: '协作功能', link: '/zh-CN/user-guide/collaboration.html' },
                  { text: '工作流自动化', link: '/zh-CN/user-guide/workflow.html' },
                  { text: '系统管理', link: '/zh-CN/user-guide/system-management.html' }
                ]
              },
              {
                text: '字段类型',
                items: [
                  { text: '字段类型概览', link: '/zh-CN/user-guide/field-types.html' },
                  { text: '关联字段', link: '/zh-CN/user-guide/field-types/link-field.html' },
                  { text: '查找字段', link: '/zh-CN/user-guide/field-types/lookup-field.html' },
                  { text: '公式字段', link: '/zh-CN/user-guide/field-types/formula-field.html' }
                ]
              },
              {
                text: '场景实践',
                items: [
                  { text: '项目管理', link: '/zh-CN/user-guide/scenarios/project-management.html' },
                  { text: '研发缺陷管理', link: '/zh-CN/user-guide/scenarios/rd-defect-management.html' },
                  { text: '客户关系管理', link: '/zh-CN/user-guide/scenarios/crm-customer-management.html' },
                  { text: '人事招聘管理', link: '/zh-CN/user-guide/scenarios/hr-recruitment.html' },
                  { text: '内容日历管理', link: '/zh-CN/user-guide/scenarios/content-calendar.html' }
                ]
              }
            ]
          },
          {
            text: '开发者文档',
            activeMatch: '/zh-CN/developer/',
            items: [
              {
                text: '架构',
                items: [
                  { text: '架构设计', link: '/zh-CN/developer/architecture.html' }
                ]
              },
              {
                text: '开发',
                items: [
                  { text: '开发环境', link: '/zh-CN/developer/development/environment.html' }
                ]
              },
              {
                text: '部署',
                items: [
                  { text: '一键部署', link: '/zh-CN/developer/deployment/one-click.html' },
                  { text: 'Docker 部署', link: '/zh-CN/developer/deployment/docker.html' },
                  { text: '手动部署', link: '/zh-CN/developer/deployment/manual.html' },
                  { text: '配置说明', link: '/zh-CN/developer/deployment/configuration.html' }
                ]
              },
              {
                text: 'API',
                items: [
                  { text: 'API 概览', link: '/zh-CN/developer/api/overview.html' },
                  { text: '认证', link: '/zh-CN/developer/api/authentication.html' },
                  { text: '数据表 API', link: '/zh-CN/developer/api/table.html' },
                  { text: '记录 API', link: '/zh-CN/developer/api/record.html' },
                  { text: '工作流 API', link: '/zh-CN/developer/api/workflow.html' }
                ]
              },
              {
                text: '其他',
                items: []
              }
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
              { text: '使用场景', link: 'use-cases.html' },
              { text: '客户案例', link: 'customer-cases.html' },
              { text: '关注我们', link: 'follow-us.html' }
            ]
          },
          '/zh-CN/user-guide/': {
            base: '/zh-CN/user-guide/',
            items: [
              { text: '快速开始', link: 'getting-started.html' },
              { text: '表格操作', link: 'table-operations.html' },
              {
                text: '基础功能',
                collapsed: false,
                items: [
                  {
                    text: '视图管理',
                    collapsed: false,
                    items: [
                      { text: '表格视图', link: 'views/table-view.html' },
                      { text: '分组视图', link: 'views/grouped-view.html' },
                      { text: '看板视图', link: 'views/kanban-view.html' },
                      { text: '甘特图', link: 'views/gantt-view.html' },
                      { text: '日历视图', link: 'views/calendar-view.html' },
                      { text: '画册视图', link: 'views/gallery-view.html' },
                      { text: '表单视图', link: 'views/form-view.html' }
                    ]
                  },
                  {
                    text: '文档管理',
                    collapsed: false,
                    items: [
                      { text: '文档管理', link: 'document-management.html' }
                    ]
                  },
                  {
                    text: '仪表盘管理',
                    collapsed: false,
                    items: [
                      { text: '仪表盘管理', link: 'dashboard-management.html' }
                    ]
                  },
                  {
                    text: '协作功能',
                    collapsed: false,
                    items: [
                      { text: '协作功能', link: 'collaboration.html' }
                    ]
                  },
                  {
                    text: '工作流自动化',
                    collapsed: false,
                    items: [
                      { text: '工作流自动化概览', link: 'workflow.html' },
                      { text: '触发器', link: 'workflow/trigger.html' },
                      { text: '创建记录节点', link: 'workflow/create-record.html' },
                      { text: '更新记录节点', link: 'workflow/update-record.html' },
                      { text: '查找记录节点', link: 'workflow/find-records.html' },
                      { text: '发送邮件节点', link: 'workflow/send-email.html' },
                      { text: 'Webhook 节点', link: 'workflow/webhook.html' },
                      { text: '条件节点', link: 'workflow/condition.html' },
                      { text: '循环节点', link: 'workflow/loop.html' }
                    ]
                  },
                  {
                    text: '系统管理',
                    collapsed: false,
                    items: [
                      { text: '系统管理', link: 'system-management.html' }
                    ]
                  }
                ]
              },
              {
                text: '字段类型',
                collapsed: false,
                items: [
                  { text: '字段类型概览', link: 'field-types.html' },
                  { text: '关联字段', link: 'field-types/link-field.html' },
                  { text: '查找字段', link: 'field-types/lookup-field.html' },
                  { text: '公式字段', link: 'field-types/formula-field.html' }
                ]
              },
              {
                text: '场景实践',
                collapsed: false,
                items: [
                  { text: '项目管理', link: 'scenarios/project-management.html' },
                  { text: '研发缺陷管理', link: 'scenarios/rd-defect-management.html' },
                  { text: '客户关系管理', link: 'scenarios/crm-customer-management.html' },
                  { text: '人事招聘管理', link: 'scenarios/hr-recruitment.html' },
                  { text: '内容日历管理', link: 'scenarios/content-calendar.html' }
                ]
              }
            ]
          },
          '/zh-CN/developer/': {
            base: '/zh-CN/developer/',
            items: [
              {
                text: '架构',
                collapsed: false,
                items: [
                  { text: '架构设计', link: 'architecture.html' }
                ]
              },
              {
                text: '开发',
                collapsed: false,
                items: [
                  { text: '开发环境', link: 'development/environment.html' }
                ]
              },
              {
                text: '部署',
                collapsed: false,
                items: [
                  { text: '一键部署', link: 'deployment/one-click.html' },
                  { text: 'Docker 部署', link: 'deployment/docker.html' },
                  { text: '手动部署', link: 'deployment/manual.html' },
                  { text: '配置说明', link: 'deployment/configuration.html' }
                ]
              },
              {
                text: 'API',
                collapsed: false,
                items: [
                  { text: 'API 概览', link: 'api/overview.html' },
                  { text: '认证', link: 'api/authentication.html' },
                  { text: '数据表 API', link: 'api/table.html' },
                  { text: '记录 API', link: 'api/record.html' },
                  { text: '工作流 API', link: 'api/workflow.html' }
                ]
              },
              {
                text: '其他',
                collapsed: false,
                items: []
              }
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
          {
            text: 'Introduction',
            activeMatch: '/en-US/introduction/',
            items: [
              { text: 'What is SmartTable?', link: '/en-US/introduction/what-is-smarttable.html' },
              { text: 'Core Features', link: '/en-US/introduction/core-features.html' },
              { text: 'Use Cases', link: '/en-US/introduction/use-cases.html' },
              { text: 'Customer Cases', link: '/en-US/introduction/customer-cases.html' },
              { text: 'Follow Us', link: '/en-US/introduction/follow-us.html' }
            ]
          },
          {
            text: 'User Guide',
            activeMatch: '/en-US/user-guide/',
            items: [
              { text: 'Getting Started', link: '/en-US/user-guide/getting-started.html' },
              { text: 'Table Operations', link: '/en-US/user-guide/table-operations.html' },
              {
                text: 'Basic Features',
                items: [
                  { text: 'Views', link: '/en-US/user-guide/views/table-view.html' },
                  { text: 'Document Management', link: '/en-US/user-guide/document-management.html' },
                  { text: 'Dashboard Management', link: '/en-US/user-guide/dashboard-management.html' },
                  { text: 'Collaboration', link: '/en-US/user-guide/collaboration.html' },
                  { text: 'Workflow Automation', link: '/en-US/user-guide/workflow.html' },
                  { text: 'System Management', link: '/en-US/user-guide/system-management.html' }
                ]
              },
              {
                text: 'Field Types',
                items: [
                  { text: 'Field Types Overview', link: '/en-US/user-guide/field-types.html' },
                  { text: 'Link Field', link: '/en-US/user-guide/field-types/link-field.html' },
                  { text: 'Lookup Field', link: '/en-US/user-guide/field-types/lookup-field.html' },
                  { text: 'Formula Field', link: '/en-US/user-guide/field-types/formula-field.html' }
                ]
              },
              {
                text: 'Scenario Practice',
                items: [
                  { text: 'Project Management', link: '/en-US/user-guide/scenarios/project-management.html' },
                  { text: 'R&D Defect Management', link: '/en-US/user-guide/scenarios/rd-defect-management.html' },
                  { text: 'CRM', link: '/en-US/user-guide/scenarios/crm-customer-management.html' },
                  { text: 'HR Recruitment', link: '/en-US/user-guide/scenarios/hr-recruitment.html' },
                  { text: 'Content Calendar', link: '/en-US/user-guide/scenarios/content-calendar.html' }
                ]
              }
            ]
          },
          {
            text: 'Developer',
            activeMatch: '/en-US/developer/',
            items: [
              {
                text: 'Architecture',
                items: [
                  { text: 'Architecture', link: '/en-US/developer/architecture.html' }
                ]
              },
              {
                text: 'Development',
                items: [
                  { text: 'Development Environment', link: '/en-US/developer/development/environment.html' }
                ]
              },
              {
                text: 'Deployment',
                items: [
                  { text: 'One-click Deployment', link: '/en-US/developer/deployment/one-click.html' },
                  { text: 'Docker Deployment', link: '/en-US/developer/deployment/docker.html' },
                  { text: 'Manual Deployment', link: '/en-US/developer/deployment/manual.html' },
                  { text: 'Configuration', link: '/en-US/developer/deployment/configuration.html' }
                ]
              },
              {
                text: 'API',
                items: [
                  { text: 'API Overview', link: '/en-US/developer/api/overview.html' },
                  { text: 'Authentication', link: '/en-US/developer/api/authentication.html' },
                  { text: 'Table API', link: '/en-US/developer/api/table.html' },
                  { text: 'Record API', link: '/en-US/developer/api/record.html' },
                  { text: 'Workflow API', link: '/en-US/developer/api/workflow.html' }
                ]
              },
              {
                text: 'Others',
                items: []
              }
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
              { text: 'Use Cases', link: 'use-cases.html' },
              { text: 'Customer Cases', link: 'customer-cases.html' },
              { text: 'Follow Us', link: 'follow-us.html' }
            ]
          },
          '/en-US/user-guide/': {
            base: '/en-US/user-guide/',
            items: [
              { text: 'Getting Started', link: 'getting-started.html' },
              { text: 'Table Operations', link: 'table-operations.html' },
              {
                text: 'Basic Features',
                collapsed: false,
                items: [
                  {
                    text: 'Views',
                    collapsed: false,
                    items: [
                      { text: 'Grid View', link: 'views/table-view.html' },
                      { text: 'Grouped View', link: 'views/grouped-view.html' },
                      { text: 'Kanban View', link: 'views/kanban-view.html' },
                      { text: 'Gantt Chart', link: 'views/gantt-view.html' },
                      { text: 'Calendar View', link: 'views/calendar-view.html' },
                      { text: 'Gallery View', link: 'views/gallery-view.html' },
                      { text: 'Form View', link: 'views/form-view.html' }
                    ]
                  },
                  {
                    text: 'Document Management',
                    collapsed: false,
                    items: [
                      { text: 'Document Management', link: 'document-management.html' }
                    ]
                  },
                  {
                    text: 'Dashboard Management',
                    collapsed: false,
                    items: [
                      { text: 'Dashboard Management', link: 'dashboard-management.html' }
                    ]
                  },
                  {
                    text: 'Collaboration',
                    collapsed: false,
                    items: [
                      { text: 'Collaboration', link: 'collaboration.html' }
                    ]
                  },
                  {
                    text: 'Workflow Automation',
                    collapsed: false,
                    items: [
                      { text: 'Workflow Automation Overview', link: 'workflow.html' },
                      { text: 'Trigger', link: 'workflow/trigger.html' },
                      { text: 'Create Record Node', link: 'workflow/create-record.html' },
                      { text: 'Update Record Node', link: 'workflow/update-record.html' },
                      { text: 'Find Records Node', link: 'workflow/find-records.html' },
                      { text: 'Send Email Node', link: 'workflow/send-email.html' },
                      { text: 'Webhook Node', link: 'workflow/webhook.html' },
                      { text: 'Condition Node', link: 'workflow/condition.html' },
                      { text: 'Loop Node', link: 'workflow/loop.html' }
                    ]
                  },
                  {
                    text: 'System Management',
                    collapsed: false,
                    items: [
                      { text: 'System Management', link: 'system-management.html' }
                    ]
                  }
                ]
              },
              {
                text: 'Field Types',
                collapsed: false,
                items: [
                  { text: 'Field Types Overview', link: 'field-types.html' },
                  { text: 'Link Field', link: 'field-types/link-field.html' },
                  { text: 'Lookup Field', link: 'field-types/lookup-field.html' },
                  { text: 'Formula Field', link: 'field-types/formula-field.html' }
                ]
              },
              {
                text: 'Scenario Practice',
                collapsed: false,
                items: [
                  { text: 'Project Management', link: 'scenarios/project-management.html' },
                  { text: 'R&D Defect Management', link: 'scenarios/rd-defect-management.html' },
                  { text: 'CRM', link: 'scenarios/crm-customer-management.html' },
                  { text: 'HR Recruitment', link: 'scenarios/hr-recruitment.html' },
                  { text: 'Content Calendar', link: 'scenarios/content-calendar.html' }
                ]
              }
            ]
          },
          '/en-US/developer/': {
            base: '/en-US/developer/',
            items: [
              {
                text: 'Architecture',
                collapsed: false,
                items: [
                  { text: 'Architecture', link: 'architecture.html' }
                ]
              },
              {
                text: 'Development',
                collapsed: false,
                items: [
                  { text: 'Development Environment', link: 'development/environment.html' }
                ]
              },
              {
                text: 'Deployment',
                collapsed: false,
                items: [
                  { text: 'One-click Deployment', link: 'deployment/one-click.html' },
                  { text: 'Docker Deployment', link: 'deployment/docker.html' },
                  { text: 'Manual Deployment', link: 'deployment/manual.html' },
                  { text: 'Configuration', link: 'deployment/configuration.html' }
                ]
              },
              {
                text: 'API',
                collapsed: false,
                items: [
                  { text: 'API Overview', link: 'api/overview.html' },
                  { text: 'Authentication', link: 'api/authentication.html' },
                  { text: 'Table API', link: 'api/table.html' },
                  { text: 'Record API', link: 'api/record.html' },
                  { text: 'Workflow API', link: 'api/workflow.html' }
                ]
              },
              {
                text: 'Others',
                collapsed: false,
                items: []
              }
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
      {
        text: '产品介绍',
        activeMatch: '/zh-CN/introduction/',
        items: [
          { text: 'SmartTable 是什么？', link: '/zh-CN/introduction/what-is-smarttable.html' },
          { text: '核心功能', link: '/zh-CN/introduction/core-features.html' },
          { text: '使用场景', link: '/zh-CN/introduction/use-cases.html' },
          { text: '客户案例', link: '/zh-CN/introduction/customer-cases.html' },
          { text: '关注我们', link: '/zh-CN/introduction/follow-us.html' }
        ]
      },
      {
        text: '用户指南',
        items: [
          { text: '快速开始', link: '/zh-CN/user-guide/getting-started.html' },
          { text: '表格操作', link: '/zh-CN/user-guide/table-operations.html' },
          {
            text: '基础功能',
            items: [
              { text: '视图管理', link: '/zh-CN/user-guide/views/table-view.html' },
              { text: '文档管理', link: '/zh-CN/user-guide/document-management.html' },
              { text: '仪表盘管理', link: '/zh-CN/user-guide/dashboard-management.html' },
              { text: '协作功能', link: '/zh-CN/user-guide/collaboration.html' },
              { text: '工作流自动化', link: '/zh-CN/user-guide/workflow.html' },
              { text: '系统管理', link: '/zh-CN/user-guide/system-management.html' }
            ]
          },
          {
            text: '字段类型',
            items: [
              { text: '字段类型概览', link: '/zh-CN/user-guide/field-types.html' },
              { text: '关联字段', link: '/zh-CN/user-guide/field-types/link-field.html' },
              { text: '查找字段', link: '/zh-CN/user-guide/field-types/lookup-field.html' },
              { text: '公式字段', link: '/zh-CN/user-guide/field-types/formula-field.html' }
            ]
          },
          {
            text: '场景实践',
            items: [
              { text: '项目管理', link: '/zh-CN/user-guide/scenarios/project-management.html' },
              { text: '研发缺陷管理', link: '/zh-CN/user-guide/scenarios/rd-defect-management.html' },
              { text: '客户关系管理', link: '/zh-CN/user-guide/scenarios/crm-customer-management.html' },
              { text: '人事招聘管理', link: '/zh-CN/user-guide/scenarios/hr-recruitment.html' },
              { text: '内容日历管理', link: '/zh-CN/user-guide/scenarios/content-calendar.html' }
            ]
          }
        ]
      },
      {
        text: '开发者文档',
        items: [
          {
            text: '架构',
            items: [
              { text: '架构设计', link: '/zh-CN/developer/architecture.html' }
            ]
          },
          {
            text: '开发',
            items: [
              { text: '开发环境', link: '/zh-CN/developer/development/environment.html' }
            ]
          },
          {
            text: '部署',
            items: [
              { text: '一键部署', link: '/zh-CN/developer/deployment/one-click.html' },
              { text: 'Docker 部署', link: '/zh-CN/developer/deployment/docker.html' },
              { text: '手动部署', link: '/zh-CN/developer/deployment/manual.html' },
              { text: '配置说明', link: '/zh-CN/developer/deployment/configuration.html' }
            ]
          },
          {
            text: 'API',
            items: [
              { text: 'API 概览', link: '/zh-CN/developer/api/overview.html' },
              { text: '认证', link: '/zh-CN/developer/api/authentication.html' },
              { text: '数据表 API', link: '/zh-CN/developer/api/table.html' },
              { text: '记录 API', link: '/zh-CN/developer/api/record.html' },
              { text: '工作流 API', link: '/zh-CN/developer/api/workflow.html' }
            ]
          },
          {
            text: '其他',
            items: []
          }
        ]
      },
      { text: 'English', link: '/en-US/' }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ldbinac/smart_table' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 SmartTable Team'
    }
  }
})
