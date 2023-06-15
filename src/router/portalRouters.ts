/**
 * 门户网站管理平台路由
 */
export const portalRouters = [
  {
    path: 'beforeLogin',
    name: 'beforeLogin',
    component: () => import(/* webpackChunkName: 'beforeLoginChunk' */ '@/views/pages/beforeLogin/index.vue'),
    meta: { title: 'message.portal.router.beforeLogin', alwaysShow: false, icon: 'FI-Mode', noCache: false }
  },
  {
    path: 'doingLogin',
    name: 'doingLogin',
    component: () => import(/* webpackChunkName: 'doingLoginChunk' */ '@/views/pages/doingLogin/index.vue'),
    meta: { title: 'message.portal.router.doingLogin', alwaysShow: false, icon: 'FI-Mode', noCache: false }
  },
  {
    path: 'afterLogin',
    name: 'afterLogin',
    component: { render: e => e('router-view') },
    meta: { title: 'message.portal.router.afterLogin', alwaysShow: true, icon: 'FI-Mode', noCache: false },
    redirect: '/portalMng/afterLogin/workbenchMng',
    children: [
      {
        path: 'workbenchMng',
        name: 'workbenchMng',
        component: { render: e => e('router-view') },
        meta: { title: 'message.portal.router.workbenchMng', alwaysShow: false, icon: 'FI-Mode', noCache: false, breadcrumb: false },
        redirect: '/portalMng/afterLogin/workbenchMng/index',
        children: [
          {
            path: 'index',
            name: 'workbenchMngIndex',
            component: () => import(/* webpackChunkName: 'afterLoginChunk' */ '@/views/pages/afterLogin/workbenchMng/index.vue'),
            meta: { title: 'message.portal.router.workbenchMng', hidden: false, icon: 'FI-Mode', noCache: false, activeMenu: '/portalMng/afterLogin/workbenchMng/index' }
          }
        ]
      },
      {
        path: 'themeMng',
        name: 'themeMng',
        component: () => import(/* webpackChunkName: 'afterLoginChunk' */ '@/views/pages/afterLogin/themeMng.vue'),
        meta: { title: 'message.portal.router.themeMng', icon: 'FI-Mode', noCache: false }
      }
    ]
  }
]
