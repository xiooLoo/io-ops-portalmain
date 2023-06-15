import FETCHKEY from '@/utils/fetchKey'
import store from '@/store'
import { UserModule } from '@/store/modules/user'

export const formItems = [
  {
    id: 'name',
    type: 'input',
    inputType: 'input',
    label: '单位名称',
    placeholder: '请输入单位名称',
    rules: [
      { required: false, message: '请输入单位名称', trigger: 'blur' }
    ]
  },
  {
    id: 'property',
    type: 'select',
    inputType: '',
    label: '单位性质',
    filterable: true,
    placeholder: '请选择单位性质',
    rules: [
      { required: false, message: '请选择单位性质', trigger: 'select' }
    ],
    arr: UserModule.httpDic.DICT_AGENCY_PROPERTIES
  },
  {
    id: 'level',
    type: 'select',
    inputType: '',
    label: '单位级别',
    filterable: true,
    placeholder: '请选择单位级别',
    rules: [
      { required: false, message: '请选择单位级别', trigger: 'select' }
    ],
    arr: UserModule.httpDic.DICT_AGENCY_GRADE
  },
  {
    id: 'hasVehicle',
    type: 'select',
    inputType: '',
    label: '是否有车',
    filterable: true,
    placeholder: '请选择是否有车',
    rules: [
      { required: false, message: '请选择是否有车', trigger: 'change' }
    ],
    arr: [
      { value: 0, label: '否' },
      { value: 1, label: '是' }
    ]
  }
]
export const planFormItems = [
  {
    id: 'name',
    type: 'input',
    inputType: 'input',
    label: '单位名称',
    placeholder: '请输入单位名称',
    rules: [
      { required: false, message: '请输入单位名称', trigger: 'blur' }
    ]
  }
]
export const cards = [
  { label: '隐藏搜索', value: 0, icon: 'iconyincangsousuo' },
  { label: '刷新', value: 1, icon: 'iconshuaxin' }
]
export const planLeftBtns = [
  { label: '导出', value: 'export', type: 'ii', disabled: false, code: 'front_enterprise_formation:export' }
  // { label: '导出设置',value: 'set',icon: '-el-icon-circle-plus-outline',type: 'ii',code: 'front_servicer_all:export' ,code:'front_auto_dispatch:export' }
]
export const zeroTypes = [
  { label: '多选', type: 'selection', width: '50', align: 'center', fixed: 'left' }
]
export const deptformItems = [
  {
    id: 'deptName',
    type: 'input',
    inputType: 'input',
    label: '部门名称',
    placeholder: '请输入部门名称',
    rules: [
      { required: false, message: '请输入部门名称', trigger: 'blur' }
    ]
  },
  {
    id: 'deptLevel',
    type: 'select',
    inputType: '',
    label: '部门级别',
    filterable: true,
    placeholder: '请选择部门级别',
    rules: [
      { required: false, message: '请选择部门级别', trigger: 'select' }
    ],
    arr: UserModule.httpDic.DICT_DEPT_LEVEL
  }
]

/**
 * 单位管理操作列按钮
 */
export const enterpriseList = [{
  btntitle: '编辑',
  needSkip: true,
  code: 'front_enterprise_info:edit'
},
{
  btntitle: '详情',
  needSkip: true,
  code: 'front_enterprise_info:detail'
},
{
  btntitle: '删除',
  needSkip: false,
  code: 'front_enterprise_info:delete'
}
]

// 数据字典
// 单位性质
export const propertyLists = FETCHKEY.formatLabelValue('DICT_AGENCY_PROPERTIES')

// 单位级别
export const levelLists = FETCHKEY.formatLabelValue('DICT_AGENCY_GRADE')

// 财政经费来源
export const capitalSourceLists = FETCHKEY.formatLabelValue('DICT_AGENCY_FUNDS_SOURCE')

// 单位行政级别
export const administrativeRankLists = FETCHKEY.formatLabelValue('DICT_AGENCY_ADMINISTRATIVE_RANK')

// 行业列表
export const tradeLists = FETCHKEY.formatLabelValue('DICT_AGENCY_TRADE')

// 预算级次
export const budgetLevelLists = FETCHKEY.formatLabelValue('DICT_AGENCY_BUDGET_LEVEL')

// 部门级别
export const deptLevelLists = FETCHKEY.formatLabelValue('DICT_DEPT_LEVEL')

/**
 * 部门管理操作列按钮
 */
export const deptList = [{
  btntitle: '编辑',
  needSkip: true,
  code: 'front_dept_manage:edit'
},
{
  btntitle: '详情',
  needSkip: true,
  code: 'front_dept_manage:detail'
},
{
  btntitle: '删除',
  needSkip: false,
  code: 'front_dept_manage:delete'
}
]

export const importConfig = [
  { key: 'name', required: true, title: '单位名称' },
  { key: 'shortName', required: false, title: '单位简称' },
  { key: 'parentEnterpriseName', required: false, title: '上级单位' },
  { key: 'address', required: false, title: '单位地址' },
  { key: 'contacts', required: false, title: '联系人' },
  { key: 'contactsTel', required: false, title: '联系人电话' },
  { key: 'property', required: true, title: '单位性质' },
  { key: 'level', required: true, title: '单位级别' },
  { key: 'areaName', required: true, title: '所属区域' },
  { key: 'telephone', required: false, title: '座机' },
  { key: 'email', required: false, title: '邮箱' },
  { key: 'fax', required: false, title: '传真' },
  { key: 'postCode', required: false, title: '邮政编码' },
  { key: 'trade', required: false, title: '行业' },
  { key: 'budgetLevel', required: false, title: '预算级次' },
  { key: 'capitalSource', required: false, title: '财政经费来源' },
  { key: 'administrativeRank', required: false, title: '行政级别' },
  { key: 'orgCode', required: false, title: '组织机构代码' },
  { key: 'vehiclePlanNum', required: true, title: '车辆编制数' },
  { key: 'personPlanNum', required: true, title: '人员编制数' },
  { key: 'weight', required: true, title: '排序值' }
]

export const installColumn = [
  { title: '车牌号码', key: 'vehicleNum', fixed: 'left', sortable: false },
  {
    title: '车辆性质',
    key: 'vehicleProperty',
    formatter(value) {
      if (value.vehicleProperty) {
        return FETCHKEY.findName('DICT_VEHICLE_PROPERTIES', value.vehicleProperty)
      } else {
        return ''
      }
    }
  },
  {
    title: '车辆类型',
    key: 'vehicleModel',
    formatter(value) {
      if (value.vehicleModel) {
        return FETCHKEY.findName('DICT_VEHICLE_TYPE', value.vehicleModel)
      } else {
        return ''
      }
    }
  },
  {
    title: '车辆品牌',
    key: 'vehicleBrand',
    formatter(value) {
      if (value.vehicleBrand) {
        return `${FETCHKEY.findNameByCustomDic(store.getters.brands, value.vehicleBrand)} / ${FETCHKEY.findOthNameByKey(store.getters.brands, value.vehicleBrand, 'carLineName')}`
      } else {
        return ''
      }
    }
  },
  {
    title: '动力类型',
    key: 'vehiclePowerType',
    formatter(value) {
      if (value.vehiclePowerType) {
        return FETCHKEY.findName('DICT_VEHICLE_POWER_TYPE', value.vehiclePowerType)
      } else {
        return '无'
      }
    }
  },
  {
    title: '车龄',
    key: 'vehicleAgeInfo',
    formatter(value) {
      if (value.vehicleAgeInfo) {
        return (new Date().getFullYear() - parseInt(value.vehicleAgeInfo)) || 0
      } else {
        return 0
      }
    }
  },
  {
    title: '标识化',
    key: 'isIdentify',
    isscope: true,
    formatter(value) {
      if (value.isIdentify) {
        return FETCHKEY.findName('DICT_VEHICLE_IS_IDENTIFY', value.isIdentify)
      } else {
        return ''
      }
    }
  }
]
export const deptImportConfig = [
  {
    title: '部门名称',
    key: 'deptName',
    required: true
  },
  {
    title: '部门级别',
    key: 'deptLevel',
    required: true
  },
  {
    title: '归属单位',
    key: 'enterpriseName',
    required: true
  }
]

export const tableColumn = [
  {
    title: '单位名称',
    key: 'name'
  },
  {
    title: '单位性质',
    key: 'property',
    formatter(value) {
      let data
      propertyLists.forEach(ele => {
        if (ele.value == value.property) {
          data = ele.label
        }
      })
      return data
    },
    width: '160'
  },
  {
    title: '单位级别',
    key: 'level',
    formatter(value) {
      let data
      levelLists.forEach(ele => {
        if (ele.value == value.level) {
          data = ele.label
        }
      })
      return data
    },
    width: '160'
  },
  {
    title: '车辆编制数',
    key: 'vehiclePlanNum',
    width: '160'
  },
  {
    title: '车辆实有数',
    key: 'vehicleHasNum',
    width: '160'
  },
  {
    title: '人员编制数',
    key: 'personPlanNum',
    width: '160'
  },
  {
    title: '上级单位',
    key: 'parentEnterpriseName',
    width: '160',
    formatter(value) {
      if (value.parentEnterpriseName) {
        return value.parentEnterpriseName
      } else {
        return '无'
      }
    }
  }
]
