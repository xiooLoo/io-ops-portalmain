import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'
import { matchRouteMenu } from './matchRouteMenu'
import Layout from '@/views/layout/index.vue'
import { themeRouters } from './themeRouters'
import { portalRouters } from './portalRouters'
import { settingRouters } from '@/views/commons/setting/router/settingRouters'

Vue.use(VueRouter)

export const baseRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pages/home/index.vue'),
        name: 'index',
        meta: { title: 'message.portal.router.home', icon: 'shouyeHome' }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/profile',
    meta: { hidden: true, noCache: false },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/pages/profile/index.vue'),
        meta: { title: 'message.portal.router.personalCenter', icon: 'Mewode', noCache: false }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/setting',
    component: Layout,
    meta: { hidden: true, noCache: false },
    children: [
      ...settingRouters
    ]
  },
  // {
  //   path: '/portalMng',
  //   component: Layout,
  //   meta: { title: 'message.portal.router.portalMng', icon: 'FI-Mode', alwaysShow: true, hidden: false, noCache: false },
  //   redirect: '/portalMng/beforeLogin',
  //   children: [
  //     ...portalRouters
  //   ]
  // },
  /**
   √ Qiankun微应用路由
   x 暂未使用
   {
     path: '/portalsub',
     component: Layout,
     meta: { title: 'message.portal.router.user', icon: 'Mewode', alwaysShow: true, hidden: false, noCache: false },
     children: [
       ...themeRouters
     ]
   },
   */
  {
    path: '/*',
    component: () => import('@/views/pages/error-page/404.vue'),
    meta: { hidden: true }
  }
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes: baseRoutes
})
// 路由守卫
router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  matchRouteMenu(to, from, next)
})

export default router

