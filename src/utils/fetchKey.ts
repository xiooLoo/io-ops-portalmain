/* eslint-disable no-empty */
import { Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { fetchMoreDic, permissionCode } from '@/views/commons/setting/api/setting'

interface ArrayEnum {
  remove?: Function;
  pushNoRepeat?: Function;
}

export class ArrayExt extends Array<ArrayEnum> {
  /**
   * 删除数组元素
   * @param {obj} 要删除的对象
   */
  remove(obj: Record<string, any>) {
    let index = this.indexOf(obj)
    if (index > -1) {
      this.splice(index, 1)
    }
  }

  /**
   *  数组增加不重复元素
   */
  pushNoRepeat() {
    for (let i = 0; i < arguments.length; i++) {
      let ele = arguments[i]
      if (this.indexOf(ele) == -1) {
        this.push(ele)
      }
    }
  }
}

export default {
  /**
     * 字典数组value→→→转→→→name
     * @param {*} list 字典数组
     * @param {*} value 字典value
     * @returns name
     */
  formatListValue(list: any, value: any) {
    if (list && list.length && value) {
      return list.find((item: { value: '' }) => item.value == value) ? list.find((item: { value: '' }) => item.value == value).label : value
    } else {
      return '-'
    }
  },
  /**
     * 格式化表单中 label 、 value，构造arr对象数组
     * dataList 接口数据源列表
     * labelKey： 接口数据Key
     * valueKkey： 接口数据value
     * formItems：表单对象数组[]
     * formItemId: 表单需要自定义设置arr[]数组数据的id
     * formItemKey：数组遍历判断需要修改哪个arr的源
     * @formItems   最终结果数据
     */
  formatArrObject(dataConfig, formItemConfig) { 
      if (!dataConfig.dataList || !dataConfig.dataList.length) {
          formItemConfig.formItems.map(item => {
              if (item[formItemConfig.formItemId] === formItemConfig.formItemKey) {
                item.arr = []
              }
              return item
          })
      } else { 
          dataConfig.dataList.map(item => {
              item.label = item[dataConfig.labelKey]
              item.value = item[dataConfig.valueKkey]
              return item
          })
          formItemConfig.formItems.map(item => {
              if (item[formItemConfig.formItemId] === formItemConfig.formItemKey) {
                item.arr = dataConfig.dataList
              }
              return item
          })
      }
      return formItemConfig.formItems
  },
  /**
   * 对象数组去重
   * @list  需要去重的数组
   * @key   以什么为唯一ID去重？？？
   *
   * return   返回去重后的数组
   */
  arrayToHeavy(list: any, key: string) {
    let obj: any = {}
    return list.reduce(function (a: any, b: any) {
      if (key) {
        obj[b[key]] ? '' : obj[b[key]] = true && a.push(b)
      } else {
        obj[b] ? '' : obj[b] = true && a.push(b)
      }
      return a
    }, [])
  },

  /**
   * 对象数组求差集（即：找到data2在data1中缺少的数据）
   * @data1 全量数据源
   * @data2 部分数据源
   * @data1key  以???为唯一ID进行求差集操作
   * @data2key  以???为唯一ID进行求差集操作
   *
   * return 返回data2在data1中缺少的元素
   */
  arrayToDiff(data1 = [], data2 = [], data1key: string, data2key: string) {
    let ids = data2.map(item => item[data2key])
    let othList = data1.filter(function(v) {
      return ids.indexOf(v[data1key]) !== -1
    })
    let lessList = data1.filter(function(v) {
      return ids.indexOf(v[data1key]) === -1
    })
    return {
      othList,
      lessList
    }
  },

  /**
   *
   * @param {随机数最小值} min
   * @param {随机数最大值} max
   * @param {生成随机数个数} countNum
   * @returns
   */
  getRandomNum(min: any, max: any, countNum: number) {
    let arr: any = []
    // 在此处补全代码
    function produceNum() {
      let num = Math.floor((Math.random() * (max - min)) + min)
      if (arr.indexOf(num) == -1) { // 判断不存在就push
        arr.push(num)
      } else {
        produceNum() // 存在了重新调用
      }
      if (arr.length < countNum) { // 判断数组长度是否小于所需长度
        produceNum()
      }
    }
    produceNum()
    return arr
  },

  // 通过字典value，获取label
  findName(dickey, value) {
    const dics = UserModule.httpDic || {}
    if (!dickey) return
    const arr = dics[dickey] || []
    return (arr.find(item => item.value == value) && arr.find(item => item.value == value).labelZhCh) || ''
  },

  /**
     * 字典转换---函数
     */
  findNameByCustomDic(list, value) {
    const arr = list
    return (arr.find(item => item.value == value) && (arr.find(item => item.value == value).labelZhCh || arr.find(item => item.value == value).label || ''))
  },

  // 获取字典对象数组
  formatLabelValue(dickey) {
    const dics = UserModule.httpDic || {}
    const arr: any[] = []
    if (dics[dickey]) {
      dics[dickey].map(item => {
        arr.push({
          ...item,
          label: item.labelZhCh || '',
          text: item.labelZhCh || ''
        })
      })
    }
    return arr || []
  },

  formatCustomDicLabelValue(list) {
    if (!list || !list.length) return []
    const arr: any[] = []
    list.map(item => {
      arr.push({
        ...item,
        label: item.labelZhCh || '',
        text: item.labelZhCh || ''
      })
    })
    return arr || []
  }
}

const FETCHKEY = {
  /**
   * 系统级字典格式化，符合Select选择框必要参数
   * @options     字典源数组
   */
  formatCustomOptions(options) {
    if (options && options.length) {
      return options.map(item => {
        item.label = item.labelZhCh || ''
        item.text = item.labelZhCh || ''
        return item
      })
    } else {
      return []
    }
  }
}

/**
 * 系统级字典获取
 *
 * @dictKeys    字典Keys       目的：需要查询哪些字典Key
 *              类型：Array
 *              示例：[ 'DICT_CONFIG_ISSUE_STATUS', 'DICT_AGENCY_PROPERTIES', 'DICT_AGENCY_GRADE' ]
 *              默认值：[]
 *
 * @appKey      所属系统        目的：区分不同系统字典，可能使用不同接口获取字典
 *              类型：String
 *              示例：'vehicle'
 *              默认值：'vehicle'
 *
 * 使用方式如下：
 * 异步获取字典结果：
 * const dict = await this.$httpDic(['DICT_CONFIG_ISSUE_STATUS'])
 *
 * 获取Promise：
 * const dict = this.$httpDic(['DICT_CONFIG_ISSUE_STATUS']).then(dict => dict)
 */
function getDict(dictKeys: any[] = [], appKey = 'vehicle') {
  dictKeys = dictKeys.concat(['DICT_VEHICLE_TYPE'], ['DICT_VEHICLE_PROPERTIES'], ['DICT_VEHICLE_POWER_TYPE'], ['DICT_AGENCY_PROPERTIES_ENTERPRISE'], ['DICT_AGENCY_PROPERTIES_GOVERNMENT'], ['DICT_AGENCY_PROPERTIES_INSTITUTION'])
  let keyString = (dictKeys.length && dictKeys.join(',')) || ''
  return new Promise((resolve, reject) => {
    if (appKey === 'vehicle') {
      const httpDic = localStorage.getItem('httpDic') ? JSON.parse(localStorage.getItem('httpDic') as string) : {}
      fetchMoreDic(keyString).then((res: any) => {
        if (res && res.code === '0') {
          dictKeys.forEach((key, idx, arr) => {
            if (key === 'DICT_AGENCY_PROPERTIES') {
              const temp = [
                ...res.data.DICT_AGENCY_PROPERTIES_ENTERPRISE,
                ...res.data.DICT_AGENCY_PROPERTIES_GOVERNMENT,
                ...res.data.DICT_AGENCY_PROPERTIES_INSTITUTION
              ]
              httpDic.DICT_AGENCY_PROPERTIES = FETCHKEY.formatCustomOptions(temp)
            } else {
              if (key === 'DICT_VEHICLE_TYPE' || key === 'DICT_VEHICLE_PROPERTIES' || key === 'DICT_VEHICLE_POWER_TYPE') { }
              httpDic[key] = FETCHKEY.formatCustomOptions(res.data[key])
            }
          })
          UserModule.SET_HTTP_DIC(httpDic)
          // store.commit('user/SET_HTTP_DIC', httpDic)
          localStorage.setItem('httpDic', JSON.stringify(httpDic))
          resolve(httpDic)
        } else {
          UserModule.SET_HTTP_DIC({})
          // store.commit('user/SET_HTTP_DIC', {})
          localStorage.setItem('httpDic', '{}')
          resolve({})
        }
      }).catch(err => {
        reject(err)
      })

      permissionCode().then((res: any) => {
        if (res.code == '0') {
          UserModule.SET_OTHER_BTN_LIST_CODES(res.data)
          // localStorage.setItem('vehiclePermissions', JSON.stringify(res.data))
          // location.reload()
        }
      })
    } else {
      // fetchMoreDic(keyString).then(res => {
      //   if (res && res.code === '0') {
      //     store.commit('user/SET_BASE_DIC', res.data)
      //     localStorage.setItem('baseDic', JSON.stringify(res.data))
      //     resolve(res.data)
      //   } else {
      //     store.commit('user/SET_BASE_DIC', {})
      //     localStorage.setItem('baseDic', {})
      //     resolve({})
      //   }
      // }).catch(err => {
      //   reject(err)
      // })
    }
  })
}

/**
 * 系统级字典获取-对外暴露方法
 */
// export async function _getDict(dictKeys, appKey) {
//   const baseDic = await getDict(dictKeys, appKey)
//   return baseDic
// }
Vue.prototype.$httpDic = async function _getDict(dictKeys, appKey) {
  const baseDic = await getDict(dictKeys, appKey)
  return baseDic
}

Vue.prototype.$has = function(name) {
  const otherBtnListCodes = UserModule.otherBtnListCodes
  const dynamicBtnListCodes = UserModule.dynamicBtnListCodes
  const allCodes = otherBtnListCodes.concat(dynamicBtnListCodes)
  // console.log('应用按钮权限控制数据源codes：', permissionsCodes)
  if (allCodes.includes(name)) {
    return true
  }
  return false
}

/**
 * 自定义指令
 * 为el-button 添加防抖
 * 这里设置的是1000毫秒也就是1秒
 */
Vue.directive('debounce', {
  inserted(el: HTMLButtonElement) {
    el.addEventListener('click', () => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, 1000)
    })
  }
})

/**
 * 自定义过滤器
 * 如：4个字符、2个字符两边对齐问题，在显示的时候只能“左对齐||右对齐”，针对这种对齐问题做处理
 */
Vue.filter('NAME_SPACE_FORMAT', function (value) {
  if (value.length < 3 || (value.length === 3 && (value.charAt(value.length - 1) === ':' || value.charAt(value.length - 1) === '：'))) { // 如果是两个汉字
    value = `${value.slice(0, 1)}${value.slice(1)}`
  }
  return value
})

