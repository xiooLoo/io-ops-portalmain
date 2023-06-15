export const settingRouters = [
  {
    path: 'accountManagement',
    name: 'accountManagement',
    component: () => import('../pages/accountManagement/index.vue'),
    meta: { title: 'message.portal.router.userAccount', icon: 'Mewode', hidden: false, isMenu: true }
  },
  {
    path: 'accountManagement/accountManagementAdd',
    name: 'accountManagementAdd',
    component: () => import('../pages/accountManagement/accountManagementAdd.vue'),
    meta: { title: 'message.portal.router.userAccountAdd', noCache: true }
  },
  {
    path: 'accountManagement/accountManagementEditor/:id',
    name: 'accountManagementEditor',
    component: () => import('../pages/accountManagement/accountManagementEditor.vue'),
    meta: { title: 'message.portal.router.userAccountEdit', noCache: true }
  },
  {
    path: 'accountManagement/accountManagementDetail/:id',
    name: 'accountManagementDetail',
    component: () => import('../pages/accountManagement/accountManagementDetail.vue'),
    meta: { title: 'message.portal.router.userAccountDetail', noCache: true }
  },
  /**
   * 单位档案
   */
  {
    path: 'corporateFilePage',
    name: 'corporateFilePage',
    component: () => import('../pages/corporateFilePage/index.vue'),
    meta: { title: 'message.portal.router.corporateFile', icon: 'biaodan', hidden: false, isMenu: true }
  },
  {
    path: 'corporateFilePage/corporateFilePageAdd',
    name: 'corporateFilePageAdd',
    component: () => import('../pages/corporateFilePage/corporateFilePageAdd.vue'),
    meta: { title: 'message.portal.router.corporateFileAdd', noCache: true }
  },
  {
    path: 'corporateFilePage/corporateFilePageEditor',
    name: 'corporateFilePageEditor',
    component: () => import('../pages/corporateFilePage/corporateFilePageEditor.vue'),
    meta: { title: 'message.portal.router.corporateFileEdit', noCache: true }
  },
  {
    path: 'corporateFilePage/corporateFilePageDetails',
    name: 'corporateFilePageDetails',
    component: () => import('../pages/corporateFilePage/corporateFilePageDetails.vue'),
    meta: { title: 'message.portal.router.corporateFileDetail', noCache: true }
  },
  /**
   * 部门管理
   */
  {
    path: 'departmentManagementPage',
    name: 'departmentManagementPage',
    component: () => import('../pages/departmentManagementPage/index.vue'),
    meta: { title: 'message.portal.router.departmentManagement', icon: 'wuyefei', hidden: false, isMenu: true }
  },
  {
    path: 'departmentManagementPage/departmentManagementPageAdd',
    name: 'departmentManagementPageAdd',
    component: () => import('../pages/departmentManagementPage/departmentManagementPageAdd.vue'),
    meta: { title: 'message.portal.router.departmentManagementAdd', noCache: true }
  },
  {
    path: 'departmentManagementPage/departmentManagementPageEditor',
    name: 'departmentManagementPageEditor',
    component: () => import('../pages/departmentManagementPage/departmentManagementPageEditor.vue'),
    meta: { title: 'message.portal.router.departmentManagementEdit', noCache: true }
  },
  {
    path: 'departmentManagementPage/departmentManagementPageDetails',
    name: 'departmentManagementPageDetails',
    component: () => import('../pages/departmentManagementPage/departmentManagementPageDetails.vue'),
    meta: { title: 'message.portal.router.departmentManagementDetail', noCache: true }
  },
  /**
   * 日志管理
   */
  {
    path: 'logManagement',
    name: 'logManagement',
    component: () => import('../pages/logManagement/index.vue'),
    meta: { title: 'message.portal.router.logManagement', icon: 'fankui', hidden: false, isMenu: true }
  }
]
