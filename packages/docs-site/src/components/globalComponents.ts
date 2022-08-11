import { createApp } from 'vue'
import VIconMDI from './VIconMDI.vue'
import Anchor from './Anchor.vue'
import Caret from './Caret.vue'

export const init = (app: ReturnType<typeof createApp>) => {
  app.component('VIconMDI', VIconMDI)
  app.component('Anchor', Anchor)
  app.component('Caret', Caret)
}
