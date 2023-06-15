import FETCHKEY from '@/utils/fetchKey'
import { CONST_DATA, CONST_DATA_OP } from '@/utils/dic'
import { LayoutconfModule } from '@/store/modules/layoutconf'

export default {
  methods: {
    /**
     * 适用于表单组件MyForm，arr数组有值的情况
     * @param {*} item 有arr参数的对象
     * 如： {
                id: 'status',
                type: 'radio',
                label: '资源状态：',
                isAlwaysShow: true,
                rules: [
                    { required: true, message: '请选择资源状态', trigger: 'blur' },
                ],
                arr: [
                    { label: '正常', value: 1 },
                    { label: '废弃', value: 2 },
                ]
            },
     * @param {*} value 需要转换的值
     * @returns 中文label
     */
    global_mixin_cmpValues(item: any, value: any) {
      let nextValue: any = value;
      (typeof (value) === 'number' || value === false) ? nextValue = value.toString() : nextValue = value
      if (item.arr && item.arr.length) {
        return item.arr.find((i: { value: any }) => i.value == value) ? item.arr.find((i: { value: any }) => i.value == value).label : value
      } else {
        return nextValue
      }
    },
    /**
     * 使用示例：
         <template v-slot:column="scope">
            <div v-if="['properties', 'status'].includes(scope.row1)">
                <to-tag size="small">{{ global_mixin_cmpColumn('CONST_TRUE_FALSE', scope.row[scope.row1]) }}</to-tag>
            </div>
        </template>
     */
    global_mixin_cmpColumn(key: any, value: any) {
      let nextValue: any = value;
      (typeof (value) === 'number' || value === false) ? nextValue = value.toString() : nextValue = value
      return FETCHKEY.formatListValue(CONST_DATA[key], nextValue)
    },
    /**
     * 使用示例：
         <template v-slot:column="scope">
            <div v-if="['properties', 'status'].includes(scope.row1)">
                <to-tag size="small">{{ global_mixin_cmpColumnByPath('/views/resourceManage/attr', scope.row1, scope.row[scope.row1]) }}</to-tag>
            </div>
        </template>
     */
    global_mixin_cmpColumnByPath(resourcePath: string, key: string, value: any) {
      let nextValue: any = value;
      (typeof (value) === 'number' || value === false || value === true) ? nextValue = value.toString() : nextValue = value
      return FETCHKEY.formatListValue(CONST_DATA_OP[resourcePath][key], nextValue)
    },
    // 框架层：内容区动态计算高度
    global_mixin_layoutHeight() {
      const nav_modes = ['F-Mode', 'FI-Mode', 'T-Mode']
      const tab_modes = ['F-Mode', 'FI-Mode']
      const nav_h: number = (nav_modes.includes(LayoutconfModule.asMode) && LayoutconfModule.asConf.navbar.isShow) ? 60 : 0
      const tab_h: number = (tab_modes.includes(LayoutconfModule.asMode) && LayoutconfModule.asConf.tab.isShow) ? 44 : 0
      return `calc(100vh - ${nav_h}px - ${tab_h}px)`
    }
  }
}
