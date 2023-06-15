/**
 * 公共tabletable数据
 */
import FETCHKEY from '@/utils/fetchKey'
import { UserModule } from '@/store/modules/user'

export const tableDataObj = [{
  dates: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  dates: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  dates: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  dates: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}]

/**
 * 公共table头部参数
 */
export const tableColumnObj = [
  {
    title: '角色名称',
    key: 'roleName',
    tooltip: true
  },
  {
    title: '所属单位',
    key: 'enterpriseName',
    formatter(value) {
      return value.enterpriseName ? value.enterpriseName : '-'
    }
  },
  {
    title: '角色标签',
    key: 'label',
    width: '110',
    align: 'center',
    formatter(value) {
      return value.label == 1 ? '默认角色' : value.label == 2 ? '本单位角色' : value.label == 3 ? '上级单位角色' : '-'
    }
  },
  {
    title: '角色描述',
    key: 'roleRemark',
    tooltip: true,
    formatter(value) {
      return value.roleRemark ? value.roleRemark : '-'
    }
  },
  {
    title: '数据权限',
    key: 'dataRangeStr',
    formatter(value) {
      return value.dataRangeStr ? value.dataRangeStr : '-'
    },
    tooltip: true

  },
  {
    title: '创建时间',
    key: 'crtTime'
  },
  {
    title: '更新时间',
    key: 'updTime',
    formatter(value) {
      return value.updTime ? value.updTime : '-'
    }
  }
]

/**
 * 账户table头部参数
 */
export const accountManagementColumnObj = [{
  title: '账号',
  key: 'userName',
  width: '200',
  fixed: 'left',
  tooltip: true,
  isscope: true
},
{
  title: '用户姓名',
  key: 'name',
  width: '160'
},
{
  title: '手机号码',
  key: 'mobile',
  width: '140',
  formatter(value) {
    return value.mobile ? value.mobile : '-'
  }
},
{
  title: '所在单位',
  key: 'enterpriseName',
  width: '200',
  tooltip: true,
  formatter(value) {
    let unitStr = ''
    if (value.workOrgList && value.workOrgList.length) {
      value.workOrgList.forEach((i, idx, arr) => {
        if (idx != arr.length - 1) {
          unitStr += `${i.enterpriseName}，`
        } else {
          unitStr += i.enterpriseName
        }
      })
    }
    return unitStr || '-'
  }
},
{
  title: '部门',
  key: 'deptName',
  tooltip: true,
  formatter(value) {
    let unitStr = ''
    if (value.workOrgList && value.workOrgList.length) {
      value.workOrgList.forEach((i, idx, arr) => {
        if (i.deptName && idx != arr.length - 1) {
          unitStr += `${i.deptName}，`
        } else {
          unitStr += (i.deptName || '')
        }
      })
    }
    return unitStr || '-'
  }
  // width: '200'
},
{
  title: '角色名称',
  key: 'roleName',
  width: '200',
  tooltip: true,
  formatter(value) {
    let unitStr = ''
    if (value.roleGroupNameList && value.roleGroupNameList.length) {
      value.roleGroupNameList.forEach((i, idx, arr) => {
        if (idx != arr.length - 1) {
          unitStr += `${i}，`
        } else {
          unitStr += i
        }
      })
    }
    return unitStr || '-'
  }
},
{
  title: '状态',
  key: 'status',
  formatter(value) {
    const data = FETCHKEY.findName('DICT_USER_STATUS', value.status)
    return data
  }
  // width: '200'
},
{
  title: '是否司机',
  key: 'isDriver',
  formatter(value) {
    let data = FETCHKEY.findName('DICT_USER_IS_DRIVER', value.isDriver)
    return data
  }
}
]

/**
 * 单位table头部参数
 */
export const corporateColumnObj = [{
  title: '单位名称',
  key: 'name'
  //   sortable: 'custom',
  //   fixed:'left'
},
{
  title: '单位性质',
  key: 'property',
  formatter(value) {
    if (value.property === 1) {
      return '否'
    } else {
      return '是'
    }
  }
},
{
  title: '单位级别',
  key: 'level',
  statusFormatter(row) {
    const status = row.status
    if (status === 0) {
      return '否'
    } else {
      return '是'
    }
  }
},
{
  title: '车辆编制数',
  key: 'vehiclePlanNum'
},
{
  title: '车辆实有数',
  key: 'vehicleRealNum'
},
{
  title: '人员编制数',
  key: 'personPlanNum'
},
{
  title: '上级单位',
  key: 'parentName'
}
]

/**
 * 部门table头部参数
 */
export const DeptColumnObj = [{
  title: '部门名称',
  key: 'deptName'
  //   sortable: 'custom',
  //   fixed:'left'
},
{
  title: '部门级别',
  key: 'deptLevel'
},
{
  title: '归属车辆数',
  key: 'vehicleNum'
},
{
  title: '归属人数',
  key: 'personNum'
},
{
  title: '归属单位',
  key: 'enterpriseName'
}
]
/**
 * 账户下拉搜索
 */
export const optionsObj = [{
  value: '选项1',
  label: '黄金糕'
}, {
  value: '选项2',
  label: '双皮奶'
}, {
  value: '选项3',
  label: '蚵仔煎'
}, {
  value: '选项4',
  label: '龙须面'
}, {
  value: '选项5',
  label: '北京烤鸭'
}]
/**
 * 账户下拉搜索
 */
export const isDriverLists = UserModule.httpDic.DICT_USER_IS_DRIVER

/**
 * 账户table更多操作列按钮
 */
export const resetBtnListObJ = [{
  name: '导入'
},
{
  name: '导出'
},
{
  name: '模板下载'
}
]

/**
 * 账户table操作列按钮
 */
export const btnOneList = [{
  btntitle: '编辑',
  needSkip: true
},
{
  btntitle: '详情',
  needSkip: true
},
{
  btntitle: '删除',
  needSkip: false
}
]

/**
 * 账户全部单位
 */
export const accontAllList = [{
  btntitle: '编辑',
  needSkip: true,
  code: 'front_portal_user_acount_manage'
},
{
  btntitle: '详情',
  needSkip: true,
  code: 'front_portal_user_acount_manage'
},
{
  btntitle: '删除',
  needSkip: false,
  code: 'front_portal_user_acount_manage'
}
]

/**
 * 账户本单位
 */
export const accontBasicList = [{
  btntitle: '编辑',
  needSkip: true,
  code: 'front_portal_user_acount_manage'
},
{
  btntitle: '详情',
  needSkip: true,
  code: 'front_portal_user_acount_manage'
},
{
  btntitle: '删除',
  needSkip: false,
  code: 'front_portal_user_acount_manage'
}
]
/**
 * 角色table操作列按钮
 */
export const btnTwoList = [{
  btntitle: '编辑',
  needSkip: true
},
{
  btntitle: '删除',
  needSkip: false
},
{
  btntitle: '详情',
  needSkip: true
}
]

/**
 * 角色全部单位列表
 */
export const roleAllList = [{
  btntitle: '编辑',
  needSkip: true,
  code: 'front_portal_user_acount_manage',
  tag: 'operate'
},
{
  btntitle: '数据权限',
  needSkip: true,
  code: 'front_portal_user_acount_manage',
  tag: 'operate'
},
{
  btntitle: '删除',
  needSkip: false,
  code: 'front_portal_user_acount_manage',
  tag: 'operate'
},
{
  btntitle: '详情',
  needSkip: true,
  code: 'front_portal_user_acount_manage'
}
]

/**
 * 角色本单位列表
 */
export const roleBasicList = [{
  btntitle: '编辑',
  needSkip: true,
  code: 'front_portal_user_acount_manage',
  tag: 'operate'
},
{
  btntitle: '数据权限',
  needSkip: true,
  code: 'front_portal_user_acount_manage',
  tag: 'operate'
},
{
  btntitle: '删除',
  needSkip: false,
  code: 'front_portal_user_acount_manage',
  tag: 'operate'
},
{
  btntitle: '详情',
  needSkip: true,
  code: 'front_portal_user_acount_manage'
}
]
/**
 * 账户职级数组
 */
export const rankListObj = [{
  name: '科员',
  rankType: '0'
},
{
  name: '科长',
  rankType: '1'
},
{
  name: '处长',
  rankType: '2'
},
{
  name: '监督员',
  rankType: '3'
},
{
  name: '局长',
  rankType: '4'
},
{
  name: '副局长',
  rankType: '5'
},
{
  name: '厅长',
  rankType: '6'
},
{
  name: '副厅长',
  rankType: '7'
},
{
  name: '院长',
  rankType: '8'
}
]
/**
 * 账户左侧
 */
export const resetBtnListObj = [{
  name: '仪表盘',
  selected: ''
},
{
  name: '申请用车',
  selected: ''
},
{
  name: '订单中心',
  selected: ''
},
{
  name: '车辆中心',
  selected: ''
},
{
  name: '单位管理',
  selected: ''
},
{
  name: '司机管理',
  selected: ''
},
{
  name: '车辆监控',
  selected: ''
},
{
  name: '系统设置',
  selected: ''
}
]

/**
 * 账户右侧
 */
export const treeDataObj = [{
  label: '一级 1',
  id: 1,
  children: [{
    label: '二级 1-1',
    id: 11,
    children: [{
      label: '三级 1-1-1',
      id: 111
    }]
  }]
}, {
  label: '一级 2',
  id: 2,
  children: [{
    label: '二级 2-1',
    id: 21,
    children: [{
      label: '三级 2-1-1',
      id: 211
    }]
  }, {
    label: '二级 2-2',
    id: 22,
    children: [{
      label: '三级 2-2-1',
      id: 221
    }]
  }]
}, {
  label: '一级 3',
  id: 3,
  children: [{
    label: '二级 3-1',
    id: 31,
    children: [{
      label: '三级 3-1-1',
      id: 311
    }]
  }, {
    label: '二级 3-2',
    id: 32,
    children: [{
      label: '三级 3-2-1',
      id: 321
    },
    {
      label: '三级 3-2-2',
      id: 322
    }
    ]
  }]
}]

// 头部

// 驾照类型
export const licenseLists = UserModule.httpDic.DICT_DRIVER_LICENSE_TYPE

// 部门级别
export const deptLevelLists = UserModule.httpDic.DICT_DEPT_LEVEL

// 单位性质
export const propertyLists = UserModule.httpDic.DICT_AGENCY_PROPERTIES

// 单位级别
export const levelLists = UserModule.httpDic.DICT_AGENCY_GRADE

// 财政经费来源
export const capitalSourceLists = UserModule.httpDic.DICT_AGENCY_FUNDS_SOURCE

// 财政经费来源
export const administrativeRankLists = UserModule.httpDic.DICT_AGENCY_ADMINISTRATIVE_RANK

// 行业列表
export const tradeLists = UserModule.httpDic.DICT_AGENCY_TRADE

// 预算级次
export const budgetLevelLists = UserModule.httpDic.DICT_AGENCY_BUDGET_LEVEL

// 账号搜索
export const accountItems = [
  {
    id: 'userName',
    type: 'input',
    inputType: 'input',
    label: '账号',
    placeholder: '请输入账号',
    rules: [{
      required: false,
      message: '请输入账号',
      trigger: 'blur'
    }]
  },
  {
    id: 'name',
    type: 'input',
    inputType: 'input',
    label: '用户姓名',
    placeholder: '请输入用户姓名',
    rules: [{
      required: false,
      message: '请输入用户姓名',
      trigger: 'blur'
    }]
  },
  {
    id: 'mobile',
    type: 'input',
    inputType: 'input',
    label: '手机号码',
    placeholder: '请输入手机号码',
    rules: [{
      required: false,
      message: '请输入手机号码',
      trigger: 'blur'
    }]
  },
  {
    id: 'isDriver',
    type: 'select',
    inputType: '',
    label: '是否司机',
    filterable: true,
    placeholder: '请选择是否司机',
    rules: [{
      required: false,
      message: '请选择是否司机',
      trigger: 'change'
    }],
    arr: UserModule.httpDic.DICT_USER_IS_DRIVER
  },
  {
    id: 'enterpriseName',
    type: 'select',
    inputType: '',
    label: '单位',
    filterable: true,
    // hiddenFilterMethod: true,
    placeholder: '请选择单位',
    rules: [{
      required: false,
      message: '请选择单位',
      trigger: 'change'
    }],
    arr: []
  },
  {
    id: 'deptName',
    type: 'input',
    inputType: 'input',
    label: '部门',
    placeholder: '请输入部门',
    rules: [{
      required: false,
      message: '请输入部门',
      trigger: 'blur'
    }]
  },
  {
    id: 'status',
    type: 'select',
    inputType: '',
    label: '状态',
    filterable: true,
    multiple: false,
    placeholder: '请选择',
    rules: [{
      required: false,
      message: '请选择',
      trigger: 'change'
    }],
    arr: UserModule.httpDic.DICT_SERVICERS_STATUS
  }
]

export const companyCards = [{
  label: '隐藏搜索',
  value: 0,
  icon: 'iconyincangsousuo'
},
{
  label: '刷新',
  value: 1,
  icon: 'iconshuaxin'
},
{
  label: '表单设置',
  value: 2,
  icon: 'icona-set02iconset021'
}
]

/**
 * 服务公司头部参数
 */
export const serviceColumnObj = [{
  title: '公司名称',
  key: 'servicerName'
},
{
  title: '服务类型',
  key: 'servicerType',
  formatter(value) {
    const data = FETCHKEY.findName('DICT_SERVICERS_TYPE', value.servicerType)
    return data
  }
},
{
  title: '联系人',
  key: 'contacts'
},
{
  title: '联系电话',
  key: 'contactsTel'
},
{
  title: '状态',
  key: 'servicerStatus',
  formatter(value) {
    const data = FETCHKEY.findName('DICT_SERVICERS_STATUS', value.servicerStatus)
    return data
  }
},
{
  title: '适用范围',
  key: 'coverageNameStr',
  popover: true
}
]
/**
 * 服务公司全部单位头部参数
 */
export const serviceAllColumnObj = [{
  title: '公司名称',
  key: 'servicerName',
  width: '200',
  fixed: 'left'
},
{
  title: '创建单位',
  key: 'belongEnterpriseName',
  width: '200'
},
{
  title: '服务类型',
  key: 'servicerType',
  formatter(value) {
    const data = FETCHKEY.findName('DICT_SERVICERS_TYPE', value.servicerType)
    return data
  },
  width: '200'
},
{
  title: '联系人',
  key: 'contacts',
  width: '200'
},
{
  title: '联系电话',
  key: 'contactsTel',
  width: '200'
},
{
  title: '状态',
  key: 'servicerStatus',
  formatter(value) {
    const data = FETCHKEY.findName('DICT_SERVICERS_STATUS', value.servicerStatus)
    return data
  },
  width: '200'
},
{
  title: '适用范围',
  key: 'coverageNameStr',
  popover: true,
  width: '200'
}
]
export const allUnitsBtns = [
  { label: '新增', value: 1, icon: 'iconfont -icondaoru', type: 'i', code: 'front_portal_user_acount_manage' },
  { label: '删除', value: 2, icon: 'iconfont -iconshanchu', type: 'i', code: 'front_portal_user_acount_manage', disabled: true },
  // { label: '激活', value: 3, icon: 'iconfont -iconxiazai', type: 'ii' ,code:'front_employee_manage_all:activate',disabled: true },
  { label: '密码还原', value: 4, icon: 'iconfont -iconxiazai', type: 'ii', code: 'front_portal_user_acount_manage', disabled: true }
  // { label: '导入', value: 5, icon: 'iconfont -icondaoru', type: 'ii',code:'front_employee_manage_all:import', isUpload: true, urlSuffix: 'accountManagement', limit: 1 },
  // { label: '导出', value: 6, icon: 'iconfont -icondaochu' , type: 'ii',code:'front_employee_manage_all:export' },
  // { label: '导入设置', value: 7, icon: '-el-icon-circle-plus-outline', type: 'ii',code:'front_employee_manage_all:import' },
  // { label: '导出设置', value: 8, icon: '-el-icon-circle-plus-outline', type: 'ii',code:'front_employee_manage_all:export' },
  // { label: '模板下载', value: 9, icon: '-el-icon-circle-plus-outline', type: 'ii',code:'front_employee_manage_all:template_download' },
]
export const mineUnitsBtns = [
  { label: '新增', value: 1, icon: 'iconfont -icondaoru', type: 'i', code: 'front_portal_user_acount_manage' },
  { label: '删除', value: 2, icon: 'iconfont -iconshanchu', type: 'i', code: 'front_portal_user_acount_manage', disabled: true },
  // { label: '激活', value: 3, icon: 'iconfont -iconxiazai', type: 'ii' ,code:'front_employee_manage_enterprise:activate',disabled: true },
  { label: '密码还原', value: 4, icon: 'iconfont -iconxiazai', type: 'ii', code: 'front_portal_user_acount_manage', disabled: true }
  // { label: '导入', value: 5, icon: 'iconfont -icondaoru', type: 'ii',code:'front_employee_manage_enterprise:import', isUpload: true, urlSuffix: 'accountManagement', limit: 1 },
  // { label: '导出', value: 6, icon: 'iconfont -icondaochu' , type: 'ii',code:'front_employee_manage_enterprise:export' },
  // { label: '导入设置', value: 7, icon: '-el-icon-circle-plus-outline', type: 'ii',code:'front_employee_manage_enterprise:import' },
  // { label: '导出设置', value: 8, icon: '-el-icon-circle-plus-outline', type: 'ii',code:'front_employee_manage_enterprise:export' },
  // { label: '模板下载', value: 9, icon: '-el-icon-circle-plus-outline', type: 'ii',code:'front_employee_manage_enterprise:template_download' },
]
// 导入配置
export const importConfig = [
  { key: 'userName', required: true, title: '账号' },
  { key: 'password', required: true, title: '密码' },
  { key: 'name', required: true, title: '用户姓名' },
  { key: 'mobile', required: false, title: '手机号码' },
  { key: 'status', required: false, title: '状态' },
  { key: 'enterpriseName', required: true, title: '所在单位' },
  { key: 'deptName', required: false, title: '部门' },
  { key: 'roleName', required: true, title: '角色名称' },
  { key: 'isDriverCell', required: false, title: '是否司机' },
  { key: 'licenseType', required: false, title: '驾照类型' },
  { key: 'licenseNum', required: false, title: '驾照编号' },
  { key: 'workNum', required: false, title: '工号' },
  { key: 'licenseApplyTime', required: false, title: '初次领证日期' },
  { key: 'licenseEndTime', required: false, title: '驾驶证到期日期' }
]
// 导出配置
export const exportConfig = [
  { key: 'userName', required: true, title: '账号' },
  { key: 'name', required: true, title: '用户姓名' },
  { key: 'mobile', required: false, title: '手机号码' },
  { key: 'status', required: false, title: '状态' },
  { key: 'enterpriseName', required: true, title: '所在单位' },
  { key: 'deptName', required: false, title: '部门' },
  { key: 'roleName', required: true, title: '角色名称' },
  { key: 'licenseType', required: false, title: '驾照类型' },
  { key: 'licenseNum', required: false, title: '驾照编号' },
  { key: 'workNum', required: false, title: '工号' },
  { key: 'licenseApplyTime', required: false, title: '初次领证日期' },
  { key: 'licenseEndTime', required: false, title: '驾驶证到期日期' }
]
