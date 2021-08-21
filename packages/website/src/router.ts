import * as VueRouter from 'vue-router'
import { ref, nextTick } from 'vue'
import compiledRoutes from './compiled-docs/routes'

export const routes: VueRouter.RouteRecordRaw[] = [
  ...compiledRoutes,
  {
    name: 'home',
    path: '/',
    component: () => import('./views/home.vue'),
  },
  {
    name: 'examples',
    path: '/examples',
    component: () => import('./views/examples.vue'),
  },
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
})

export const routeViewKey = ref(Math.random().toString())
export const reloadRouteView = () => {
  routeViewKey.value = Math.random().toString()
}
