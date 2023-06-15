export const formItems = [
  {
    id: 'bizSign',
    type: 'select',
    inputType: '',
    label: '模块名称',
    clearable: true,
    placeholder: '请选择模块名称',
    arr: []
  },
  {
    id: 'operateType',
    type: 'select',
    inputType: '',
    label: '操作类型',
    clearable: true,
    placeholder: '请选择操作类型',
    arr: [
      { label: '新增', value: 'ADD' },
      { label: '编辑', value: 'UPDATE' },
      { label: '查询', value: 'QUERY' },
      { label: '删除', value: 'DELETE' }
    ]
  },
  {
    id: 'timeDate',
    type: 'betwDate',
    inputType: 'data',
    label: '操作时间',
    isAlwaysShow: true,
    sufix: '',
    betws: [
      {
        id: 'startTime',
        type: 'date',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        span: 10,
        placeholder: '请选择开始时间'
      },
      {
        id: 'endTime',
        type: 'date',
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        span: 10,
        placeholder: '请选择结束时间'
      }
    ]
  },
  {
    id: 'operatorName',
    type: 'input',
    inputType: '',
    label: '操作人姓名',
    clearable: true,
    placeholder: '请输入操作人姓名'
  }
]
export const operateTypeArr = [
  { label: '新增', value: 'ADD' },
  { label: '编辑', value: 'UPDATE' },
  { label: '查询', value: 'QUERY' },
  { label: '删除', value: 'DELETE' }
]
export const tableColumn = [
  {
    title: '模块名称',
    key: 'bizSign',
    minWidth: '180'
  }, {
    title: '操作类型',
    key: 'operateType',
    minWidth: '120',
    isScope: true,
    formatter(value) {
      if (value.operateType) {
        return operateTypeArr.filter(item => {
          return item.value == value.operateType
        })[0].label
      } else {
        return ''
      }
    }
  }, {
    title: '操作时间',
    key: 'crtTime',
    minWidth: '180'
  }, {
    title: '操作人',
    key: 'operatorName',
    minWidth: '180'
  }, {
    title: 'ip地址',
    key: 'ipAddr',
    minWidth: '180'
  }
]
