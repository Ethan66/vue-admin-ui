import { apiGetUserAuthMenu } from '@/api/login'
import systemObj from '@/config/system'
import Permission, { authBtns } from '@/utils/permission'
import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: true
    },
    userInfo: JSON.parse(Cookies.get('userInfo') || '{}'),
    menuList: [], // 刷新更新，不取本地
    mainTabs: [] // 刷新可本地获取或不取
  },
  mutations: {
    // 展开/收缩菜单栏
    TOGGLE_SIDEBAR: (state, boolean = true) => {
      state.sidebar.opened = boolean
    },
    // 保存菜单列表
    SAVE_MENULIST: (state, val = []) => {
      state.menuList = val
      sessionStorage.setItem('menuList', JSON.stringify(val))
    },
    UPDATE_BTNLIST: (state, val = []) => {
      state.btnList = val
      sessionStorage.setItem('btnList', JSON.stringify(val))
    },
    // 保存用户信息
    SAVE_USERINFO: (state, val) => {
      state.userInfo = val
      Cookies.set('userInfo', JSON.stringify(val), { expires: 24 * 60 * 60 * 1000 })
    },
    // 新增标签
    ADD_TAB: (state, route) => {
      if (state.mainTabs.some(tab => tab.url === route.name)) return
      state.mainTabs.push({ ...{ name: route.meta.title, url: route.path } })
    }
  },
  actions: {
    // 获取权限
    getPermission ({ commit }) {
      let { department: departmentId } = JSON.parse(localStorage.getItem('userInfo')) || {}
      return apiGetUserAuthMenu({ departmentId }).then(res => {
        if (res.code === '000000') {
          const permission = new Permission({
            btn: systemObj.btnConfig,
            menu: systemObj.menuConfig
          })
          permission.createPermission(res.data.list)
          authBtns.setBtnList(permission.btnList)
          commit('SAVE_MENULIST', permission.menuList)
          sessionStorage.setItem('dynamicRoutes', JSON.stringify(permission.menuRoutes)) // 保存动态路由
          return permission
        }
        if (res.code !== '000000') {
          return false
        }
      })
    },
    // 删除标签
    delTab ({ state }, curTab) {
      return new Promise(resolve => {
        const index = state.mainTabs.findIndex(tab => tab.name === curTab)
        state.mainTabs.splice(index, 1)
        resolve(state.mainTabs)
      })
    }
  }
}

export default app
