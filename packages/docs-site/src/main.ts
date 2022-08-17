import { createSSRApp, createApp } from 'vue'
import './assets/style/tailwind.css'
import './assets/style/transitions/fade.scss'
import './assets/style/site.scss'
import App from './App.vue'
import { router } from './router'
import { initScrollToHash } from './scroll-to-hash'
import { api } from './http'
import { initI18n, i18nInitRouter, i18nInitAxios } from './i18n'
import { globalDirectivesInit } from './directives'
import * as globalComponents from './components/globalComponents'
import { initAnalytics } from './analytics'
import initFloatingVue from './plugins/floating-vue'
import prerenderFix from './plugins/prerender-fix'
import config from './config'
import '../docs/style.scss'

const mountPoint = '#app'
prerenderFix(mountPoint)
const app = createSSRApp(App)

initScrollToHash(router)
initI18n(app)
i18nInitRouter(router)
i18nInitAxios(api)
globalDirectivesInit(app)
globalComponents.init(app)
initAnalytics(app, config.ANALYTICS_ID)
initFloatingVue(app)
//
app.use(router)
app.mount(mountPoint)
