import { reactive } from 'vue'
import * as hp from 'helper-js'
// @ts-ignore
const ENV: string = import.meta.env.MODE
const IS_DEVLOPMENT = ENV === 'development'
const IS_PRODUCTION = ENV === 'production'
// @ts-ignore
const IS_GENERATED = hp.glb().__IS_GENERATED__

export default reactive({
  ENV,
  IS_DEVLOPMENT,
  IS_PRODUCTION,
  API_BASE_URL:
    IS_DEVLOPMENT || !IS_GENERATED ? '//localhost:8000/api' : '/api',
  API_TIMEOUT: 20 * 1000,
  ANALYTICS_ID: IS_DEVLOPMENT ? '' : 'G-L74NT4DL5X',
  APP_NAME: 'he-tree',
  LOCALE: 'en',
})
