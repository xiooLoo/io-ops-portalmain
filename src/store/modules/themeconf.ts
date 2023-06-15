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
import { ThemeFace, StoreModulesFace } from '../types'
import { apiGetIconfontConfig, apiGetThemeConfig } from '@/api/themeconf/index'
import { getIconfontConfig, LAYOUT_MODE_1, LAYOUT_MODE_2, LAYOUT_MODE_3, LAYOUT_MODE_4 } from '@/mock/mock'
import { LayoutconfModule } from './layoutconf'

export interface UThemeconfState {
  iconfont: object; // 当前图标库
  ttf: object; // 当前字体库
  theme: ThemeFace; // 当前颜色主题
  ioTheme: object; // 当前亮/暗主题
  lang: string; // 当前语言 type: LangTypes
}

export interface UIconfontFace {
  current: string;
}
export interface UTtfFace {
  current: string;
}

export interface UIoTheme {
  current: string;
}

const store_vuex: StoreModulesFace = localCache.getCache('store_vuex') ? JSON.parse(localCache.getCache('store_vuex')) : {}
const vuex_themeconf: any = store_vuex.themeconf ? store_vuex.themeconf : {}

@Module({ namespaced: true, dynamic: true, store, name: 'themeconf' })
class Themeconf extends VuexModule implements UThemeconfState {
  public iconfont: UIconfontFace = vuex_themeconf.iconfont || {};
  public ttf: UTtfFace = vuex_themeconf.ttf || {};
  public theme: ThemeFace = vuex_themeconf.theme || {};
  public ioTheme: UIoTheme = vuex_themeconf.ioTheme || {};
  public lang: string = vuex_themeconf.lang || 'zh-CN';

  @Mutation
  public SET_ICONFONT(iconfont: UIconfontFace) {
    this.iconfont = iconfont
  }

  @Mutation
  public SET_TTF(ttf: UTtfFace) {
    this.ttf = ttf
  }

  /**
   * 设置系统主题
   */
  @Mutation
  public SET_THEME(theme: ThemeFace) {
    this.theme = theme
  }

  @Mutation
  public SET_IO_THEME(ioTheme: UTtfFace) {
    this.ioTheme = ioTheme
  }

  @Mutation
  public SET_LANG(lang: string) {
    // Vue.prototype.$notify({ title: lang === 'zh-CN' ? '中文' : '英文', type: 'warning', offset: 80, message: '已切换' })
    this.lang = lang
  }

  /**
   * 获取门户iconfont、布局、主题配置
   */
  @Action
  public getThemeconf() {
    return new Promise((resolve, reject) => {
      apiGetIconfontConfig().then((res: any) => {
        if (res && res.code == 0) {
          this.setIconfontConf(res.data.iconfont)
          this.setTtfConf(res.data.ttf)
          this.setLang(res.data.i18n)
          this.setIoTheme(res.data.ioTheme)
          this.toSetTheme(res.data.theme)
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(() => {
        const res: any = getIconfontConfig()
        this.setIconfontConf(res.data.iconfont)
        this.setTtfConf(res.data.ttf)
        this.setLang(res.data.i18n)
        this.setIoTheme(res.data.ioTheme)
        this.toSetTheme(res.data.theme)
        resolve(res.data)
      })
    })
  }

  @Action
  public setIo(conf: any) {
    // Theme
    this.setIconfontConf(conf.iconfont)
    this.setTtfConf(conf.ttf)
    this.setLang(conf.i18n)
    this.setIoTheme(conf.ioTheme)
    this.toSetTheme(conf.theme)
    // Layout
    LayoutconfModule.setAsMode(conf.asMode)
    LayoutconfModule.setAsConf(conf.asConf)
  }

  /**
   * 获取门户iconfont、布局、主题配置
   */
  @Action
  public getThemeConfig(params: any) {
    const dt = {
      portalProtocol: {
        themePlan: {
          current: {
            i18n: 'zh-CN',
            asMode: 'T-Mode',
            iconfont: {
              current: 'iconfont_1',
              arr: []
            },
            ttf: {
              current: 'puHuiTi',
              arr: []
            },
            ioTheme: {
              current: 'light',
              arr: []
            },
            theme: {
              current: {
                current: 'theme-default',
                name: '默认主题',
                color: '#2E78FF'
              },
              arr: []
            }
          },
          arr: []
        },
        pageCode: 'pageCode-x',
        oths: {
          isShowHamburger: true,
          isShowBreadcrumb: true,
          sidebar: {
            isCollapse: true
          },
          tab: {
            isShow: true
          },
          navbar: {
            isShow: true,
            items: [
              { id: 'lang', icon: '', lang_zh: '中/英', lang_en: 'Zh/En', isShow: true },
              { id: 'setting', icon: '', lang_zh: '设置', lang_en: 'Setting', isShow: true },
              { id: 'theme', icon: '', lang_zh: '主题', lang_en: 'Theme', isShow: true }
            ]
          },
          logo: {
            isShow: true,
            src: 'https://pic.imgdb.cn/item/643e33620d2dde577757401d.png',
            title: '易迅通业务系统管理端',
            name: 'name-x',
            code: 'code-x'
          },
          contentLayout: {
            current: JSON.stringify(LAYOUT_MODE_1()),
            items: [
              { id: 'mode_1', label: '布局一', value: 'LAYOUT_MODE_1', content: LAYOUT_MODE_1(), isActive: true },
              { id: 'mode_2', label: '布局二', value: 'LAYOUT_MODE_2', content: LAYOUT_MODE_2() },
              { id: 'mode_3', label: '布局三', value: 'LAYOUT_MODE_3', content: LAYOUT_MODE_3() },
              { id: 'mode_4', label: '布局四', value: 'LAYOUT_MODE_4', content: LAYOUT_MODE_4() }
            ]
          }
        }
      }
    }

    return new Promise((resolve, reject) => {
      apiGetThemeConfig(params).then((res: any) => {
        console.log('获取[中心化配置]-[iconfont]：', res)
        if (res && res.code == 0) {
          const pm = {
            iconfont: {
              ...res.data.portalProtocol.themePlan.current.iconfont,
              ...dt.portalProtocol.themePlan.current.iconfont
            },
            ttf: {
              ...res.data.portalProtocol.themePlan.current.ttf,
              ...dt.portalProtocol.themePlan.current.ttf
            },
            ioTheme: {
              ...res.data.portalProtocol.themePlan.current.ioTheme,
              ...dt.portalProtocol.themePlan.current.ioTheme
            },
            theme: {
              ...res.data.portalProtocol.themePlan.current.theme,
              ...dt.portalProtocol.themePlan.current.theme.current
            },
            i18n: dt.portalProtocol.themePlan.current.i18n,
            asMode: dt.portalProtocol.themePlan.current.asMode,
            asConf: {
              ...dt.portalProtocol.oths,
              contentLayout: {
                ...dt.portalProtocol.oths.contentLayout,
                ...res.data.portalProtocol.contentLayout
              }
            }
          }
          this.setIo(pm)
          resolve(dt)
        } else {
          reject(res)
        }
      }).catch(() => {
        const pm = {
          iconfont: dt.portalProtocol.themePlan.current.iconfont,
          ttf: dt.portalProtocol.themePlan.current.ttf,
          ioTheme: dt.portalProtocol.themePlan.current.ioTheme,
          theme: dt.portalProtocol.themePlan.current.theme.current,
          i18n: dt.portalProtocol.themePlan.current.i18n,
          asMode: dt.portalProtocol.themePlan.current.asMode,
          asConf: dt.portalProtocol.oths
        }
        this.setIo(pm)
        resolve(dt)
      })
    })
  }

  /**
   * 配置当前iconfont库
   * @param iconfont 参数结构如：{ current: 'iconfont_1' }
   */
  @Action
  public setIconfontConf(iconfont: UIconfontFace) {
    this.SET_ICONFONT(iconfont)
  }

  /**
   * 配置当前ttf库
   * @param ttf 参数结构如：{ current: 'ttf_1' }
   */
  @Action
  public setTtfConf(ttf: UTtfFace) {
    this.SET_TTF(ttf)
  }

  /**
   * 设置主题色
   * @param theme 参数结构如：{ current: 'default' }
   */
  @Action
  public toSetTheme(theme: ThemeFace) {
    this.SET_THEME(theme)
  }

  /**
   * 设置亮/暗模式
   * @param ioTheme 参数结构如：{ current: 'light' }
   * 可选项：light | dark
   */
  @Action
  public setIoTheme(ioTheme: UIoTheme) {
    this.SET_IO_THEME(ioTheme)
  }

  /**
   * 配置当前lang语言环境
   * @param lang 参数如：'zh-CN' 或 'zh-EN'
   */
  @Action
  public setLang(lang: string) {
    this.SET_LANG(lang)
  }

  @Action
  public getLang() {
    return this.lang
  }
}

export const ThemeconfModule = getModule(Themeconf)
