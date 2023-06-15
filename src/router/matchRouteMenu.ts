import { NavigationGuardNext, Route } from 'vue-router/types/router'
import { UserModule } from '@/store/modules/user'

// 路由守卫
export function matchRouteMenu(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  const accessToken = UserModule.token
  if (accessToken) {
    if (to.path === '/login') {
      next({ path: '/index' })
    } else {
      // UserModule.getMenu()
      next()
    }
  } else {
    if (to && to.path && ['/login', '/404', '/505', '/403'].indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
}
