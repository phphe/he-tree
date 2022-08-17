import { defineConfig } from 'spa-prerender-cli'
import config from './docs/config'

export default defineConfig({
  origin: config.ORIGIN_PROD,
  staticDir: 'dist',
  outDir: 'dist-prerendered',
  addtionalUrl: ['/v1'],
})
