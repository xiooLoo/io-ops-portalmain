import { initGlobalState, MicroAppStateActions } from 'qiankun'
import Vue from 'vue'

// 父应用的初始state
const initialState = Vue.observable({
  theme: '#2E78FF',
  ignore: 'master',
  user: {
    name: '测试用户名',
    author: 'Yangjp',
    developer: 'vue2.x'
  }
})

const actions: MicroAppStateActions = initGlobalState(initialState)

actions.onGlobalStateChange((newState, prev) => {
  console.log('【门户主应用】全局状态触发变更：', JSON.stringify(newState))
  for (const key in newState) {
    initialState[key] = newState[key]
  }
})

actions.setGlobalState(initialState)

export default actions
