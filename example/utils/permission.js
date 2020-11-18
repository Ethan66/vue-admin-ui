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

  // 获取授权按钮
  getBtns (list, config) {
    const { level, levelValue, unique, name } = config
    this.btnList = list.filter(item => item[level] === levelValue)
      .map(item => ({ code: item[unique], name: item[name] }))
      Vue.prototype.$InitObj && (Vue.prototype.$InitObj.btnList = this.btnList)
      this.setBtnList()
    }
    
    // 获取授权菜单
    getMenus (list, config) {
      const { id, parentId, level, sortNo } = config
      const menuList = list.filter(item => item[level] !== this.levelValue)
      this.menuList = adminMethods.menuRelation(menuList, id, parentId, level, sortNo)
      this.menuRoutes = handleGetMenuRoutes(this.menuList)
    }
    
    // 将btnList保存在Permission的静态属性中
    setBtnList () {
      const list = this.btnList
      Permission.btnList = list
      sessionStorage.setItem('btnList', JSON.stringify(list || []))
  }

  // 获取用户授权按钮
  getBtnName (btnCode) {
    const btns = Permission.btnList
    if (!btns) return false
    let obj = btns.find(item => item.code === btnCode)
    return obj && obj.name
  }

  // 获取表格或对话框授权按钮
   getConfigBtns (list) {
    let btns = Permission.btnList
    if (!btns) return []
    let result = []
    list.forEach(item => {
      let tmp
      if (tmp = btns.find(btn => btn.code === item.code)) {
        result.push({ code: item.code, clickFn: item.clickFn, name: tmp.name })
      }
    })
    return result
  }
}

// 将menuList转为Routes
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

