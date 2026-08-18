<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{ encoded: string }>()
const svg = ref('')
const error = ref('')

function decode(s: string): string {
  const bin = atob(s)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

async function render() {
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' })
    const { svg: out } = await mermaid.render(
      'mmd-' + Math.random().toString(36).slice(2),
      decode(props.encoded)
    )
    svg.value = out
    error.value = ''
  } catch (e) {
    error.value = (e as Error)?.message ?? String(e)
  }
}

onMounted(render)
watch(() => props.encoded, () => {
  svg.value = ''
  render()
})
</script>

<template>
  <div class="mermaid-block">
    <div v-if="error" class="mermaid-error">Mermaid 渲染失败：{{ error }}</div>
    <div v-else v-html="svg"></div>
  </div>
</template>
