import { createApp } from 'vue'
import './index.css'
import './assets/style/site.scss'
import App from './App.vue'
import { router } from './router'
import { initScrollToHash } from './scroll-to-hash'
import { api } from './http'
import { initI18n, i18nInitRouter, i18nInitAxios } from './i18n'
import { globalDirectivesInit } from './directives'
import * as globalComponents from './components/globalComponents'
import { initAnalytics } from './analytics'
import config from './config'

const app = createApp(App)
initScrollToHash(router)
initI18n(app)
i18nInitRouter(router)
i18nInitAxios(api)
globalDirectivesInit(app)
globalComponents.init(app)
initAnalytics(app, config.ANALYTICS_ID)
//
app.use(router)
app.mount('#app')
