import { getRequest, postRequest } from '@/config/network'
import config from './config'
const { baseUrl } = config

// 获取IP
export const apiGetIp = (params) => {
  return getRequest('//myip.ipip.net', params)
}

// 注册
export const apiRegister = (params) => {
  return postRequest(`${baseUrl}/register`, params)
}

// 登录
export const apiLogin = (params) => {
  return postRequest(`${baseUrl}/login`, params)
}

// 获取菜单按钮权限
export const apiGetUserAuthMenu = (reqParams) => {
  return postRequest(`${baseUrl}/getUserAuthMenu2`, reqParams)
}

// 获取菜单按钮
export const apiGetAllMenu = (reqParams) => {
  return postRequest(`${baseUrl}/getAllMenu`, reqParams)
}

// 登出
export const apiUserLoginOut = (reqParams) => {
  return postRequest(`${baseUrl}/loginOut`, reqParams)
}

// 修改密码
export const apiModifyPassword = (reqParams) => {
  return postRequest(`${baseUrl}/modifyPassword`, reqParams)
}
