import { reactive } from 'vue'

export interface SearchData {
  [pageID: string]: { title: string; url: string; pid: number }[] // pageID is page url, like '/v1/guide'
}
export default reactive<SearchData>({})
