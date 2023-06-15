import request from '@/utils/request'

// 系统字典
export function fetchMoreDic(keyCode) {
  return request({
    url: `/dict/value/batch/list/${keyCode}`,
    method: 'get'
  })
}

// [单位][角色][权限]权限码
export function permissionCode() {
  return request({
    url: '/portal/permission/codes/001/pc',
    method: 'get'
  })
}

// 账户列表
export function getAccountLists(params) {
  return request({
    url: '/portal/employee/front/page',
    method: 'get',
    params: params
  })
}

// 单位不分页列表输入查询
export function getCorporateListsByName(params) {
  return request({
    url: '/portal/enterprise/short/list',
    method: 'get',
    params: params
  })
}

// 单位不分页列表输入查询（不需要数据权限）
export function getAllCorporateListsByName(params) {
  return request({
    url: 'masterdata/enterprise/short/all/list',
    method: 'get',
    params: params
  })
}

// 账户详情
export function accountDetails(params) {
  return request({
    url: `/portal/employee/${params.id}`,
    method: 'get',
    params: params
  })
}

// 账户编辑
export function accountEdit(data) {
  return request({
    url: `/portal/employee/front/${data.id}`,
    method: 'post',
    data: data
  })
}

// 账户删除
export function accountDelete(data) {
  return request({
    url: '/portal/employee/delete',
    method: 'post',
    data: data
  })
}

// 账户启用
export function accountEnable(data) {
  return request({
    url: '/portal/employee/enable',
    method: 'post',
    data: data
  })
}

// 账户停用
export function accountDisable(data) {
  return request({
    url: '/portal/employee/disable',
    method: 'post',
    data: data
  })
}

// 账户密码重置
export function accountReset(data) {
  return request({
    url: '/portal/employee/reset/password',
    method: 'post',
    data: data
  })
}

// 树：区划（根据当前用户获取允许访问的区域）
export function userAreaTree(params) {
  return request({
    url: '/portal/enterprise/dataRange/tree',
    method: 'get',
    params: params
  })
}

// 账户新增
export function accountAdd(data) {
  return request({
    url: '/portal/employee/front',
    method: 'post',
    data: data
  })
}

// 账号校验名称
export function verytyAccount(params) {
  return request({
    url: '/portal/employee/isUserNameExist',
    method: 'get',
    params: params
  })
}

// 账号校验手机号
export function verytyPhone(params) {
  return request({
    url: '/portal/employee/isMobileExist',
    method: 'get',
    params: params
  })
}

// 角色预览
export function getPreviewMenus(data) {
  return request({
    url: '/portal/role/preview',
    method: 'post',
    data: data
  })
}

// 角色树分页列表
export function getRoleLists(params) {
  return request({
    url: '/portal/role/group/front/list',
    method: 'get',
    params: params
  })
}

// 部门不分页列表
export function getDeptLists(params) {
  return request({
    url: '/portal/dept/list',
    method: 'get',
    params: params
  })
}

// 单位不分页列表输入查询（不需要数据权限）
export function getCorporateLists(params) {
  return request({
    url: '/portal/enterprise/list',
    method: 'get',
    params: params
  })
}

// 单位新增
export function CorporateAdd(data) {
  return request({
    url: '/portal/enterprise',
    method: 'post',
    data: data
  })
}

// 单位校验名称
export function verytyUnit(params) {
  return request({
    url: '/portal/enterprise/verify/name',
    method: 'get',
    params: params
  })
}

// 单位不分页列表
export function getParentUnitLists(params) {
  return request({
    url: '/portal/enterprise/parent/list',
    method: 'get',
    params: params
  })
}

export function queryArea(rootCode, params) {
  return request({
    url: `/portal/area/tree/${rootCode}`,
    method: 'get',
    params: params
  })
}

// 单位详情
export function CorporateDetails(params) {
  return request({
    url: `/portal/enterprise/${params.id}`,
    method: 'get',
    params: params
  })
}

// 单位编辑
export function CorporateEdit(data) {
  return request({
    url: '/portal/enterprise',
    method: 'put',
    data: data
  })
}

export function queryEnterprise(params) {
  return request({
    url: '/portal/enterprise/dataRange/tree',
    method: 'get',
    params: params
  })
}

export function queryDict(keyCode) {
  return request({
    url: `/dict/key/direct/children/${keyCode}`,
    method: 'get'
  })
}

// 单位分页列表
export function getCorporateListsPage(data) {
  return request({
    url: '/portal/enterprise/pages',
    method: 'post',
    data: data
  })
}

// 单位删除批量
export function CorporateBatchDelete(data) {
  return request({
    url: '/portal/enterprise/batch/delete',
    method: 'post',
    data: data
  })
}

// 单位删除单个
export function CorporateDelete(data) {
  return request({
    url: `/portal/enterprise/${data.id}`,
    method: 'delete',
    data: data
  })
}

// 单位删除前校验
export function confirmUnitDelete(data) {
  return request({
    url: '/portal/enterprise/batch/delete/validate',
    method: 'post',
    data: data
  })
}

// 获取单位级别
export function queryEnterpriseLevel(enterpriseCode) {
  return request({
    url: `/portal/enterpriseRelation/level/${enterpriseCode}`,
    method: 'get'
  })
}

// excel模板下载
export const downloadExcel = 'report/excel/template'
// excel导出
export const exportExcel = 'report/excel/export'

// 部门分页列表
export function getDeptListsPage(data) {
  return request({
    url: '/portal/dept/pages',
    method: 'post',
    data: data
  })
}

// 部门批量删除
export function DeptBatchDelete(data) {
  return request({
    url: '/portal/dept/batch/delete',
    method: 'post',
    data: data
  })
}

// 部门单个删除
export function DeptDelete(data) {
  return request({
    url: `/portal/dept/${data.id}`,
    method: 'delete',
    data: data
  })
}

// 部门新增
export function DeptAdd(data) {
  return request({
    url: '/portal/dept',
    method: 'post',
    data: data
  })
}

// 部门校验名称
export function verytyDept(params) {
  return request({
    url: '/portal/dept/verify/name',
    method: 'get',
    params: params
  })
}

// 获取列表分页数据
export function fetchList(data) {
  return request({
    url: '/official/vehicle/pages',
    method: 'post',
    data: data
  })
}

// 部门详情
export function DeptDetails(params) {
  return request({
    url: `/portal/dept/${params.id}`,
    method: 'get',
    params: params
  })
}

// 部门编辑
export function DeptEdit(data) {
  return request({
    url: '/portal/dept',
    method: 'put',
    data: data
  })
}

// 日志管理列表
export function getLogList(data) {
  return request({
    url: '/logger/business/log/page',
    method: 'post',
    data
  })
}
// 获取日志业务标识下拉框
export function getLogSigns() {
  return request({
    url: '/logger/business/log/biz/signs',
    method: 'get'
  })
}
