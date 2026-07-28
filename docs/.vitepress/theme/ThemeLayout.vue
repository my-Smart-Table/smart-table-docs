<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HeroSection from './components/HeroSection.vue'
import HomeFeatures from './components/HomeFeatures.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-info>
      <HeroSection />
    </template>
    <template #home-hero-actions>
      <!-- actions are rendered inside HeroSection -->
    </template>
    <template #home-features-after>
      <HomeFeatures />
    </template>
  </Layout>
</template>
