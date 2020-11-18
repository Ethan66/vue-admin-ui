import { postRequest } from '@/utils/network'
import config from './config'
const { baseUrl } = config
const base = '/bl/console/api'
const baseuser = '/bl/console/user'

// 用户管理
// 新增用户/注册
export const apiRegister = (params) => {
  return postRequest(`${baseUrl}/register`, params)
}

// 获取用户
export const apiGetUser = (params) => {
  return postRequest(`${baseUrl}/getUser`, params)
}

// 新增用户
export const apiAddUser = (params) => {
  return postRequest(`${baseUrl}/addUser`, params)
}

// 修改用户信息
export const apiModifyUserInfo = (params) => {
  return postRequest(`${baseUrl}/modifyUserInfo`, params)
}

// 删除用户
export const apiDeleteUser = (params) => {
  return postRequest(`${baseUrl}/deleteUser`, params)
}

// 角色管理
// 新增角色
export const apiAddRole = (params) => {
  return postRequest(`${baseUrl}/addRole`, params)
}

// 查询角色
export const apiGetRole = (params) => {
  return postRequest(`${baseUrl}/getRole`, params)
}

// 查询角色权限
export const apiGetRoleAuthority = (params) => {
  return postRequest(`${baseUrl}/getRoleAuthority`, params)
}

// 编辑角色
export const apiModifyRole = (params) => {
  return postRequest(`${baseUrl}/modifyRole`, params)
}

// 编辑角色权限
export const apiModifyRoleAuthority = (params) => {
  return postRequest(`${baseUrl}/modifyRoleAuthority`, params)
}

// 删除角色
export const apiDeleteRole = (params) => {
  return postRequest(`${baseUrl}/deleteRole`, params)
}

// 重置系统用户密码
export const apiResetConsoleUserPassword = (params) => {
  return postRequest(baseuser + '/resetConsoleUserPassword', params)
}
