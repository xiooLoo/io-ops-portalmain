import request from '@/utils/request'
let baseUrl = 'http://10.15.1.220:30081/api'


/*
 工作台列表
*/
export function apiGetWorkbenchList(params) {
  return request({
    method: 'GET',
    url: '/colorbirdmanage/page/workbench',
    params
  })
}


/*
 新增
*/
export function workbenchAdd(data) {
  return request({
    method: 'POST',
    url: '/colorbirdmanage/page/workbench',
    data
  })
}

/*
 编辑
*/
export function workbenchEdit(data) {
  return request({
    method: 'PUT',
    url: '/colorbirdmanage/page/workbench',
    data
  })
}

/*
 删除
*/
export function workbenchDelete(id) {
  return request({
    method: 'DELETE',
    url: `/colorbirdmanage/page/workbench/${id}`
  })
}

/*
 起停用
*/
export function workbenchStatus(data) {
  return request({
    method: 'POST',
    url: `/colorbirdmanage/page/workbench/enabled/${data.id}/${data.status}`,
    data
  })
}

/*
 复制
*/
export function toCopy(id) {
  return request({
    method: 'POST',
    url: `/colorbirdmanage/page/workbench/copy/${id}`
    // params
  })
}

/*
 查询单位
*/


/*
 查询生效范围
*/


/*
 配置
*/
export function toConfig(data) {
  return request({
    method: 'POST',
    url: `/colorbirdmanage/page/workbench/config/${data.id}`,
    data
  })
}
