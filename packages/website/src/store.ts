import { reactive } from 'vue'

interface State {
  // table of contents in left sidebar
  tableOfContents: {
    visible: boolean
    value: { text: string; url: string }[]
  },
}

export const state = reactive<State>({
  tableOfContents: {
    visible: false,
    value: [],
  },
})
