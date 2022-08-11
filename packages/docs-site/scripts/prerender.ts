// scrape pages from vite preview
import fs from 'fs'
import path from 'path'
// @ts-ignore
import Nightmare from 'nightmare'
import child_process from 'child_process'
// @ts-ignore
import { minify } from 'html-minifier'
import * as hp from 'helper-js'
import axios from 'axios'
import baseConfig from '../docs/config'
import { getLocales } from './utils'

const PREVIEW_URL = `http://localhost:4173` // vite preview
const DIST_PRERENDERED = 'dist-prerendered'
const RETRY = 3
const WORKERS = 5
const MAX_TIMES = 1000
let urlPool: string[] = []
const usedUrls: string[] = []

start()
async function start() {
  if (fs.existsSync(DIST_PRERENDERED)) {
    rmDir(DIST_PRERENDERED)
  }
  copyDir('dist', DIST_PRERENDERED)
  // start urls
  const locales = getLocales()
  const urls0: string[] = []
  urls0.push('/')
  locales.forEach((v) => {
    if (v !== baseConfig.I18N.locale) {
      urls0.push('/' + v)
    }
  })
  if (baseConfig.MENU) {
    for (const item of baseConfig.MENU) {
      urls0.push(item.path)
    }
  }
  if (baseConfig.SUBPATH) {
    for (const sub of baseConfig.SUBPATH) {
      urls0.push(sub.homePath)
      if (sub.menu) {
        for (const item of sub.menu) {
          urls0.push(item.path)
        }
      }
    }
  }
  for (const url of urls0) {
    addUrl(url)
  }
  //
  const successfulUrls: string[] = []
  let tempUrl: string
  let i = 0
  while (urlPool.length > 0) {
    const workers = []
    for (let index = 0; index < WORKERS; index++) {
      tempUrl = urlPool.shift()!
      if (!tempUrl) {
        break
      }
      usedUrls.push(tempUrl)
      workers.push(
        scrapeOnePage(PREVIEW_URL + tempUrl)
          .then((urls) => {
            successfulUrls.push(tempUrl)
            return urls
          })
          .catch((e) => [])
      )
    }
    for (const newUrls of await Promise.all(workers)) {
      for (const url of newUrls) {
        addUrl(url)
      }
    }
    i++
    if (i > MAX_TIMES) {
      throw 'loop error'
    }
  }
  //
  genSitemapAndRobotsTXT(successfulUrls)
  console.log('prerender done')
}

function copyDir(src: string, dist: string) {
  child_process.spawnSync('cp', ['-r', src, dist])
}

function rmDir(src: string) {
  child_process.spawnSync('rm', ['-rf', src])
}

/**
 *
 * @param url
 * @param opt
 * @param count
 * @returns urls in the page
 */
function scrapeOnePage(url: string, opt = {}, count = 0) {
  const urlWithoutHost = removeHost(url)
  return new Promise<string[]>((resolve, reject) => {
    const nightmare = Nightmare({ show: false, ...opt })
    nightmare
      .goto(url)
      // @ts-ignore
      .wait('title')
      .evaluate(() => {
        const html = document.documentElement.outerHTML
        // get all links
        const urls: string[] = []
        const t: Element[] = []
        t.push(...document.querySelectorAll('a'))
        t.push(...document.querySelectorAll('link[rel="alternate"]'))
        t.forEach((el) => {
          let url = el.getAttribute('href')
          if (!url) {
            return
          }
          url = url.replace(/#.*$/, '') // remove hash
          urls.push(url)
        })
        return { html, urls }
      })
      .end()
      // @ts-ignore
      .then(({ html, urls }: { html: string; urls: string[] }) => {
        html = html.replace(
          '</head>',
          '<script>window.__IS_GENERATED__ = true</script></head>'
        )
        html = html.replaceAll(PREVIEW_URL, baseConfig.ORIGIN_PROD)
        html = minify(`<!DOCTYPE html>${html}`)
        writeFileSyncRecursively(
          path.join(
            DIST_PRERENDERED,
            urlWithoutHost.replace(/\/$/, '') + '/index.html'
          ),
          html
        )
        console.log(`Page scraped:`, urlWithoutHost)
        urls = urls
          .filter((v) => isInternalUrl(v))
          .map((v) => {
            let r = removeHost(v)
            if (r === '') {
              r = '/'
            }
            return r
          })
        resolve(urls)
      })
      .catch((e: Error) => {
        console.log('Page failed:', urlWithoutHost, e)
        if (count < RETRY - 1) {
          console.log('Page retry:', urlWithoutHost)
          resolve(scrapeOnePage(url, opt, count + 1))
        } else {
          reject(e)
        }
      })
  })
}

function writeFileSyncRecursively(filepath: string, contents: string) {
  const dir = path.dirname(filepath)
  if (!fs.existsSync(dir)) {
    // @ts-ignore
    fs.mkdirSync(dir, { recursive: true })
  }
  return fs.writeFileSync(filepath, contents)
}

function removeHost(url: string) {
  return url.replace(/^.*\/\/[^/]+/, '')
}

function isInternalUrl(url: string) {
  try {
    return new URL(url).hostname === new URL(PREVIEW_URL).hostname
  } catch (error) {
    return true
  }
}

function genSitemapAndRobotsTXT(urls: string[]) {
  urls = urls.map((v) => {
    v = baseConfig.ORIGIN_PROD + v
    if (!v.endsWith('/')) {
      v += '/'
    }
    return v
  })
  const lastmod = new Date().toISOString()
  let t = urls
    .map(
      (url) => `<url>
  <loc>${url}</loc>
  <lastmod>${lastmod}</lastmod>
  <priority>${url === baseConfig.ORIGIN_PROD + '/' ? '1.00' : '0.80'}</priority>
</url>`
    )
    .join('\n')
  let r = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${t}
</urlset>`
  fs.writeFileSync(path.join(DIST_PRERENDERED, 'sitemap.xml'), r)
  const hostname = new URL(baseConfig.ORIGIN_PROD).hostname
  fs.writeFileSync(
    path.join(DIST_PRERENDERED, 'robots.txt'),
    `Sitemap: ${hostname}/sitemap.xml`.trim()
  )
}

function addUrl(url: string) {
  if (!url || typeof url !== 'string' || !isInternalUrl(url)) {
    return
  }
  url = url.replace(/#.*$/, '') // remove hash
  url = removeHost(url)
  url = url.replace(/\/index.html?$/, '').replace(/\/$/, '')
  if (url === '') {
    url = '/'
  }
  if (!urlPool.includes(url) && !usedUrls.includes(url)) {
    urlPool.push(url)
  }
}
