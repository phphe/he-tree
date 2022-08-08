import { ref } from 'vue'

export interface DocsSubmenu {
  name: string
  id: string
  level: number
  children: DocsSubmenu[]
}

export default ref<DocsSubmenu | null>(null)
