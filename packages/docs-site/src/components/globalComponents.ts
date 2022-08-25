import { createApp } from 'vue'
import VIconMDI from './VIconMDI.vue'
import Anchor from './Anchor.vue'
import Caret from './Caret.vue'
import VA from './VA.vue'
import VClose from './VClose.vue'
import VModal from './VModal.vue'
import VInput from './VInput.vue'

export const init = (app: ReturnType<typeof createApp>) => {
  app.component('VIconMDI', VIconMDI)
  app.component('Anchor', Anchor)
  app.component('Caret', Caret)
  app.component('VA', VA)
  app.component('VClose', VClose)
  app.component('VModal', VModal)
  app.component('VInput', VInput)
}
