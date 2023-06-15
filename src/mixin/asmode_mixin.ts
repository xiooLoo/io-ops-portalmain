import { LayoutconfModule } from '@/store/modules/layoutconf'
import { AsModeEnum } from '@/store/types'

export default {
  data() {
    return {
      mixin_asMode: LayoutconfModule.asMode // 默认布局模式asMode
    }
  },
  computed: {
    mixin_getAsMode: {
      get() {
        return function(mode: AsModeEnum) {
          return `${mode}`
        }
      },
      set(newMode: AsModeEnum) {
        LayoutconfModule.setAsMode(newMode)
      }
    }
  }
}
