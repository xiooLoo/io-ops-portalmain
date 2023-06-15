/* eslint-disable no-unused-expressions */
import { UUserData } from '@/views/types/dataTypes'
import Cookies from 'js-cookie'

/*
* localStorage 封装
*/
export const localCache = {
  // 设置
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  // 获取
  getCache(key) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  },
  // 清空某一个
  deleteCache(key) {
    window.localStorage.removeItem(key)
  },
  // 清空全部
  clearCache() {
    window.localStorage.clear()
  }
}

/**
 * sessionStorage 分装
 */
export const sessionStorage = {
  // 存储
  set(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  // 取出数据
  get(key) {
    const value = window.sessionStorage.getItem(key)
    if (value && value != 'undefined' && value != 'null') {
      return JSON.parse(value)
    }
    return null
  },
  // 删除数据
  remove(key) {
    window.sessionStorage.removeItem(key)
  }
}

export const cookiesCache = {
  getCookie(key) {
    return Cookies.get(key)
  },
  setCookie(key, value, days) {
    Cookies.set(key, value, { expires: days, secure: false })
  },
  removeCookie(key) {
    Cookies.remove(key)
  }
}

// App
const sidebarStatusKey = 'Sidebar_status'
export const getSidebarStatus = () => localCache.getCache(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => localCache.setCache(sidebarStatusKey, sidebarStatus)

// Token
const tokenKey = 'Admin-Token'
export const getToken = () => localCache.getCache(tokenKey)
export const setToken = (token: string) => localCache.setCache(tokenKey, token)
export const removeToken = () => localCache.deleteCache(tokenKey)

// User
const UserKey = 'User-Data'
export const getUserData = () => localCache.getCache(UserKey)
export const setUserData = (data: UUserData) => localCache.setCache(UserKey, JSON.stringify(data))
export const removeUserData = () => localCache.deleteCache(UserKey)

// Tab
const tabKey = 'Current-tab'
export const getCurrentTab = () => localCache.getCache(tabKey)
export const setCurrentTab = (tab: object) => localCache.setCache(tabKey, JSON.stringify(tab))

export function getHeader() {
  const { enterpriseCode = null, roleId = 1, tenantId = 1 } = JSON.parse(getUserData()) || {}
  return {
    accessToken: getToken(),
    enterpriseCode: enterpriseCode || undefined,
    roleId,
    tenantId
  }
}
