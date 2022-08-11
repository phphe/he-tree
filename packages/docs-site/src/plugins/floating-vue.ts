import {
  createApp,
  ref,
  ComponentInternalInstance,
  onBeforeUnmount,
  getCurrentInstance,
} from 'vue'
import {
  // Directives
  VTooltip,
  VClosePopper,
  // Components
  Dropdown,
  Tooltip,
  Menu,
} from 'floating-vue'
import 'floating-vue/dist/style.css'

export default function init(app: ReturnType<typeof createApp>) {
  app.directive('tooltip', VTooltip)
  app.directive('close-popper', VClosePopper) // to close a poper that including it

  app.component('VDropdown', Dropdown)
  app.component('VTooltip', Tooltip)
  app.component('VHoverMenu', Menu)
}
