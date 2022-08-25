// computed config and other data based on current route
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import config from './config'
import { i18n } from './i18n'
import { router } from './router'

export const subpathConfig = computed(() => {
  const route = useRoute()
  let subpath
  if (config.SUBPATH) {
    for (const item of config.SUBPATH) {
      // @ts-ignore
      if (route && item.match(route.fullPath, route)) {
        subpath = item
        break
      }
    }
  }
  return subpath
})

export const menu = computed(
  () => subpathConfig.value?.menu || config.MENU || []
)

export const versions = computed(() => {
  if (!config.VERSION) {
    return null
  }
  const versions = (config.SUBPATH || []).filter((v) => v.version)
  // @ts-ignore
  versions.push({
    version: config.VERSION,
    homePath: '/',
  })
  return versions.length > 0 ? versions : null
})

export const version = computed({
  set(value) {
    const item = versions.value!.find((v) => v.version === value)!
    router.push(item.homePath)
  },
  get() {
    return subpathConfig.value?.version || config.VERSION
  },
})

export const homeUrl = computed(() => subpathConfig.value?.homePath || '/')

export const search = computed(() => {
  return (subpathConfig.value?.search || config.SEARCH).map((v) => {
    const alternate = router?.resolve(v).meta.alternate
    // @ts-ignore
    return (alternate?.[i18n.global.locale] as string) || v
  })
})
