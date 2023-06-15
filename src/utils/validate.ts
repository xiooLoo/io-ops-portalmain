export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

export const isExternal = (path: string) => (/^(https?:|mailto:|tel:)/).test(path)

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isValidURL = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export const isPhoneNumber = (str: string) => {
  return (/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(str)
}

/**
 * 验证身份证
 * @param sId
 */
export const isCardID = (sId: string) => {
  if (!(/(^\d{15}$)|(^\d{17}(\d|X|x)$)/).test(sId)) {
    alert('你输入的身份证长度或格式错误')
    return false
  }
  // 身份证城市
  let aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  if (!Object.keys(aCity).includes(sId.substr(0, 2))) {
    alert('你的身份证地区非法')
    return false
  }

  // 出生日期验证
  let sBirthday = (`${sId.substr(6, 4)}-${Number(sId.substr(10, 2))}-${Number(sId.substr(12, 2))}`).replace(/-/g, '/')
  let d = new Date(sBirthday)
  if (sBirthday !== (`${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`)) {
    alert('身份证上的出生日期非法')
    return false
  }

  // 身份证号码校验
  let sum = 0
  let weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  let codes = '10X98765432'
  for (let i = 0; i < sId.length - 1; i++) {
    sum = sum + Number(sId[i]) * weights[i]
  }
  let last = codes[sum % 11] // 计算出来的最后一位身份证号码
  if (sId[sId.length - 1] !== last) {
    alert('你输入的身份证号非法')
    return false
  }

  return true
}

/**
 * 通过地址来下载文件
 * @param downUrl
 * @param fileName
 */
export function downLoadByURL(downUrl: string, fileName = '文件名称') {
  let a = document.createElement('a')// 创建a标签
  if ('download' in a) {
    a.download = fileName// 设置下载文件的文件名
  }
  (document.body || document.documentElement).appendChild(a)
  a.href = downUrl// downUrl为后台返回的下载地址
  a.target = '_parent'
  a.click()// 设置点击事件
  a.remove() // 移除a标签
}

/**
 * 验证【手机号码的长度是否符合规范】
 * 验证【是否为身份证】
 * 验证【输入数字的长度是否符合规范】
 * 验证【字符的长度是否符合规范】
 * 验证【不为空的选项】
 */
type cbFunc = (msg?: string | Error) => void;
export const FormValidator = {
  /**
   * 验证手机号码的长度是否符合规范
   * @returns {{validator: validator, trigger: string}}
   */
  isPhone: (isRequired = true, opt?: string) => {
    return {
      validator: (rule: any, value: string, callback: cbFunc) => {
        if (!value || value.length === 0) {
          return callback('该选项不能为空')
        } else {
          value = value.trim()
          if (value.length > 11) {
            return callback(new Error('长度超过11位'))
          } else if (isPhoneNumber(value)) {
            return callback()
          } else if (value.length !== 0) {
            return callback(new Error('输入中……'))
          }
        }
      },
      trigger: opt || 'change',
      required: isRequired || true
    }
  },
  /**
   * 是否为身份证
   * @returns {{validator: validator, trigger: string, required: boolean}}
   */
  isIDCard: (isRequired = true, opt?: string) => {
    return {
      validator: (rule: any, value: string, callback: cbFunc) => {
        if (!value || value.length === 0) {
          return callback('该选项不能为空')
        } else {
          value = value.trim()
          if (value.length > 18) {
            return callback(new Error('长度超过18位'))
          } else if (isCardID(value)) {
            return callback()
          } else if (value.length !== 0) {
            return callback(new Error('输入中……'))
          }
        }
      },
      trigger: opt || 'blur',
      required: isRequired || true
    }
  },
  /**
   * 验证输入数字的长度是否符合规范
   * @param begin {Number} 开始的长度
   * @param end {Number} 最大长度
   * @returns {{validator: validator, trigger: string}}
   */
  checkNumberLength: (begin: number, end: number, isRequired = true, opt?: string) => {
    return {
      validator: (rule: any, value: number, callback: cbFunc) => {
        let valueStr = value.toString()
        if (!valueStr || valueStr.length === 0) {
          return false
        } else {
          valueStr = valueStr.trim()
          if ((/^\d+$/).test(valueStr)) {
            let len = valueStr.length
            if (len < begin) {
              return callback(new Error('等待输入中...'))
            } else if (end !== null && len > end) {
              return callback(new Error('输入超出长度'))
            }
            return callback()
          }
        }
      },
      required: isRequired || true,
      trigger: opt || 'change'
    }
  },
  /**
   * 验证字符的长度是否符合规范
   * @param begin{Number} 字符开始的长度
   * @param end {Number} 字符的最大长度
   * @returns {{validator: validator}}
   */
  checkStringLength: (begin: number, end: number, msg?: string, isRequired = true, opt?: string) => {
    return {
      validator: (rule: any, value: string, callback: cbFunc) => {
        if (!value || value.length === 0) {
          return callback(new Error(`${msg}不能为空`))
        } else {
          value = value.trim()
          if ((/^.+$/).test(value)) {
            let len = value.length
            if (len < begin) {
              return callback(new Error('等待输入中……'))
            } else if (end !== null && len > end) {
              return callback(new Error('输入超出长度'))
            }
            return callback()
          }
        }
      },
      required: isRequired || true,
      trigger: opt || 'change'
    }
  },
  /**
   * 验证不为空的选项
   * @returns {{validator: validator}}
   */
  checkNotNull: (isRequired = true, opt?: string) => {
    return {
      validator: (rule: any, value: any, callback: cbFunc) => {
        if (Number(value) && value !== 0) {
          return callback()
        }

        if (!value || value.length == 0) {
          return callback('该选项不能为空')
        }
        return callback()
      },
      required: isRequired || true,
      trigger: opt || 'change'
    }
  }

}
