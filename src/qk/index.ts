

import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start
} from 'qiankun'
import qkinstance from '../main'
import 'nprogress/nprogress.css'
import globalStore from './global-store'
import store from '@/store'

export const qkConfig = {
  singular: true,
  sandbox: { strictStyleIsolation: false } // 开启shadow dom沙箱隔离
}

function loader(loading) {
  if (qkinstance && qkinstance.$children) {
    qkinstance.$children[0].isLoading = loading
  }
}

/**
 * 注册子应用
 */
export const microApps = [
  {
    name: 'portalsub',
    entry: '//localhost:10004', // entry: process.env.VUE_APP_SUB_MID_THEME,
    developer: 'portalsub',
    activeRule: '/portalsub/',
    msg: 'Entry *********************** 门户主题 ***********************'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    loader, // 给子应用配置加上loader方法
    container: '#appContainer', // 子应用挂载的div
    props: {
      loginInfo: store, // 下发用户信息
      developer: item.developer, // 下发开发者
      routerBase: item.activeRule, // 下发基础路由
      setGlobalState: globalStore.setGlobalState // 下发setGlobalState方法
    }
  }
})

registerMicroApps(apps, {
  // beforeLoad: app => {
  //   console.log('before load app.name====>>>>>', app.name)
  // },
  // beforeMount: [
  //   app => {
  //     console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
  //   }
  // ],
  // afterMount: [
  //   app => {
  //     console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
  //   }
  // ],
  // afterUnmount: [
  //   app => {
  //     console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
  //   }
  // ]
})

/**
 * Step3 设置默认进入的子应用
setDefaultMountApp('/portalsub')
 */

/**
 * Step4 启动应用
 */
start(qkConfig)

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted')
})

export default apps
