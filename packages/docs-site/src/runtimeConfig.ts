// computed config based on current route
// Don't modify config when runtime

import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import config from './config'

export const currentSubpathConfig = computed(() => {
  const route = useRoute()
  let subpath
  if (config.SUBPATH) {
    for (const item of config.SUBPATH) {
      // @ts-ignore
      if (item.match(route.fullPath, route)) {
        subpath = item
        break
      }
    }
  }
  return subpath
})
