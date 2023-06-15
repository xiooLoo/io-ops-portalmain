import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { ThemeconfModule } from '@/store/modules/themeconf'
import store from '@/store'
Vue.use(VueI18n)

export function getLang() {
  const lang = (ThemeconfModule && ThemeconfModule.lang) || (store && store.state && store.state.themeconf && store.state.themeconf.lang) || 'zh-CN'
  return lang
}

export const i18n = new VueI18n({
  locale: getLang(), // 语言标识
  messages: {
    'zh-CN': require('./cn'), // 中文语言包
    'zh-EN': require('./en') // 英文语言包
  }
})
