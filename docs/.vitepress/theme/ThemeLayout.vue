<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HeroSection from './components/HeroSection.vue'
import HomeFeatures from './components/HomeFeatures.vue'
import HomeNav from './components/HomeNav.vue'
import HomeNavScreen from './components/HomeNavScreen.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <HomeNav />
    </template>
    <template #nav-screen-content-before>
      <HomeNavScreen />
    </template>
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
