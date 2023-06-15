import request from '@/utils/request'

export function getOption1(data) {
  return {
    code: 0,
    data: [
      { label: '高俅', value: '1', id: '1' },
      { label: '宋江', value: '2', id: '2' }
    ],
    msg: '',
    success: true
  }
}

export function getOption2(data) {
  return {
    code: 0,
    data: [
      { label: '曹操', value: '1', id: '1' },
      { label: '刘备', value: '2', id: '2' },
      { label: '孙权', value: '3', id: '3' }
    ],
    msg: '',
    success: true
  }
}
