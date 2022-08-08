import * as VueRouter from 'vue-router'
import { ref, nextTick } from 'vue'
import compiledRoutes from './compiled-docs/routes'

export const routes: VueRouter.RouteRecordRaw[] = [
  ...compiledRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue'),
    meta: { i18n: false },
  },
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   console.log(to, from, savedPosition)
  //   if (savedPosition) {
  //     return savedPosition
  //   } else if (to.hash) {
  //     return {
  //       el: to.hash,
  //     }
  //   } else {
  //     return { top: 0, left: 0 }
  //   }

  //   // always scroll 10px above the element #main
  //   // return {
  //   //   // could also be
  //   //   // el: document.getElementById('main'),
  //   //   el: '#main',
  //   //   top: -10,
  //   // }
  // },
})

export const routeViewKey = ref(Math.random().toString())
export const reloadRouteView = () => {
  routeViewKey.value = Math.random().toString()
}
