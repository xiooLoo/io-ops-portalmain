import { Vue } from 'vue-property-decorator'
import _ from 'lodash'
import { ThemeconfModule } from '@/store/modules/themeconf'
import { preThemeList } from '@/styles/themes/config'
import FETCHKEY from './fetchKey'

/**
 * 全局mixin
 */
import global_mixin from '@/mixin/global_mixin'

/**
 * rsa加密库
 */
import '@/utils/encrypt'

/**
 * svg图标
 */
import SvgIcon from 'vue-svgicon'

/**
 * iconfont
 */
import '@/assets/svg-icons/components/index'

/**
 * 全局样式文件[入口]
 */
import '@/styles/index.scss'

Vue.prototype.$fetchKey = FETCHKEY
Vue.prototype._ = _
Vue.mixin(global_mixin)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.prototype.$preThemeList = preThemeList
Vue.prototype.$changeTheme = function (theme) {
  ThemeconfModule.toSetTheme(theme)
  const body = document.querySelector('body')!
  preThemeList.map(t => {
    body.classList.remove(t.current)
    if (t.current === theme.current) {
      t.isActive = true
    } else {
      t.isActive = false
    }
    return t
  })
  body.classList.add(ThemeconfModule.theme.current)
}

