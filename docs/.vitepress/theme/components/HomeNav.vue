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

const openDropdown = ref<string | null>(null)

function toggleDropdown(key: string) {
  openDropdown.value = openDropdown.value === key ? null : key
}

function closeDropdowns() {
  openDropdown.value = null
}
</script>

<template>
  <nav v-if="isHome" class="home-nav" @mouseleave="closeDropdowns">
    <div class="home-nav-menu">
      <template v-for="item in navItems" :key="item.text">
        <a v-if="item.link" :href="withBase(item.link)" class="home-nav-link">{{ item.text }}</a>
        <div v-else class="home-nav-group" :class="{ open: openDropdown === item.text }">
          <button
            class="home-nav-button"
            @click="toggleDropdown(item.text)"
            @mouseenter="openDropdown = item.text"
          >
            {{ item.text }}
            <svg class="home-nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div v-show="openDropdown === item.text" class="home-nav-dropdown">
            <a
              v-for="sub in item.items"
              :key="sub.text"
              :href="withBase(sub.link!)"
              class="home-nav-dropdown-link"
            >{{ sub.text }}</a>
          </div>
        </div>
      </template>
    </div>

    <div class="home-nav-divider"/>

    <div class="home-nav-group lang-group" :class="{ open: openDropdown === 'lang' }">
      <button
        class="home-nav-button lang-button"
        @click="toggleDropdown('lang')"
        @mouseenter="openDropdown = 'lang'"
      >
        {{ langLabel }}
        <svg class="home-nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div v-show="openDropdown === 'lang'" class="home-nav-dropdown">
        <a
          v-for="lang in langItems"
          :key="lang.text"
          :href="withBase(lang.link)"
          class="home-nav-dropdown-link"
        >{{ lang.text }}</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.home-nav {
  display: none;
  align-items: center;
  gap: 4px;
}

@media (min-width: 960px) {
  .home-nav {
    display: flex;
  }
}

.home-nav-menu {
  display: flex;
  align-items: center;
  gap: 4px;
}

.home-nav-link,
.home-nav-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  height: 36px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.home-nav-link:hover,
.home-nav-button:hover {
  background-color: var(--vp-c-bg-soft);
}

.home-nav-chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}

.home-nav-group.open .home-nav-chevron {
  transform: rotate(180deg);
}

.home-nav-group {
  position: relative;
}

.home-nav-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 160px;
  padding: 8px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.home-nav-dropdown-link {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
}

.home-nav-dropdown-link:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.home-nav-divider {
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  margin: 0 4px;
}
</style>
