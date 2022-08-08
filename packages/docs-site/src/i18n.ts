import {
  createApp,
  ref,
  ComponentInternalInstance,
  onBeforeUnmount,
  getCurrentInstance,
} from 'vue'
import { createI18n } from 'vue-i18n'
import * as VueRouter from 'vue-router'
import { AxiosInstance } from 'axios'
import { cloneObject } from './utils'
import * as hp from 'helper-js'
import config from './config'

export const i18n = createI18n({
  locale: config.LOCALE, // set locale
  fallbackLocale: config.LOCALE, // set fallback locale
  messages: {
    en: {
      Languages: 'Languages',
      Home: 'Home',
      Works: 'Works',
      About: 'About',
      Version: 'Version',
      Guide: 'Guide',
      API: 'API',
      Examples: 'Examples',
      'Get Started': 'Get Started',
      'More Examples': 'More Examples',
    },
    zh: {
      Languages: '语言',
      Home: '首页',
      Works: '作品',
      About: '关于',
      Version: '版本',
      Guide: '使用指南',
      API: 'API',
      Examples: '例子',
      'Get Started': '快速开始',
      'More Examples': '更多例子',
    },
  },
})

export function initI18n(app: ReturnType<typeof createApp>) {
  app.use(i18n)
}

export function i18nInitRouter(router: VueRouter.Router) {
  const isSingleLangRoute = (route: any) => Boolean(route.meta.locale) // compiled markdown comonent is single-lang
  router.getRoutes().forEach((route) => {
    if (route.path && !isSingleLangRoute(route) && route.meta.i18n !== false) {
      const localePath = `/:locale${route.path}`.replace(/\/$/, '')
      const newRoute = cloneObject(route)
      newRoute.components = route.components
      newRoute.path = localePath
      // @ts-ignore
      newRoute.name = `${newRoute.name}.i18n`
      router.addRoute(newRoute)
    }
  })
  router.beforeEach((to, from) => {
    if (
      to.params.locale &&
      !i18n.global.availableLocales.includes(to.params.locale as string)
    ) {
      //  wrong locale
      return { name: 'NotFound' }
    }
  })
  router.afterEach((to, from, failure) => {
    if (failure) {
      return
    }

    // @ts-ignore
    const locale: string =
      to.params.locale ||
      to.meta.locale ||
      (Array.isArray(i18n.global.fallbackLocale)
        ? i18n.global.fallbackLocale[0]
        : i18n.global.fallbackLocale)
    if (locale !== i18n.global.locale) {
      i18n.global.locale = locale
    }
  })
}

export function i18nInitAxios(axiosInstance: AxiosInstance) {
  // axiosInstance.defaults.baseURL = axiosInstance.defaults.baseURL
  axiosInstance.interceptors.request.use(
    function (config) {
      config.baseURL = config.baseURL + '/' + i18n.global.locale
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
}

export function getRouteByLocale(
  route: VueRouter.RouterLinkProps['to'],
  locale: string
) {
  // @ts-ignore
  if (route.meta.alternate) {
    // @ts-ignore
    return {
      path: route.meta.alternate[locale],
      params: { ...route.params },
      query: { ...route.query },
      hash: route.hash,
    }
  }
  // @ts-ignore
  const newRoute: VueRouter.RouterLinkProps['to'] = hp.objectOnly(route, [
    'name',
    'params',
    'query',
    'hash',
  ])
  if (locale === i18n.global.fallbackLocale) {
    if (newRoute.params) {
      newRoute.params = { ...newRoute.params }
      delete newRoute.params.locale
    }
    // @ts-ignore
    newRoute.name = newRoute.name.replace(/\.i18n$/, '')
  } else {
    if (!newRoute.params) {
      newRoute.params = {}
    }
    newRoute.params.locale = locale
    // @ts-ignore
    if (!newRoute.name.match(/\.i18n$/)) {
      // @ts-ignore
      newRoute.name = newRoute.name + '.i18n'
    }
  }
  return newRoute
}

interface Hoooks {
  afterI18nRouteGenerated?: (
    route: VueRouter.RouteLocationNormalizedLoaded,
    to: string
  ) => VueRouter.RouteRecordRaw
}
export const hooks: Hoooks = {}
export const useOnAfterI18nRouteGenerated = generateUseFunction<
  Hoooks['afterI18nRouteGenerated']
>('afterI18nRouteGenerated')

export function switchLocale(
  to: string,
  router: VueRouter.Router,
  currentRoute: VueRouter.RouteRecordRaw
) {
  let newRoute = getRouteByLocale(currentRoute, to)
  if (hooks.afterI18nRouteGenerated) {
    // @ts-ignore
    newRoute = hooks.afterI18nRouteGenerated(newRoute, to)
  }

  router.push(newRoute)
}

function generateUseFunction<T>(name: string) {
  return (hook: T, vm?: ComponentInternalInstance) => {
    // @ts-ignore
    hooks[name] = hook
    const thevm = vm || getCurrentInstance()
    if (!thevm) {
      throw new Error(
        `i18n hook ${name}: the second argument is required when called outside of setup`
      )
    }
    onBeforeUnmount(() => {
      // @ts-ignore
      if (hooks[name] === hook) {
        // @ts-ignore
        hooks[name] = null
      }
    }, thevm)
  }
}
