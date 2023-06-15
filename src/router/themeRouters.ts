/**
 √ Qiankun微应用路由
 x 暂未使用
 */
export const themeRouters = [
  {
    path: 'personal',
    name: 'personal',
    meta: { alwaysShow: false, icon: 'Mewode', noCache: false },
    children: [
      {
        path: 'profile',
        name: 'profile',
        meta: { title: 'message.portal.router.personalCenter', noCache: false, icon: 'Mewode' }
      }
    ]
  }
]
