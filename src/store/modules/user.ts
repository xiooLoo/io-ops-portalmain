import { Vue } from 'vue-property-decorator'
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import router, { baseRoutes } from '@/router/index'
import { setToken, setUserData, localCache } from '@/utils/cookies'
import { UUserData } from '@/views/types/dataTypes'
import { StoreModulesFace, DynamicBtnListFace } from '../types'
import { APIGetMenu, ApiLogin, getCurrentUserInfo } from '@/api/login'
import { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import { appendRoutes } from '../appendRoutes'
import { preThemeList } from '@/styles/themes/config'

import axios, { AxiosResponse } from 'axios'
import { ILoginRes } from '@/views/pages/login/types'
import { ThemeconfModule } from './themeconf'
import { LayoutconfModule } from './layoutconf'
import { LAYOUT_MODE_1 } from '@/mock/mock'

export interface UUserState {
  // 用户数据
  userData: UUserData;
  token: string;
  routeList: RouteConfig[];
  appcode: string;
  dynamicBtnList: DynamicBtnListFace;
  dynamicBtnListCodes: Array<string>;
  dynamicMenuList: any[];
  httpDic: object;
}

const loadView = view => {
  return resolve => require([`@/views/pages/${view}`], resolve)
}
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  if (!asyncRouterMap || !asyncRouterMap.length) return []
  return asyncRouterMap.filter(route => {
    route.name = route.name
    if (route.component === 'Layout') {
      route.component = Layout
    } else {
      route.component = loadView(route.component)
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

const store_vuex: StoreModulesFace = localCache.getCache('store_vuex') ? JSON.parse(localCache.getCache('store_vuex')) : {}
const vuex_user: any = store_vuex.user ? store_vuex.user : {}
@Module({ namespaced: true, dynamic: true, store, name: 'user' })
class User extends VuexModule implements UUserState {
  public routeList: RouteConfig[] = vuex_user.routeList || [];
  public userData: UUserData = vuex_user.userData || {};
  public token: string = vuex_user.token || '';
  public appcode: string = vuex_user.appcode || '0093';
  public dynamicBtnList: DynamicBtnListFace = vuex_user.dynamicBtnList || {};
  public dynamicBtnListCodes: Array<string> = vuex_user.dynamicBtnListCodes || [];
  public otherBtnListCodes: Array<string> = vuex_user.otherBtnListCodes || [];
  public dynamicMenuList: any[] = vuex_user.dynamicMenuList || [];
  public httpDic: object = vuex_user.httpDic || {}

  /**
   * 存入用户数据
   * @param userData
   */
  @Mutation
  public SET_USER_DATA(userData: any) {
    this.userData = userData
    setUserData(userData)
  }

  /**
   * 存入token
   * @param token
   */
  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token
    setToken(token)
  }

  @Mutation
  public SET_MENU(routeList: RouteConfig[]) {
    router.addRoutes(routeList)
    this.routeList = baseRoutes.concat(routeList)
  }

  /**
   * 设置应用唯一编码code
   */
  @Mutation
  public SET_APPCODE(appcode: string) {
    this.appcode = appcode
  }

  /**
   * 设置应用按钮权限码
   * dynamicBtnList
   */
  @Mutation
  public SET_DYNAMIC_BTNLIST(dynamicBtnList: DynamicBtnListFace) {
    this.dynamicBtnList = dynamicBtnList
  }

  /**
   * 设置应用按钮权限码codes
   * dynamicBtnListCodes
   */
  @Mutation
  public SET_DYNAMIC_BTNLIST_CODES(dynamicBtnListCodes: Array<string>) {
    this.dynamicBtnListCodes = dynamicBtnListCodes
  }

  /**
   * 设置应用动态路由
   * dynamicMenuList
   */
  @Mutation
  public SET_DYNAMIC_MENULIST(dynamicMenuList: any[]) {
    this.dynamicMenuList = dynamicMenuList
  }

  /**
   * 字典缓存
   * httpDic
   */
   @Mutation
  public SET_HTTP_DIC(httpDic: object) {
    this.httpDic = httpDic
  }

   /**
   * [单位][角色][权限]权限码
   * otherBtnListCodes
   */
   @Mutation
   public SET_OTHER_BTN_LIST_CODES(otherBtnListCodes: Array<string>) {
     localStorage.setItem('otherBtnListCodes', JSON.stringify(otherBtnListCodes))
     this.otherBtnListCodes = otherBtnListCodes
   }

  /**
   * 对外暴露设置用户数据
   * @param userData
   */
  @Action
   public setUserData(userData: UUserData) {
     this.SET_USER_DATA(userData)
   }

  /**
   * 设置对外暴露存入token    UserModule.setToken
   * @param token
   */
  @Action
  public setToken(token: string) {
    this.SET_TOKEN(token)
  }

  /**
   * 获取用户菜单
   * @returns
   */
  @Action
  public async getMenu() {
    return await APIGetMenu().then((res: any) => {
      console.log('获取动态路由菜单：', res)
      const { btnList, menuList } = res.data
      const btnListCodes = btnList.map((i: any) => {
        return i.authSign
      })
      this.SET_DYNAMIC_BTNLIST(btnList)
      this.SET_DYNAMIC_BTNLIST_CODES(btnListCodes)
      this.SET_DYNAMIC_MENULIST(menuList)
      // TODO: 模拟获取动态路由菜单
      const respRoutes = appendRoutes // menuList // || appendRoutes
      const filterRoutes = filterAsyncRouter(respRoutes)
      this.setMenu(filterRoutes)
    }).catch(() => {
      const respRoutes = appendRoutes
      const filterRoutes = filterAsyncRouter(respRoutes)
      this.setMenu(filterRoutes)
    })
  }

  /**
   * 存入路由数据
   * @param routeList
   */
  @Action
  public setMenu(routeList: RouteConfig[]) {
    this.SET_MENU(routeList)
  }

  /**
   * 设置应用唯一编码code   UserModule.setAppcode
   * @param appcode
   */
  @Action
  public setAppcode(appcode: string) {
    this.SET_APPCODE(appcode)
  }

  /**
   * 设置应用按钮权限码Action
   * @param dynamicBtnList
   */
  @Action
  public setDynamicBtnList(dynamicBtnList: DynamicBtnListFace) {
    this.SET_DYNAMIC_BTNLIST(dynamicBtnList)
  }

  /**
   * 设置应用按钮权限码Codes Action
   * @param dynamicBtnListCodes
   */
  @Action
  public setDynamicBtnListCodes(dynamicBtnListCodes: Array<string>) {
    this.SET_DYNAMIC_BTNLIST_CODES(dynamicBtnListCodes)
  }

  /**
   * 设置应用动态路由Action
   * @param appcode
   */
  @Action
  public setDynamicMenuList(dynamicMenuList: any[]) {
    this.SET_DYNAMIC_MENULIST(dynamicMenuList)
  }

  /**
   * 设置字典
   * @param httpDic
   */
  @Action
  public setHttpDic(httpDic: object) {
    this.SET_HTTP_DIC(httpDic)
  }

  /**
   * [单位][角色][权限]权限码
   * @param otherBtnListCodes
   */
  @Action
  public setOtherBtnListCodes(otherBtnListCodes: Array<string>) {
    this.SET_OTHER_BTN_LIST_CODES(otherBtnListCodes)
  }

  @Action
  public login(params: any) {
    return new Promise((resolve, reject) => {
      ApiLogin(params).then((resp: AxiosResponse<ILoginRes>) => {
        const res = resp as any
        if (res && res.value) {
          this.setAppcode('0093')
          this.setToken(res.value)
          getCurrentUserInfo().then((resnext: any) => {
            console.log('LOGIN SUCCESSED~用户信息：', resnext)
            if (!resnext.data.topAreaCode) {
              resnext.data.topAreaCode = resnext.data.areaCode
            }
            this.setUserData({ ...res, additionalInformation: { ...res.additionalInformation, ...resnext.data } })
            this.getMenu()
            LayoutconfModule.setStoreWorkbench(LAYOUT_MODE_1())
            const pm = { userId: resnext.data.userId, enterpriseCode: 'dtsgc_enterprise_1524544564 ', roleId: '1' }
            axios.all([ThemeconfModule.getThemeConfig(pm)]).then(conf => {
              console.log('[axios.all]-配置获取成功conf:', conf)
              /**
               * 初始化-系统主题
               * 初始化-亮/暗模式
               */
              Vue.prototype.$changeTheme(ThemeconfModule.theme)
              window.document.documentElement.setAttribute('data-theme', ThemeconfModule.ioTheme.current)
              router.push('/')
            })
            resolve(res)
          })
        } else {
          Vue.prototype.$message({ type: 'error', message: res.msg || '登录失败' })
          reject(res)
        }
      })
    })
  }

  /**
   * 退出登录
   */
  @Action
  public async logout() {
    return await new Promise((resolve, reject) => {
      this.SET_USER_DATA({})
      this.SET_TOKEN('')
      this.SET_MENU([])
      this.SET_APPCODE('')
      this.SET_HTTP_DIC({})
      this.SET_DYNAMIC_BTNLIST({})
      this.SET_DYNAMIC_BTNLIST_CODES([])
      this.SET_DYNAMIC_MENULIST([])
      this.SET_OTHER_BTN_LIST_CODES([])
      ThemeconfModule.SET_THEME(preThemeList[0])
      LayoutconfModule.clearStoreWorkbench()
      localCache.clearCache()
      resolve(true)
    })
  }
}

export const UserModule = getModule(User)
