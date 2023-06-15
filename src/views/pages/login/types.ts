import { AxiosResponse } from 'axios'

/**
 * 登录数据的接口
 */
export interface loginForm {
  username: string;
  password: string;
  grant_type: string;
}

/**
 * 登录返回的结果
 */
export interface ILoginRes extends AxiosResponse {
  // 地址
  additionalInformation: Record<string, any>;
  // 过期时间
  expiration: string;
  // 是否已过期
  expired: boolean;
  // 已过去的毫秒数
  expiresIn: number;
  // 更新token
  refreshToken: Record<string, any>;
  // 类型
  scope: Array<string>;
  // token类型
  tokenType: string;
  // token
  value: string;
}

