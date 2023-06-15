import request from '@/utils/request'
import { RequestDataHelper } from '../helper'
import { IRMenuParam, IRUserData } from './types'
import { UserModule } from '@/store/modules/user'

/**
 * 登录接口
 * @param userData
 * @returns
 */
export function ApiLogin(userData: IRUserData) {
  return request({
    method: 'POST',
    url: '/auth/oauth/token',
    data: RequestDataHelper.formatDataToFormData(userData),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic d2ViX2JhY2s6d2ViX2JhY2s='
    }
  })
}

/**
 * 获取菜单
 * @returns
 */
export function APIGetMenu() {
  return request({
    method: 'GET',
    url: `/portal/pf/roleAuthority/getMenuTreeByToken/${UserModule.appcode}`
  })
}

/**
 * 登录后获取用户基础信息
 */
export function getCurrentUserInfo() {
  return request({
    method: 'GET',
    url: '/portal/employee/current'
  })
}
