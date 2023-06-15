import { ThemeFace } from '@/store/types'

/**
 * 预制主题切换方案
 */
export let preThemeList: ThemeFace[] = [
  {
    current: 'theme-default',
    name: '默认主题',
    color: '#2E78FF'
  }, {
    current: 'theme-green',
    name: '农业主题',
    color: '#20C94A'
  }, {
    current: 'theme-red',
    name: '政务主题',
    color: '#F5242C'
  }
]
