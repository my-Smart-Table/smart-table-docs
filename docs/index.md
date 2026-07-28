---
layout: page
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const lang = navigator.language || navigator.userLanguage || ''
  const target = lang.toLowerCase().startsWith('zh') ? './zh-CN/' : './en-US/'
  window.location.replace(target)
})
</script>

<noscript>
  <p>Please choose your language / 请选择语言：</p>
  <ul>
    <li><a href="./zh-CN/">简体中文</a></li>
    <li><a href="./en-US/">English</a></li>
  </ul>
</noscript>

<p>正在根据系统语言跳转首页...</p>
