import { ThemeconfModule } from '@/store/modules/themeconf'

export default {
  data() {
    return {
      mixin_currentIconfont: ThemeconfModule.iconfont.current, // 默认生效的iconfont库
      mixin_currentTTF: ThemeconfModule.ttf.current, // 默认生效的ttf库
      mixin_currentIoTheme: ThemeconfModule.ioTheme.current // 默认生效的亮/暗模式
    }
  },
  computed: {
    mixin_getCurrentIconfont: {
      get() {
        return function(icon: string, prefix = 'icon') {
          return `${prefix} ${ThemeconfModule.iconfont.current} icon-${icon}`
        }
      },
      set(newFamilyName: string) {
        ThemeconfModule.setIconfontConf({
          current: newFamilyName
        })
      }
    }
  }
}
