import request from '@/utils/request'

export function apiGetLayoutConfig() {
  return request({
    method: 'GET',
    url: '/mock/getLayoutConfig'
  })
}
