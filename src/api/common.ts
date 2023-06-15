import request from '@/utils/request'

const baseURL = 'colorbirdmanage/'

// 三方数据-组织机构-树
export function agencyTree(params?) {
  return request({
    method: 'GET',
    url: `${baseURL}third/agency/tree`,
    params
  })
}


// 三方数据-单位列表
export function applicaiton(params?) {
  return request({
    method: 'GET',
    url: `${baseURL}third/application`,
    params
  })
}
