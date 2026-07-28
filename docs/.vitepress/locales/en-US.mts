import { defineLocaleConfig } from 'vitepress'

export default defineLocaleConfig({
  label: 'English',
  lang: 'en-US',

  themeConfig: {
    nav: [
      { text: 'Introduction', link: '/en-US/introduction/what-is-smarttable' },
      {
        text: 'User Guide',
        link: '/en-US/user-guide/getting-started',
        items: [
          { text: 'Getting Started', link: '/en-US/user-guide/getting-started' },
          { text: 'Table Operations', link: '/en-US/user-guide/table-operations' },
          {
            text: 'View Management',
            items: [
              { text: 'Table View', link: '/en-US/user-guide/views/table-view' },
              { text: 'Kanban View', link: '/en-US/user-guide/views/kanban-view' },
              { text: 'Gantt Chart', link: '/en-US/user-guide/views/gantt-view' },
              { text: 'Calendar View', link: '/en-US/user-guide/views/calendar-view' }
            ]
          },
          { text: 'Field Types', link: '/en-US/user-guide/field-types' },
          { text: 'Collaboration', link: '/en-US/user-guide/collaboration' },
          { text: 'Workflow Automation', link: '/en-US/user-guide/workflow' }
        ]
      },
      {
        text: 'Deployment',
        link: '/en-US/developer/deployment/docker',
        items: [
          { text: 'Docker Deployment', link: '/en-US/developer/deployment/docker' },
          { text: 'Manual Deployment', link: '/en-US/developer/deployment/manual' },
          { text: 'Configuration', link: '/en-US/developer/deployment/configuration' }
        ]
      },
      {
        text: 'API Reference',
        link: '/en-US/developer/api/overview',
        items: [
          { text: 'API Overview', link: '/en-US/developer/api/overview' },
          { text: 'Authentication', link: '/en-US/developer/api/authentication' },
          { text: 'Table API', link: '/en-US/developer/api/table' },
          { text: 'Record API', link: '/en-US/developer/api/record' },
          { text: 'Workflow API', link: '/en-US/developer/api/workflow' }
        ]
      },
      { text: 'Architecture', link: '/en-US/developer/architecture' },
      { text: 'Changelog', link: '/en-US/changelog' }
    ],

    sidebar: {
      '/en-US/introduction/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is SmartTable?', link: '/en-US/introduction/what-is-smarttable' },
            { text: 'Core Features', link: '/en-US/introduction/core-features' },
            { text: 'Use Cases', link: '/en-US/introduction/use-cases' }
          ]
        }
      ],
      '/en-US/user-guide/': [
        {
          text: 'User Guide',
          items: [
            { text: 'Getting Started', link: '/en-US/user-guide/getting-started' },
            { text: 'Table Operations', link: '/en-US/user-guide/table-operations' },
            {
              text: 'View Management',
              collapsed: false,
              items: [
                { text: 'Table View', link: '/en-US/user-guide/views/table-view' },
                { text: 'Kanban View', link: '/en-US/user-guide/views/kanban-view' },
                { text: 'Gantt Chart', link: '/en-US/user-guide/views/gantt-view' },
                { text: 'Calendar View', link: '/en-US/user-guide/views/calendar-view' }
              ]
            },
            { text: 'Field Types', link: '/en-US/user-guide/field-types' },
            { text: 'Collaboration', link: '/en-US/user-guide/collaboration' },
            { text: 'Workflow Automation', link: '/en-US/user-guide/workflow' }
          ]
        }
      ],
      '/en-US/developer/': [
        {
          text: 'Developer Documentation',
          items: [
            {
              text: 'Deployment',
              collapsed: false,
              items: [
                { text: 'Docker Deployment', link: '/en-US/developer/deployment/docker' },
                { text: 'Manual Deployment', link: '/en-US/developer/deployment/manual' },
                { text: 'Configuration', link: '/en-US/developer/deployment/configuration' }
              ]
            },
            {
              text: 'API Reference',
              collapsed: false,
              items: [
                { text: 'API Overview', link: '/en-US/developer/api/overview' },
                { text: 'Authentication', link: '/en-US/developer/api/authentication' },
                { text: 'Table API', link: '/en-US/developer/api/table' },
                { text: 'Record API', link: '/en-US/developer/api/record' },
                { text: 'Workflow API', link: '/en-US/developer/api/workflow' }
              ]
            },
            { text: 'Architecture', link: '/en-US/developer/architecture' }
          ]
        }
      ]
    },

    editLink: {
      pattern: 'https://github.com/my-Smart-Table/smart-table-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    outline: {
      label: 'On this page'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme'
  }
})