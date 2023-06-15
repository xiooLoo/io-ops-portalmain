export const isAccont = (rule, value, callback) => {
  // 账号名称
  let accontrules = /^[A-Za-z0-9]+$/
  if (!accontrules.test(value)) {
    callback(new Error('名称可为数字或字母，不能包含空格'))
  } else {
    callback()
  }
}

// 密码
export const isPassword = (rule, value, callback) => {
  let pwdRegex = /(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!@#$%^&*])(?=.*[^\u4e00-\u9fa5]).{6,16}/
  let r = /^[^\u4e00-\u9fa5]+$/
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!pwdRegex.test(value) == true || !r.test(value) == true) {
    callback(new Error('密码中必须包含大小写字母、数字、特殊字符，至少6个字符,不能包含空格'))
  } else {
    callback()
  }
}

// 姓名
export const isName = (rule, value, callback) => {
  let namerules = /^[\u4e00-\u9fa5]{0,}$/
  if (!namerules.test(value)) {
    callback(new Error('姓名输入有误，请输入正确的中文姓名'))
  } else {
    callback()
  }
}

// 手机号码
export const isPhone = (rule, value, callback) => {
  if (value) {
    let phonerules = /^1[0-9]{10}$/
    if (!phonerules.test(value)) {
      callback(new Error('手机号码格式有误'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 驾照编号
export const isLicenseNum = (rule, value, callback) => {
  if (value) {
    let licensenumrules = /^[0-9]{12}$/
    if (!licensenumrules.test(value)) {
      callback(new Error('驾照编号格式有误'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 校验邮政编码
export const isEmail = (rule, value, callback) => {
  let re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  if (value) {
    if (!re.test(value)) {
      callback(new Error('输入格式有误'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

/**
 *
 * @param {*} curCode  // 拿到的 areaCode 示例: 610000
 * @param {*} target  // 通过拿到的 areaCode 转换处理完得到的数据  示例: [ 610000, 610400, 610003]
 */
function unique(arr) {
  return Array.from(new Set(arr))
}
// 编辑页面三级联动 tree 区域回显
export const areaCodeValEcho = (curCode, target) => {
  if (curCode) {
    let province // 省
    let city // 市
    let target
    // 如果最后两位不是 '00' 等于节点有三级
    if (curCode.slice(-4) === '0000') {
      city = curCode.replace(curCode.slice(-2), '00')
      province = curCode.replace(curCode.slice(-4), '0000')
      target = [province, city]
      return unique(target)
    }
    if (curCode.slice(-2) !== '00') {
      city = curCode.replace(curCode.slice(-2), '$\'00').slice(0, 6)
      province = curCode.replace(curCode.slice(-4), '0000')
      target = [province, city, curCode]
      return unique(target)
    } else if (curCode.slice(-2) === '00') {
      city = curCode.replace(curCode.slice(-2), '00')
      province = curCode.replace(curCode.slice(-4), '0000')
      target = [province, city, curCode]
      return unique(target)
    } else {
      province = curCode.replace(curCode.slice(-4), '0000')
      city = curCode.replace(curCode.slice(-4), '0000')
      target = [province, city, curCode]
      return unique(target)
    }
  }
}

// 电话号码格式处理
export const handleMobile = val => {
  if (val) {
    let res = val.replace(/^(.{3})(.*)(.{4})$/, '$1-$2-$3')
    return res
  } else {
    return ''
  }
}
