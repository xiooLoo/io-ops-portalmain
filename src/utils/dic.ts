import FETCHKEY from '@/utils/fetchKey'

export const CONST_DATA = {
  // 是 | 否
  CONST_TRUE_FALSE: [
    { id: '1', value: '1', label: '是' },
    { id: '0', value: '0', label: '否' }
  ],
  CONST_Z_O: [
    { id: '1', value: '1', label: '是' },
    { id: '0', value: '0', label: '否' }
  ],
  CONST_SEX: [
    { id: '1', value: '1', label: '男' },
    { id: '0', value: '0', label: '女' }
  ]
}

export const CONST_DATA_OP = {
  '/dataPre/folders/dicx': {
    status: [
      { id: '0', label: '正常', value: '0' },
      { id: '1', label: '停售', value: '1' }
    ],
    databaseType: [
      { id: '1', label: 'MySQL', value: '1' },
      { id: '2', label: 'Oracle', value: '2' },
      { id: '3', label: 'SQL Server', value: '3' }
    ],
    datasourceType: [
      { id: '1', label: '数据库', value: '1' },
      { id: '2', label: '文件库', value: '2' }
    ],
    fileType: [
      { id: '1', label: 'csv', value: '1' },
      { id: '2', label: 'excel', value: '2' }
    ],
    model: [
      { id: '1', label: '追加', value: '1' },
      { id: '2', label: '覆盖', value: '2' }
    ]
  }
}

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
export function global_mixin_cmpValues(item: any, value: any) {
  (typeof (value) === 'number' || value === false) ? value = value.toString() : value
  if (item.arr && item.arr.length) {
    return item.arr.find((i: { value: any }) => i.value == value) ? item.arr.find((i: { value: any }) => i.value == value).label : value
  } else {
    return value
  }
}
/**
 * 使用示例：
    <template v-slot:column="scope">
        <div v-if="['properties', 'status'].includes(scope.row1)">
            <to-tag size="small">{{ global_mixin_cmpColumn('CONST_TRUE_FALSE', scope.row[scope.row1]) }}</to-tag>
        </div>
    </template>
  */
export function global_mixin_cmpColumn(key: any, value: any) {
  (typeof (value) === 'number' || value === false) ? value = value.toString() : value
  return FETCHKEY.formatListValue(CONST_DATA[key], value)
}
/**
 * 使用示例：
    <template v-slot:column="scope">
        <div v-if="['properties', 'status'].includes(scope.row1)">
            <to-tag size="small">{{ global_mixin_cmpColumnByPath('/views/resourceManage/attr', scope.row1, scope.row[scope.row1]) }}</to-tag>
        </div>
    </template>
  */
export function global_mixin_cmpColumnByPath(resourcePath: string, key: string, value: any) {
  (typeof (value) === 'number' || value === false || value === true) ? value = value.toString() : value
  return FETCHKEY.formatListValue(CONST_DATA_OP[resourcePath][key], value)
}
