import { Vue } from 'vue-property-decorator'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwCnVHvf2gjJgKr1BPDs3nmdr6DzBF/SNU/RAGqTP1wdRnMURJJH+zPvePMsDYxPwFXWJfE/ouR9K6WhYuy7QztY4mZ2a2emnZuLuRzrIED/zT6E4MryXTghM1B6zWod6gl1TRs1+4OGV9uHc6QK27CShCHFHEE2vyTKkxXPdTuFPPiA9saJb6xkGq9YzueJ1J237zd56Uyx2d01IXUQBYt59xs+xkQk53ZRwFSZ/AmIZtHGz2mGMic9KNqkGuqzXQe28hgN+8oGJDT653diWE8a/pTXbxa7JQ0MxOlZ+OgPNCR8tGwtAT8W4WR8DIW8T5mA5uzpvFLo+XSK0ltbgTwIDAQAB'

const privateKey = 'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAqhHyZfSsYourNxaY\n' +
  '7Nt+PrgrxkiA50efORdI5U5lsW79MmFnusUA355oaSXcLhu5xxB38SMSyP2KvuKN\n' +
  'PuH3owIDAQABAkAfoiLyL+Z4lf4Myxk6xUDgLaWGximj20CUf+5BKKnlrK+Ed8gA\n' +
  'kM0HqoTt2UZwA5E2MzS4EI2gjfQhz5X28uqxAiEA3wNFxfrCZlSZHb0gn2zDpWow\n' +
  'cSxQAgiCstxGUoOqlW8CIQDDOerGKH5OmCJ4Z21v+F25WaHYPxCFMvwxpcw99Ecv\n' +
  'DQIgIdhDTIqD2jfYjPTY8Jj3EDGPbH2HHuffvflECt3Ek60CIQCFRlCkHpi7hthh\n' +
  'YhovyloRYsM+IS9h/0BzlEAuO0ktMQIgSPT3aFAgJYwKpqRYKlLDVcflZFCKY7u3\n' +
  'UP8iWi1Qw0Y='

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

// rsa加密开始
Vue.prototype.$getRsaCode = function (str) { // 注册方法
  let pubKey = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwCnVHvf2gjJgKr1BPDs3nmdr6DzBF/SNU/RAGqTP1wdRnMURJJH+zPvePMsDYxPwFXWJfE/ouR9K6WhYuy7QztY4mZ2a2emnZuLuRzrIED/zT6E4MryXTghM1B6zWod6gl1TRs1+4OGV9uHc6QK27CShCHFHEE2vyTKkxXPdTuFPPiA9saJb6xkGq9YzueJ1J237zd56Uyx2d01IXUQBYt59xs+xkQk53ZRwFSZ/AmIZtHGz2mGMic9KNqkGuqzXQe28hgN+8oGJDT653diWE8a/pTXbxa7JQ0MxOlZ+OgPNCR8tGwtAT8W4WR8DIW8T5mA5uzpvFLo+XSK0ltbgTwIDAQAB
 -----END PUBLIC KEY-----` // ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt()
  encryptStr.setPublicKey(pubKey) // 设置 加密公钥
  let data = encryptStr.encrypt(str.toString()) // 进行加密
  return data
}
