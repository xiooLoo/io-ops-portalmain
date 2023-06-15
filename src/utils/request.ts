/* eslint-disable no-unused-expressions */
import axios, { AxiosResponse } from 'axios'
import { UserModule } from '@/store/modules/user'
import router from '@/router/index'
import { Vue } from 'vue-property-decorator'

const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: 'http://localhost:8028/colorbirdmanage',
  baseURL: 'http://10.15.1.220:30081/api',
  timeout: 100000,
  withCredentials: true
})

axios.defaults.withCredentials = true

let instanceLoading: any

/**
 * 请求拦截
 */
request.interceptors.request.use(function (config) {
  instanceLoading = Vue.prototype.$loading({
    lock: true,
    background: 'rgba(255, 255, 255, 0.7)'
  })
  const accessToken = UserModule.token
  if (accessToken && accessToken.length > 0) {
    config.headers.accessToken = accessToken
  }
  const { enterpriseCode, roleId = 14, tenantId = 1 } = (UserModule.userData.additionalInformation && UserModule.userData.additionalInformation?.workOrgList[0]) || {}
  config.headers.enterpriseCode = enterpriseCode || ''
  config.headers.roleId = roleId
  config.headers.tenantId = tenantId
  return config
}, function (error) {
  return Promise.reject(error)
})


interface ResponseConfig {
  code: number;
  value: string;
  msg: string;
}
/**
 * 响应拦截
 */
request.interceptors.response.use(function (response: AxiosResponse<ResponseConfig>) {
  instanceLoading.close()
  if (response.data.value && response.data.value.length) {
    Vue.prototype.$message({ message: '登录成功', type: 'success' })
    return response.data
  } else if (response.data.code == 0) {
    return response.data
  } else if (response.data.code == 10401 || response.data.code == 401) {
    Vue.prototype.$message({ message: '登录时间已超时,请重新登录!', type: 'error' })
    UserModule.logout().then(() => {
      console.log('10401退出')
      router.push('/login')
    })
  } else {
    Vue.prototype.$message({ type: 'error', message: response.data.msg, duration: 5000 })
    return response.data
    // return Promise.reject(response)
  }
}, function (error) {
  instanceLoading.close()
  Vue.prototype.$message({ type: 'error', message: error.response.data.msg, duration: 5000 })
  if (error.response.data.code == 10003) {
    UserModule.logout().then(() => {
      console.log('10003异常退出')
      router.push('/login')
    })
  }
  return Promise.reject(error)
})

export default request

