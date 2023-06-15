import request from '@/utils/request'

export function apiGetWorkbenchList(params) {
  return request({
    method: 'GET',
    url: '/mock/getWorkbenchList'
    // params
  })
}
