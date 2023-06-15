import { Vue } from 'vue-property-decorator'
import BaseDialog from '../components/BaseDialog/index.vue'

// 创建Dialog构造器
const DialogConstrutor = Vue.extend(BaseDialog)
let instance
const dialog = function(options = {}) {
  // 设置默认参数为对象，如果参数为字符串，参数中message属性等于该参数，回调函数为空
  if (typeof options === 'string') {
    options = {
      content: options,
      onOk: () => {},
      onCancel: () => {}
    }
  }
  // 创建实例
  instance = new DialogConstrutor({
    data: options
  })
  // 将实例挂载到body下
  document.body.appendChild(instance.$mount().$el)
}
Vue.prototype.$baseDialog = dialog
