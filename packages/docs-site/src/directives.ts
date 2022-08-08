import * as hp from 'helper-js'
import { createApp } from 'vue'

export const anchorScrollWhenClick = {
  mounted(el: HTMLElement) {
    hp.on(el, 'click', (e) => {
      const href = el.getAttribute('href')
      if (href && href.startsWith('#')) {
        let targetEl = document.getElementById(href.substring(1)) // by ID
        if (!targetEl) {
          targetEl = document.getElementsByName(href.substring(1))[0]
        }
        if (targetEl && targetEl.scrollIntoView != null) {
          e.preventDefault()
          targetEl.scrollIntoView({
            behavior: 'smooth',
          })
          history.pushState(null, '', href)
        }
      }
    })
  },
}

export function globalDirectivesInit(app: ReturnType<typeof createApp>) {
  app.directive('anchor', anchorScrollWhenClick)
}
