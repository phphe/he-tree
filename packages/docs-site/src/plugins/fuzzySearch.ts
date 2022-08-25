import { reactive } from 'vue'
import searchDataLoader from '../compiled-docs/searchDataLoader'

export interface SearchData {
  [pageID: string]: { title: string; url: string; pid: number }[] // pageID is page url, like '/v1/guide'
}

export const searchData = reactive<SearchData>({})

const cached: Record<string, unknown> = {}
export default async function search(pattern: string, paths: string[]) {
  const scope = JSON.stringify(paths)
  if (!cached[scope]) {
    const data = []
    // @ts-ignore
    const waitFuse = import('fuse.js/dist/fuse.basic.esm.js')
    for (const path of paths) {
      if (!searchData[path]) {
        // @ts-ignore
        const loader = searchDataLoader[path]
        if (!loader) {
          throw new Error(`Can't find search data of path: ${path}`)
        }
        searchData[path] = await loader()
      }
      for (const item of searchData[path]) {
        // @ts-ignore
        item.pagePath = path
      }
      data.push(...searchData[path])
    }
    const Fuse = (await waitFuse).default
    cached[scope] = new Fuse(data, {
      keys: ['title'],
    })
  }
  // refer: https://fusejs.io/examples.html#search-object-array
  // @ts-ignore
  const matched = cached[scope].search(pattern, {
    minMatchCharLength: 2,
    threshold: 0,
  })
  const result: SearchData['pageID'][0][][] = []
  if (matched) {
    for (const item of matched) {
      const family = [item.item]
      let cur = item.item
      while (cur && cur.pid != null) {
        const page = searchData[cur.pagePath]!
        cur = page[cur.pid]
        family.unshift(cur)
      }
      result.push(family)
    }
  }
  return result
}
