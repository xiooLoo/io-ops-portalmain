import { LayoutconfModule } from '@/store/modules/layoutconf'
import { AppModule } from '@/store/modules/app'

export default {
  data() {
    return {
    }
  },
  computed: {
    /**
     * 是否显示Logo
     */
    isLogo() {
      return LayoutconfModule.asConf.logo.isShow
    },
    /**
     * 获取当前菜单是否关闭
     */
    isCollapse() {
      return !AppModule.sidebar.opened
    }
  }
}
