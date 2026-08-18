import DefaultTheme from 'vitepress/theme'
import ThemeLayout from './ThemeLayout.vue'
import Mermaid from './components/Mermaid.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: ThemeLayout,
  enhanceApp({ app }) {
    app.component('Mermaid', Mermaid)
  }
}
