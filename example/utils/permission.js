import { adminMethods } from 'vue-admin-ui-lib'
import Layout from '@/common/layout/Layout'
import Vue from 'vue'

let menuConfig = {}


export default class Permission {
  constructor (options) {
    this.btn = options.btn
    this.levelValue = this.btn.levelValue
    menuConfig = this.menu = options.menu
  }

  createPermission (list) {
    this.getBtns(list, this.btn)
    this.getMenus(list, this.menu)
  }

  getBtns (list, config) {
    const { level, levelValue, unique, name } = config
    this.btnList = list.filter(item => item[level] === levelValue)
      .map(item => ({ btnCode: item[unique], btnName: item[name] }))
  }

  getMenus (list, config) {
    const { id, parentId, level, sortNo } = config
    const menuList = list.filter(item => item[level] !== this.levelValue)
    this.menuList = adminMethods.menuRelation(menuList, id, parentId, level, sortNo)
    this.menuRoutes = handleGetMenuRoutes(this.menuList)
  }
}

class BtnList {
  constructor () {
    this.setBtnList()
  }

  // 重新设置btnList
  setBtnList (btnList) {
    this.btnList = btnList // 刷新更新，不取本地
    Vue.$InitObj && (Vue.$InitObj.btnList = btnList)
    sessionStorage.setItem('btnList', JSON.stringify(btnList || []))
  }

  // 获取用户授权按钮
  getBtnName (btnCode) {
    let btnList = this.btnList
    if (!btnList) return false
    let obj = btnList.find(item => item.btnCode === btnCode)
    return obj && obj.btnName
  }

  // 获取表格或对话框授权按钮
  getConfigBtns (list) {
    let btnList = this.btnList
    if (!btnList) return []
    return list.map(item => {
      const result = { code: item.code, clickFn: item.clickFn }
      const tmp = btnList.find(btn => btn.btnCode === item.code)
      tmp && Object.assign(result, { name: tmp.btnName })
      return result
    })
  }
}

export const authBtns = new BtnList()

// 添加动态(菜单)路由
// menuList：后台请求的数据，routes：创建的动态路由，用于递归持续添加路由
function handleGetMenuRoutes (menuList = [], firstLevel = true) {
  let menuRoutes = []
  menuList.forEach(item => {
    let router = {}
    if (firstLevel) {
      router = handleCreateRoute(item)
      if (item.list && item.list.length) {
        router.children = handleGetMenuRoutes(item.list, false)
      }
    } else {
      router = handleCreateRoute(item, 'child')
      try {
        router.component = () => import(`@/pages${item[menuConfig.url]}.vue`)
      } catch (e) {
        router.component = null
      }
      if (item.list && item.list.length) {
        router.children = handleGetMenuRoutes(item.list, false)
      }
    }
    menuRoutes.push(router)
  })
  return menuRoutes
}

function handleCreateRoute (obj, type = 'parent') {
  let route = {
    path: obj[menuConfig.url],
    component: null,
    name: obj[menuConfig.url],
    meta: {
      menuId: obj[menuConfig.id],
      menuCode: obj[menuConfig.unique],
      title: obj[menuConfig.name],
      isDynamic: true,
      isTab: true,
      iframeUrl: obj.iframeUrl || '',
      level: obj[menuConfig.level]
    }
  }
  if (type === 'parent') {
    route.component = Layout
    route.children = []
  }
  return route
}

