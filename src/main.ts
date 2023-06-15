import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import YXTUI from '../lib/umd/yxt-ui.common.js' // 引入YXTUI组件库
import '../lib/umd/yxt-ui.css'
import 'normalize.css/normalize.css' // 样式重置
import '@/utils/frameworks'
import '@/qk'
import '@/utils/dialog'
import '@/mock/mock'
import { i18n } from '@/lang'

Vue.config.productionTip = false
Vue.prototype.$YXTUI = YXTUI
Vue.use(YXTUI)

let qkinstance: any = new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#tsee')

export default qkinstance
