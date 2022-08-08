import * as hp from 'helper-js'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import * as chokidar from 'chokidar'
import * as crypto from 'crypto'
import * as cheerio from 'cheerio'
const { marked } = require('marked')
import { DocsSubmenu } from '../src/docsSubmenu'
import baseConfig from '../docs/config'
import { docsDir, getLocales } from './utils'

const compiledDir = 'src/compiled-docs'

const start = () => {
  if (fs.existsSync(compiledDir)) {
    execSync(`rm ${compiledDir} -rf`)
  }
  fs.mkdirSync(compiledDir)

  const watcher = chokidar.watch(docsDir)
  const data = {
    routes: {},
  } as {
    routes: {
      [md5Name: string]: {
        name: string | null
        md5Name: string
        componentPath: string
        path: string
        meta: Object
      }
    }
  }
  const updateRoutes = hp.debounceTrailing(() => {
    //
    let t2 = []
    for (const info of Object.values(data.routes)) {
      t2.push({
        name: info.md5Name,
        path: info.path,
        meta: info.meta,
        component: `import('./${info.md5Name}.vue')`,
      })
    }
    let routesContent = JSON.stringify(t2)
    routesContent = routesContent.replace(/"(import\(.*?\))"/g, '() => $1')
    routesContent = 'export default ' + routesContent
    fs.writeFileSync(path.join(compiledDir, 'routes.ts'), routesContent)
  }, 100).action

  console.log('start watching doc files')
  let first = true
  const firstDone = hp.debounceTrailing(async () => {
    first = false
    if (!process.argv.includes('--watch')) {
      // stop
      await watcher.close()
      console.log('stop watching')
    }
  }, 110).action
  watcher.on('all', (event, filepath) => {
    if (!['add', 'unlink', 'change'].includes(event)) {
      return
    }
    if (path.extname(filepath) !== '.md') {
      return
    }
    console.log(event, filepath)
    const md5Name =
      path.basename(filepath, path.extname(filepath)).replace(/\W/g, '_') +
      '_' +
      md5(filepath)
    const componentPath = path.join(compiledDir, md5Name + '.vue')
    if (event === 'unlink') {
      delete data.routes[md5Name]
      fs.unlinkSync(componentPath)
    } else {
      const locales = getLocales()
      let t = filepath.split(path.sep)
      const locale = t[1]
      const pathWithoutLocale = t.slice(2).join('/')
      const fileContent = fs.readFileSync(filepath).toString()
      const filename = hp.arrayLast(t)
      const codeDemoReplaced = handleCodeDemo(fileContent)
      const html = marked(codeDemoReplaced)
      let injectedComponents: Record<string, string> = {}
      const vueTemplate = handleHtmlForVue(html, filepath, injectedComponents)

      const structure = resolveMdStructure(html)

      const tpl = fs
        .readFileSync(path.join(__dirname, 'tpl/doc-template.vue'))
        .toString()
      const componentContent = tpl
        .replace('<!-- :template -->', vueTemplate)
        .replace("':data'", JSON.stringify(structure))
        .replace(
          /(?<=\n|^)(<script.*?>)/,
          '$1\n' +
            Object.keys(injectedComponents)
              .map(
                (name) =>
                  `import ${name} from ${JSON.stringify(
                    injectedComponents[name]
                  )}`
              )
              .join('\n')
        )
        .replace(
          '/*__components__*/',
          '...' +
            JSON.stringify(
              hp.objectMap(injectedComponents, (v, key) => key)
            ).replace(/:"(.*?)"/g, ':$1')
        )
      fs.writeFileSync(componentPath, componentContent)
      const urlPath = genUrl(locale, pathWithoutLocale)
      const alternate: any = {}
      for (const locale2 of locales) {
        const alternateFile = path.join(docsDir, locale2, pathWithoutLocale)
        if (fs.existsSync(alternateFile)) {
          alternate[locale2] = genUrl(locale2, pathWithoutLocale)
        }
      }
      const routeMeta = { locale, alternate, fromMarkdown: true }
      data.routes[md5Name] = {
        name: null,
        md5Name,
        componentPath,
        path: urlPath,
        meta: routeMeta,
      }
      // update alternate routes
      const alternatePaths = Object.values(alternate)
      Object.values(data.routes).forEach((info) => {
        if (alternatePaths.includes(info.path)) {
          // @ts-ignore
          info.meta.alternate = alternate
        }
      })
    }
    //
    updateRoutes()
    //
    if (first) {
      firstDone()
    }
  })
}

start()

function genUrl(locale: string, pathWithoutLocale: string) {
  let t = `/${pathWithoutLocale.replace('.md', '')}`
  if (locale !== baseConfig.LOCALE) {
    t = `/${locale}` + t
  }
  t = t.replace(/index$/, '')
  if (!t) {
    t = '/'
  }
  return t
}
function md5(str: string) {
  var md5 = crypto.createHash('md5')
  return md5.update(str).digest('hex')
}

function handleHtmlForVue(
  html: string,
  filepath: string,
  injectedComponents: Record<string, string>
) {
  html = html.replace(/<code/g, '<code v-pre') // for vue show '{{' and '}}'
  // replace heading to component
  for (let i = 1; i <= 6; i++) {
    html = html.replace(new RegExp(`<h${i}`, 'g'), `<vheading :level="${i}"`)
    html = html.replace(new RegExp(`</h${i}>`, 'g'), `</vheading>`)
  }
  // replace link to component
  const reg = /<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/g
  html = html.replace(reg, (matched) => {
    if (!isInternalDocHref(matched)) {
      return matched
    }
    const reg2 = new RegExp(reg.source)
    const m = matched.match(reg2)!
    let url = internalDocHrefToUrl(m[2], filepath)
    return `<Anchor${m[1]}:to="resolveHref('${url.replace(/'/g, "\\'")}')"${
      m[3]
    } underline>${m[4]}</Anchor>`
  })
  // inject user component
  html = html.replace(/<component path=".+?" \/>/g, (mathced) => {
    const m = mathced.match(/<component path="(.+?)" \/>/)!
    const componentPath = m[1]
    const name = `inject_${componentPath.replace(/\W/g, '_')}_${md5(mathced)}`
    injectedComponents[name] = handlePath(
      path.relative(compiledDir, path.join('src/', componentPath))
    )
    return `<${name} />`
  })
  return html
}

function resolveMdStructure(html: string) {
  const $ = cheerio.load(`<div class="md-root">${html}</div>`)
  const data: { children: DocsSubmenu[] } = {
    children: [],
  }
  const nodes: DocsSubmenu[] = [] // flat nodes
  $('.md-root *').each((i, el) => {
    if (
      el.tagName &&
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(el.tagName)
    ) {
      let $el = $(el)
      let level = parseInt(el.tagName.slice(1))
      let node = {
        name: $el.text(),
        id: $el.attr('id'),
        level,
        children: [],
      } as DocsSubmenu
      let parent
      for (const t of hp.iterateAll<DocsSubmenu>(nodes, { reverse: true })) {
        if (level - t.value.level === 1) {
          parent = t.value
          break
        }
      }
      if (!parent) {
        parent = data
      }
      parent.children.push(node)
      nodes.push(node)
    }
  })
  return data.children[0]
}

function handleCodeDemo(str: string) {
  return str.replace(
    /(?<=\n|^)<!-- code & demo -->\n\n\`\`\`(\w+)([\s\S]*?)\n\`\`\`/g,
    (mathced) => {
      const m = mathced.match(
        /^<!-- code & demo -->\n\n\`\`\`(\w+)([\s\S]*?)\n\`\`\`$/
      )!
      const lang = m[1]
      const code = m[2]
      const md5Name = md5(code)
      const componentPath = path.join(compiledDir, md5Name + '.vue')
      fs.writeFileSync(componentPath, code)
      // write code to a single ts file
      const codePath = path.join(
        compiledDir,
        'code_demo_code_' + md5Name + '.ts'
      )
      fs.writeFileSync(
        codePath,
        `export default \`${code.trim().replace(/\`/g, '\\`')}\``
      )
      // wrapper component
      let wrapperStr = fs
        .readFileSync(path.join(__dirname, 'tpl/CodeDemoWrapper.vue'))
        .toString()
      wrapperStr = wrapperStr
        .replace(
          '/*__import__*/',
          `import v_${md5Name} from ${JSON.stringify(
            handlePath(path.relative(compiledDir, componentPath))
          )}
          import code from ${JSON.stringify(
            handlePath(path.relative(compiledDir, codePath))
          )}
          `
        )
        .replace('/*__demo__*/', 'Demo: v_' + md5Name + ',')
        .replace(`code: ''`, `code: \`${code.trim().replace(/\`/g, '\\`')}\``)
      const wrapperName = 'code_demo_wrapper_' + md5(wrapperStr)
      let wrapperPath = path.join(compiledDir, wrapperName + '.vue')
      fs.writeFileSync(wrapperPath, wrapperStr)
      let wrapperPath2 = handlePath(path.relative('src', wrapperPath))
      return `<component path="${wrapperPath2}" />`
    }
  )
}

function handlePath(p: string) {
  if (p[0] !== '.') {
    p = './' + p
  }
  if (p.indexOf('\\') > -1) {
    p = p.split(path.sep).join(path.posix.sep)
  }
  return p
}

function isInternalDocHref(url: string) {
  if (url.match(/^[\w-_]+:/)) {
    // such as mailto:
    return false
  }
  if (url.match(/\.md\b/)) {
    return true
  }
}

function internalDocHrefToUrl(href: string, docPath: string) {
  let t = href.split('#')
  const hash = t[1]
  let targetAbsPath = path.resolve(path.dirname(docPath), t[0])
  let targetRelativePath = path.relative(docsDir, targetAbsPath)
  t = targetRelativePath.replace(/^.(\\|\/)/, '').split(path.sep)
  const locale = t[0]
  const pathWithoutLocale = t.slice(1).join('/')
  let url = genUrl(locale, pathWithoutLocale)
  if (hash) {
    url += '#' + hash.toLowerCase()
  }
  return url
}
