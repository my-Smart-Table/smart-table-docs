<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { site } = useData()

const isEnglish = computed(() => site.value.lang === 'en-US')

const features = computed(() => isEnglish.value
  ? [
      { icon: '📊', title: 'Multiple Views', details: 'Grid, Kanban, Gantt, Calendar and more views for different scenarios' },
      { icon: '🔄', title: 'Real-time Collaboration', details: 'Multi-user real-time collaborative editing with instant data sync' },
      { icon: '⚙️', title: 'Workflow Automation', details: 'Visual workflow designer to automate business processes' },
      { icon: '🔗', title: 'Rich Field Types', details: 'Supports 20+ field types including text, number, date, link, formula and more' },
      { icon: '🔒', title: 'Data Privatization', details: 'Your data, your control. Deploy on-premise or in private networks for high security requirements.' },
      { icon: '📈', title: 'Visual Dashboard', details: 'Powerful customizable visual dashboard with data visualization support (including large-screen mode).' },
      { icon: '📚', title: 'Document Knowledge Base', details: 'Rich-text editor (Markdown supported) for building internal documentation and knowledge base.' }
    ]
  : [
      { icon: '🔒', title: '数据私有化', details: '我的数据我做主，不受限于特定平台的服务，高安全需求内网也可部署使用' },
      { icon: '⚙️', title: '工作流自动化', details: '可视化工作流设计，自动化处理业务流程' },
      { icon: '🔗', title: '丰富的字段类型', details: '支持文本、数字、日期、关联、公式等 20+ 字段类型' },
      { icon: '📊', title: '多视图支持', details: '表格、看板、甘特图、日历等多种视图，满足不同场景需求' },
      { icon: '📈', title: '可视化仪表盘', details: '优秀的自定义可视化仪表盘，数据可视化展示（支持大屏模式）' },
      { icon: '📚', title: '文档知识库', details: '支持富文本模式编写（Markdown 格式也支持），构建内部文档知识库' },
      { icon: '🔄', title: '实时协作', details: '支持多人实时协作编辑，数据同步无延迟' }
    ])

const docLinks = computed(() => isEnglish.value
  ? [
      { icon: '🚀', title: 'Get Started', details: 'Deploy SmartTable in 5 minutes and create your first table', link: '/en-US/user-guide/getting-started.html' },
      { icon: '📖', title: 'User Guide', details: 'Learn table operations, views, field types and collaboration', link: '/en-US/user-guide/table-operations.html' },
      { icon: '🛠️', title: 'Developer Docs', details: 'Docker deployment, API docs and architecture reference', link: '/en-US/developer/deployment/docker.html' }
    ]
  : [
      { icon: '🚀', title: '快速开始', details: '5 分钟部署 SmartTable，创建第一个数据表', link: '/zh-CN/user-guide/getting-started.html' },
      { icon: '📖', title: '用户指南', details: '深入了解表格操作、视图、字段类型和协作功能', link: '/zh-CN/user-guide/table-operations.html' },
      { icon: '🛠️', title: '开发者文档', details: 'Docker 部署、API 文档、架构设计参考', link: '/zh-CN/developer/deployment/docker.html' }
    ])
</script>

<template>
  <div class="home-features">
    <div class="features-section">
      <h2 class="section-title">{{ isEnglish ? 'Core Capabilities' : '核心能力' }}</h2>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-details">{{ feature.details }}</p>
        </div>
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
