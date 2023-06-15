import { Vue } from 'vue-property-decorator'
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { localCache } from '@/utils/cookies'
import { StoreModulesFace, AsModeEnum, AsConfFace, StoreWorkbenchArrFace } from '../types'
import { apiGetLayoutConfig } from '@/api/layoutconf/index'
import { getLayoutConfig, LAYOUT_MODE_1 } from '@/mock/mock'

export interface ULayoutconfState {
  asMode: AsModeEnum; // 布局库模式
  asConf: AsConfFace; // 布局详细配置
  storeWorkbenchArr: Array<StoreWorkbenchArrFace>; // 工作台当前【编辑中】的配置文件...
}

const store_vuex: StoreModulesFace = localCache.getCache('store_vuex') ? JSON.parse(localCache.getCache('store_vuex')) : {}
const vuex_layoutconf: any = store_vuex.layoutconf ? store_vuex.layoutconf : {}

@Module({ namespaced: true, dynamic: true, store, name: 'layoutconf' })
class Layoutconf extends VuexModule implements ULayoutconfState {
  public asMode: AsModeEnum = vuex_layoutconf.asMode || 'F-Mode';
  public asConf: AsConfFace = vuex_layoutconf.asConf || {};
  public storeWorkbenchArr: Array<StoreWorkbenchArrFace> = vuex_layoutconf.storeWorkbenchArr || LAYOUT_MODE_1()

  @Mutation
  public SET_AS_MODE(asMode: AsModeEnum) {
    this.asMode = asMode
  }

  @Mutation
  public SET_AS_CONF(asConf: AsConfFace) {
    this.asConf = asConf
  }

  @Mutation
  public SET_STORE_WORKBENCH(storeWorkbenchArr: Array<StoreWorkbenchArrFace>) {
    this.storeWorkbenchArr = storeWorkbenchArr
  }

  /**
   * 配置当前布局模式
   * @param asMode  F-Mode | T-Mode | Z-Mode
   */
  @Action
  public setAsMode(asMode: AsModeEnum) {
    this.SET_AS_MODE(asMode)
  }

  /**
   * 配置当前布局详细参数
   * @param asConf  any
   */
  @Action
  public setAsConf(asConf: AsConfFace) {
    this.SET_AS_CONF(asConf)
  }

  /**
   * 获取当前布局详细参数
   */
  @Action
  public getAsConf() {
    return this.asConf
  }

  /**
   * 保存【工作台】当前【编辑中】的配置文件
   */
  @Action
  public setStoreWorkbench(storeWorkbenchArr: Array<StoreWorkbenchArrFace>) {
    this.SET_STORE_WORKBENCH(storeWorkbenchArr)
  }

  /**
   * 获取当前布局配置
   */
  @Action
  getStoreWorkbench() {
    return this.storeWorkbenchArr
  }

  @Action
  clearStoreWorkbench() {
    this.SET_STORE_WORKBENCH([])
  }

  /**
   * 获取门户布局配置
   */
  @Action
  public getLayoutconf() {
    return new Promise((resolve, reject) => {
      apiGetLayoutConfig().then((res: any) => {
        console.log('获取[布局配置]-[layout]：', res)
        if (res && res.code == 0) {
          this.setAsMode(res.data.asMode)
          this.setAsConf(res.data.asConf)
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(() => {
        const res: any = getLayoutConfig()
        console.log('获取[布局配置]-[catcherror]-[layout]：', res)
        this.setAsMode(res.data.asMode)
        this.setAsConf(res.data.asConf)
        resolve(res.data)
      })
    })
  }
}

export const LayoutconfModule = getModule(Layoutconf)
