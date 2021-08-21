import axios from 'axios'
import config from './config'

export const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT || 20 * 1000,
  withCredentials: false,
})

api.interceptors.response.use((response) => response.data)
