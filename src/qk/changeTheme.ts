import globalStore from '@/qk/global-store'
// import Color from 'color'
// import setCustomTheme from '@zougt/theme-css-extract-webpack-plugin/dist/setCustomTheme.js'

export function changeTheme(val: string) {
  console.log('【门户主应用】change theme:', val)
  globalStore.setGlobalState({
    theme: val
  })
  // setCustomTheme({
  //   Color,
  //   primaryColor: val
  // })
}
