import { createApp } from 'vue'
// import Icon from './Icon.vue'
import VIconMDI from './VIconMDI.vue'
import Anchor from './Anchor.vue'
import Popup from './Popup.vue'
// import Tooltip from './Tooltip.vue'
// import Btn from './Btn.vue'

export const init = (app: ReturnType<typeof createApp>) => {
  // app.component('Icon', Icon)
  app.component('VIconMDI', VIconMDI)
  app.component('Anchor', Anchor)
  app.component('Popup', Popup)
  // app.component('Tooltip', Tooltip)
  // app.component('Btn', Btn)
}
