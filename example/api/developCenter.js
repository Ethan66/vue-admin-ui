import { postRequest } from '@/utils/network'
import config from './config'
const { baseUrl } = config
const base = '/bl/console/api'

// 菜单管理
// 新增菜单
export const apiAddMenu = (params) => {
  return postRequest(`${baseUrl}/addMenu`, params)
}

// 修改菜单
export const apiModifyMenu = (params) => {
  return postRequest(`${baseUrl}/modifyMenu`, params)
}

// 删除菜单
export const apiDeleteMenu = (params) => {
  return postRequest(`${baseUrl}/deleteMenu`, params)
}

// 查询父菜单下拉菜单
export const apiQueryParentConsoleMenu = (params) => {
  return postRequest(base + '/queryAllConsoleMenu', params)
}
