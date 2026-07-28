<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, site } = useData()

interface Action {
  theme?: 'brand' | 'alt'
  text: string
  link: string
  external?: boolean
}

const hero = frontmatter.value.hero || {}
const isEnglish = computed(() => site.value.lang === 'en-US')

const actions = computed<Action[]>(() => {
  if (isEnglish.value) {
    return [
      { theme: 'alt', text: 'Product Introduction', link: '/en-US/introduction/what-is-smarttable.html' },
      { theme: 'brand', text: 'Getting Started', link: '/en-US/user-guide/getting-started.html' },
      { theme: 'alt', text: 'Developer Docs', link: '/en-US/developer/architecture.html' }
    ]
  }
  return [
    { theme: 'alt', text: '产品介绍', link: '/zh-CN/introduction/what-is-smarttable.html' },
    { theme: 'brand', text: '快速开始', link: '/zh-CN/user-guide/getting-started.html' },
    { theme: 'alt', text: '开发者文档', link: '/zh-CN/developer/architecture.html' }
  ]
})
</script>

<template>
  <div class="hero-section">
    <div class="hero-background">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>
    </div>

    <div class="hero-content">
      <div class="hero-badge" v-if="hero.tagline">
        <span class="badge-dot"></span>
        {{ hero.tagline }}
      </div>

      <h1 class="hero-name">
        {{ hero.name }}
      </h1>

      <p class="hero-text" v-if="hero.text">
        {{ hero.text }}
      </p>

      <div class="hero-actions">
        <a
          v-for="action in actions"
          :key="action.text"
          :href="action.external ? action.link : withBase(action.link)"
          :class="['hero-action', action.theme === 'brand' ? 'brand' : 'alt', action.external ? 'no-icon' : '']"
          :target="action.external ? '_blank' : undefined"
          :rel="action.external ? 'noopener noreferrer' : undefined"
        >
          {{ action.text }}
          <svg v-if="action.external" class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  overflow: hidden;
  margin-top: calc(-1 * var(--vp-nav-height, 64px));
  padding-top: calc(80px + var(--vp-nav-height, 64px));
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(102, 126, 234, 0.3), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(118, 75, 162, 0.15), transparent),
    linear-gradient(180deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.dark .hero-gradient {
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(102, 126, 234, 0.2), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(118, 75, 162, 0.1), transparent),
    linear-gradient(180deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-name {
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
}

.hero-name::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  margin: 24px auto 0;
  border-radius: 2px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.hero-text {
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 400;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}

.hero-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.hero-action.brand {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);
}

.hero-action.brand:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.hero-action.alt {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.hero-action.alt:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.external-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-action {
    justify-content: center;
  }
}
</style>
