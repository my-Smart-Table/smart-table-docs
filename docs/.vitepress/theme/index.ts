import DefaultTheme from 'vitepress/theme'
import ThemeLayout from './ThemeLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: ThemeLayout
}
