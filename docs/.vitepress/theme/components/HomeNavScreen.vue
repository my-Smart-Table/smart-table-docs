<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { ref, computed } from 'vue'

const { frontmatter, site } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
const isEnglish = computed(() => site.value.lang === 'en-US')

interface NavItem {
  text: string
  link?: string
  items?: NavItem[]
}

const navItems = computed<NavItem[]>(() => isEnglish.value
  ? [
      { text: 'Introduction', link: '/en-US/introduction/what-is-smarttable.html' },
      {
        text: 'User Guide',
        items: [
          { text: 'Getting Started', link: '/en-US/user-guide/getting-started.html' },
          { text: 'Table Operations', link: '/en-US/user-guide/table-operations.html' },
          { text: 'Views', link: '/en-US/user-guide/views/table-view.html' },
          { text: 'Field Types', link: '/en-US/user-guide/field-types.html' },
          { text: 'Collaboration', link: '/en-US/user-guide/collaboration.html' },
          { text: 'Workflow Automation', link: '/en-US/user-guide/workflow.html' }
        ]
      },
      {
        text: 'Developer',
        items: [
          { text: 'Docker Deployment', link: '/en-US/developer/deployment/docker.html' },
          { text: 'API Overview', link: '/en-US/developer/api/overview.html' },
          { text: 'Architecture', link: '/en-US/developer/architecture.html' }
        ]
      },
      { text: 'Changelog', link: '/en-US/changelog.html' }
    ]
  : [
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
      { text: '更新日志', link: '/zh-CN/changelog.html' }
    ])

const langLabel = computed(() => isEnglish.value ? 'English' : '简体中文')
const langItems = computed(() => isEnglish.value
  ? [{ text: '简体中文', link: '/' }]
  : [{ text: 'English', link: '/en-US/' }])

const openSections = ref<Record<string, boolean>>({})

function toggleSection(key: string) {
  openSections.value[key] = !openSections.value[key]
}
</script>

<template>
  <div v-if="isHome" class="home-nav-screen">
    <div class="home-nav-screen-sections">
      <template v-for="item in navItems" :key="item.text">
        <a v-if="item.link" :href="withBase(item.link)" class="home-nav-screen-link">{{ item.text }}</a>
        <div v-else class="home-nav-screen-group">
          <button class="home-nav-screen-button" @click="toggleSection(item.text)">
            {{ item.text }}
            <svg
              class="home-nav-screen-chevron"
              :class="{ open: openSections[item.text] }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div v-show="openSections[item.text]" class="home-nav-screen-items">
            <a
              v-for="sub in item.items"
              :key="sub.text"
              :href="withBase(sub.link!)"
              class="home-nav-screen-sub-link"
            >{{ sub.text }}</a>
          </div>
        </div>
      </template>
    </div>

    <div class="home-nav-screen-divider"/>

    <div class="home-nav-screen-group">
      <button class="home-nav-screen-button" @click="toggleSection('lang')">
        {{ langLabel }}
        <svg
          class="home-nav-screen-chevron"
          :class="{ open: openSections['lang'] }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div v-show="openSections['lang']" class="home-nav-screen-items">
        <a
          v-for="lang in langItems"
          :key="lang.text"
          :href="withBase(lang.link)"
          class="home-nav-screen-sub-link"
        >{{ lang.text }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-nav-screen {
  padding: 24px;
}

.home-nav-screen-sections {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.home-nav-screen-link,
.home-nav-screen-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.home-nav-screen-link:hover,
.home-nav-screen-button:hover {
  background-color: var(--vp-c-bg-soft);
}

.home-nav-screen-chevron {
  width: 18px;
  height: 18px;
  transition: transform 0.2s;
}

.home-nav-screen-chevron.open {
  transform: rotate(180deg);
}

.home-nav-screen-items {
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.home-nav-screen-sub-link {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.home-nav-screen-sub-link:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.home-nav-screen-divider {
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 16px 0;
}
</style>
