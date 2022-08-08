// VueRouter scrollBehavior does not work, so use this file
import * as VueRouter from 'vue-router'
import { ref, nextTick } from 'vue'
import * as hp from 'helper-js'

export function initScrollToHash(router: VueRouter.Router) {
  let latestID = 0
  // const savedPositions = {}
  // router.beforeEach((to, from, next) => {
  //   if (!savedPositions[from.fullPath]) {
  //     savedPositions[from.fullPath] = {}
  //   }
  //   const savedPosition = savedPositions[from.fullPath]
  //   const els = [
  //     document.querySelector('.docs-submenu'),
  //     document.querySelector('.main-right'),
  //   ]
  //   els.forEach((el, i) => {
  //     if (el) {
  //       savedPosition[i] = { left: el.scrollLeft, top: el.scrollTop }
  //     }
  //   })
  //   next()
  // })
  router.afterEach(() => {
    if (location.hash) {
      const localID = ++latestID
      const elID = decodeURIComponent(location.hash.substr(1))
      nextTick(() => {
        const getEl = () =>
          document.getElementById(elID) || document.getElementsByName(elID)[0]
        hp.waitFor(() => Boolean(getEl()), 60, 333).promise.then(() => {
          if (localID !== latestID) {
            // expired
            return
          }
          const el = getEl()
          setTimeout(() => {
            el.scrollIntoView && el.scrollIntoView()
          }, 100)
        })
      })
    } else {
      const els = [
        document.querySelector('.docs-submenu'),
        document.querySelector('.main-right'),
      ]
      els.forEach((el, i) => {
        el?.scrollTo(0, 0)
      })
    }
  })
}
