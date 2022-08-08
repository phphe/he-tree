import { createApp, ref } from 'vue'
import VueGtag from 'vue-gtag'

export function initAnalytics(app: ReturnType<typeof createApp>, ID: string) {
  if (ID) {
    app.use(VueGtag, {
      config: { id: ID },
    })
    console.log('Google analytics enabled')
  } else {
    console.log('Google analytics not enabled because of empty track ID')
  }
}
