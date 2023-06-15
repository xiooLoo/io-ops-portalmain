import request from '@/utils/request'

export function apiGetIconfontConfig() {
  return request({
    method: 'GET',
    url: '/mock/getIconfont'
  })
}

export function apiGetThemeConfig(params) {
  return request({
    method: 'GET',
    url: '/colorbirdmanage/user/portal',
    params
  })
}
