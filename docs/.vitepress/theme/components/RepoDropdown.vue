<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const repos = [
  { label: 'GitHub', link: 'https://github.com/ldbinac/smart_table' },
  { label: 'Gitee', link: 'https://gitee.com/binac/smart_table' }
]

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) {
    close()
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="repo-dropdown" :class="{ open }">
    <button
      class="repo-trigger"
      type="button"
      :aria-expanded="open"
      aria-label="项目地址"
      @click="toggle"
    >
      <svg class="repo-icon" viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"></path>
      </svg>
      <svg class="caret" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path fill="currentColor" d="M4.427 6.427 8 10l3.573-3.573a.5.5 0 0 1 .708.708l-3.927 3.927a.5.5 0 0 1-.708 0L3.72 7.135a.5.5 0 0 1 .708-.708Z"></path>
      </svg>
    </button>
    <ul v-show="open" class="repo-menu">
      <li v-for="repo in repos" :key="repo.link">
        <a :href="repo.link" target="_blank" rel="noopener noreferrer" @click="close">
          <span class="repo-label">{{ repo.label }}</span>
          <span class="repo-url">{{ repo.link.replace(/^https?:\/\//, '') }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.repo-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.repo-trigger {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 0 8px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  border-radius: 6px;
}

.repo-trigger:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-default-soft);
}

.repo-icon {
  display: block;
}

.caret {
  display: block;
  opacity: 0.7;
}

.repo-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 248px;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: var(--vp-shadow-3);
  z-index: 50;
}

.repo-menu li a {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.repo-menu li a:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
}

.repo-label {
  font-weight: 600;
  font-size: 14px;
}

.repo-url {
  font-size: 12px;
  color: var(--vp-c-text-2);
  word-break: break-all;
}
</style>
