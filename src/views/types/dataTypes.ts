/**
 * 用户接口数据
 */
export interface UUserData {
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
