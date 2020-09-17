import Layout from '@/common/layout/Layout'
import systemObj from '@/config/system'

const menu = systemObj.menuConfig

// 判断当前路由类型, global: 全局路由, main: 主入口路由
// route为当前路由，temp为全局路由
export function handleNowRouteType (route, temp = []) {
  let temp2 = []
  for (var i = 0; i < temp.length; i++) {
    if (route.path === temp[i].path) {
      return 'global'
    } else if (temp[i].children && temp[i].children.length) {
      temp2 = temp2.concat(temp[i].children)
    }
  }
  return temp2.length ? handleNowRouteType(route, temp2) : 'main'
}

// 添加动态(菜单)路由
// menuList：后台请求的数据，routes：创建的动态路由，用于递归持续添加路由
/*
  此方法默认只有3级菜单
  1级目录，2级菜单，3级按钮
*/
export function handleGetMenuRoutes (menuList = []) {
  let menuRoutes = []
  for (var i = 0; i < menuList.length; i++) {
    let route = handleCreateRoute(menuList[i])
    if (menuList[i].list && menuList[i].list.length >= 1) { // menuList存在children
      menuList[i].list.forEach(item => {
        let child = handleCreateRoute(item, 'child')
        try {
          child.component = () => import(`@/pages${item[menu.url]}.vue`)
        } catch (e) {
          child.component = null
        }
        route.children.push(child)
      })
    }
    menuRoutes.push(route)
  }
  return menuRoutes
}

export function handleCreateRoute (obj, type = 'parent') {
  let route = {
    path: obj[menu.url],
    component: null,
    name: obj[menu.url],
    meta: {
      menuId: obj[menu.id],
      menuCode: obj[menu.unique],
      title: obj[menu.name],
      isDynamic: true,
      isTab: true,
      iframeUrl: obj.iframeUrl || '',
      level: obj[menu.level]
    }
  }
  if (type === 'parent') {
    route.component = Layout
    route.children = []
  }
  return route
}
