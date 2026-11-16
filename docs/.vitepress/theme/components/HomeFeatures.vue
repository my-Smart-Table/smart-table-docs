<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { site } = useData()

const isEnglish = computed(() => site.value.lang === 'en-US')

interface Feature {
  icon: string
  title: string
  details: string
  badge?: string
  link?: string
}

const features = computed<Feature[]>(() => isEnglish.value
  ? [
      { icon: '📊', title: 'Multiple Views', details: 'Grid, Kanban, Gantt, Calendar and more views for different scenarios' },
      { icon: '🔄', title: 'Real-time Collaboration', details: 'Multi-user real-time collaborative editing with instant data sync' },
      { icon: '⚙️', title: 'Workflow Automation', details: 'Visual workflow designer to automate business processes' },
      { icon: '🔗', title: 'Rich Field Types', details: 'Supports 20+ field types including text, number, date, link, formula and more' },
      { icon: '🔒', title: 'Data Privatization', details: 'Your data, your control. Deploy on-premise or in private networks for high security requirements.' },
      { icon: '📈', title: 'Visual Dashboard', details: 'Powerful customizable visual dashboard with data visualization support (including large-screen mode).' },
      { icon: '📚', title: 'Document Knowledge Base', details: 'Rich-text editor (Markdown supported) for building internal documentation and knowledge base.' },
      { icon: '🧩', title: 'Plugin System', details: 'UI plugins run in a sandboxed iframe with Vue templates; script plugins run in a restricted subprocess — with install/enable, two-level config, selected-records input and run logs.' },
      { icon: '🖨️', title: 'Print Templates', badge: 'Standard', details: 'Visual print template designer with record-wise / summary batch printing, template sharing, import/export and overprinting on pre-printed forms', link: '/en-US/edition-comparison.html' },
      { icon: '📱', title: 'Mobile H5', badge: 'Standard', details: 'Full mobile experience: grid / kanban / calendar / gallery / form views and record editing for on-the-go work', link: '/en-US/edition-comparison.html' },
      { icon: '🔐', title: 'Advanced Permissions', badge: 'Standard', details: 'Field-level permissions, data-condition permissions, dashboard and document permissions, with permission rule groups and effective-permission preview', link: '/en-US/edition-comparison.html' },
      { icon: '🚀', title: 'Application Mode', badge: 'Professional', details: 'Visual application builder that turns tables into standalone apps with dedicated login, menus and an 18-template marketplace', link: '/en-US/edition-comparison.html' },
      { icon: '✅', title: 'Approval Flows', badge: 'Professional', details: 'Visual flow canvas with OR/AND/serial signing, 5 approver sources, version snapshots and in-app approval integration', link: '/en-US/edition-comparison.html' },
      { icon: '🤖', title: 'AI Capabilities', badge: 'Professional', details: 'AI assistant, table data Q&A (RAG), AI fields, workflow AI nodes, smart dashboard insights and full usage governance', link: '/en-US/edition-comparison.html' }
    ]
  : [
      { icon: '🔒', title: '数据私有化', details: '我的数据我做主，不受限于特定平台的服务，高安全需求内网也可部署使用' },
      { icon: '⚙️', title: '工作流自动化', details: '可视化工作流设计，自动化处理业务流程' },
      { icon: '🔗', title: '丰富的字段类型', details: '支持文本、数字、日期、关联、公式等 20+ 字段类型' },
      { icon: '📊', title: '多视图支持', details: '表格、看板、甘特图、日历等多种视图，满足不同场景需求' },
      { icon: '📈', title: '可视化仪表盘', details: '优秀的自定义可视化仪表盘，数据可视化展示（支持大屏模式）' },
      { icon: '📚', title: '文档知识库', details: '支持富文本模式编写（Markdown 格式也支持），构建内部文档知识库' },
      { icon: '🔄', title: '实时协作', details: '支持多人实时协作编辑，数据同步无延迟' },
      { icon: '🧩', title: '插件体系（可扩展）', details: 'UI 插件在 iframe 沙箱中用 Vue 模板编写，脚本插件在受限子进程运行；支持安装启停、两级配置、勾选数据传入与运行日志' },
      { icon: '🖨️', title: '打印模板', badge: '标准版', details: '可视化打印模板设计器，逐条 / 汇总批量打印，支持模板共享、导入导出与预印单据套打', link: '/zh-CN/edition-comparison.html' },
      { icon: '📱', title: '移动端 H5', badge: '标准版', details: '完整移动端体验：表格、看板、日历、画廊、表单视图与记录编辑，随时随地移动办公', link: '/zh-CN/edition-comparison.html' },
      { icon: '🔐', title: '高级权限', badge: '标准版', details: '字段列权限、数据条件权限、仪表盘与文档权限，权限规则组批量分配，有效权限预览', link: '/zh-CN/edition-comparison.html' },
      { icon: '🚀', title: '应用模式', badge: '专业版', details: '可视化应用构建器，把多维表格组装成带独立登录与菜单的独立应用，18 套模板一键创建', link: '/zh-CN/edition-comparison.html' },
      { icon: '✅', title: '审批流', badge: '专业版', details: '可视化流程画布，或签 / 会签 / 串行与 5 种审批人来源，版本快照保障流程稳定执行', link: '/zh-CN/edition-comparison.html' },
      { icon: '🤖', title: 'AI 能力', badge: '专业版', details: 'AI 助手对话问答、表格数据 RAG 语义检索、AI 字段批量生成与仪表盘智能洞察，全套用量治理', link: '/zh-CN/edition-comparison.html' }
    ])

const docLinks = computed(() => isEnglish.value
  ? [
      { icon: '🚀', title: 'Get Started', details: 'Deploy SmartTable in 5 minutes and create your first table', link: '/en-US/user-guide/getting-started.html' },
      { icon: '📖', title: 'User Guide', details: 'Learn table operations, views, field types and collaboration', link: '/en-US/user-guide/table-operations.html' },
      { icon: '⚙️', title: 'Workflow Automation', details: 'Triggers, node orchestration and versioning — let the system run repetitive business logic', link: '/en-US/user-guide/workflow.html' },
      { icon: '🛠️', title: 'Developer Docs', details: 'Docker deployment, API docs and architecture reference', link: '/en-US/developer/deployment/docker.html' },
      { icon: '🧩', title: 'Plugin Development', details: 'UI plugins in a sandboxed iframe, script plugins in a restricted subprocess, selection channel and run logs', link: '/en-US/developer/plugins/developer-guide.html' }
    ]
  : [
      { icon: '🚀', title: '快速开始', details: '5 分钟部署 SmartTable，创建第一个数据表', link: '/zh-CN/user-guide/getting-started.html' },
      { icon: '📖', title: '用户指南', details: '深入了解表格操作、视图、字段类型和协作功能', link: '/zh-CN/user-guide/table-operations.html' },
      { icon: '⚙️', title: '工作流自动化', details: '触发器、节点编排与版本管理，把重复性业务交给系统自动执行', link: '/zh-CN/user-guide/workflow.html' },
      { icon: '🛠️', title: '开发者文档', details: 'Docker 部署、API 文档、架构设计参考', link: '/zh-CN/developer/deployment/docker.html' },
      { icon: '🧩', title: '插件开发', details: '双形态插件、沙箱安全边界、两级配置、勾选数据通道与运行日志', link: '/zh-CN/developer/plugins/developer-guide.html' }
    ])
</script>

<template>
  <div class="home-features">
    <div class="features-section">
      <h2 class="section-title">{{ isEnglish ? 'Core Capabilities' : '核心能力' }}</h2>
      <div class="features-grid">
        <component
          :is="feature.link ? 'a' : 'div'"
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
          :class="{ 'feature-card--link': feature.link }"
          :href="feature.link ? withBase(feature.link) : undefined"
        >
          <span v-if="feature.badge" class="feature-badge">{{ feature.badge }}</span>
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-details">{{ feature.details }}</p>
        </component>
      </div>
    </div>

    <div class="docs-section">
      <h2 class="section-title">{{ isEnglish ? 'Start Exploring' : '开始探索' }}</h2>
      <div class="docs-grid">
        <a v-for="doc in docLinks" :key="doc.title" :href="withBase(doc.link)" class="doc-card">
          <div class="doc-icon">{{ doc.icon }}</div>
          <div class="doc-content">
            <h3 class="doc-title">{{ doc.title }}</h3>
            <p class="doc-details">{{ doc.details }}</p>
          </div>
          <svg class="doc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-features {
  padding: 64px 24px;
  max-width: 1152px;
  margin: 0 auto;
}

.features-section,
.docs-section {
  margin-bottom: 80px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 48px;
  letter-spacing: -0.02em;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 32px 24px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.25s ease;
}

.feature-card--link {
  text-decoration: none;
  cursor: pointer;
  display: block;
  color: inherit;
}

.feature-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--vp-c-white);
  background: var(--vp-c-brand-1);
  margin-bottom: 12px;
}

.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.feature-details {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.doc-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: all 0.25s ease;
}

.doc-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateX(4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.doc-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.doc-content {
  flex: 1;
  min-width: 0;
}

.doc-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 4px;
}

.doc-details {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}

.doc-arrow {
  width: 20px;
  height: 20px;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  transition: color 0.25s ease;
}

.doc-card:hover .doc-arrow {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .home-features {
    padding: 48px 20px;
  }

  .section-title {
    font-size: 26px;
  }

  .doc-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
