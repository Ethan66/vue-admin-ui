import { apiGetUserAuthMenu } from '@/api/login'
import systemObj from '@/config/system'
import Permission, { authBtns } from '@/config/permission'

const app = {
  state: {
    sidebar: {
      opened: true
    },
    menuList: [], // 刷新更新，不取本地
    mainTabs: [], // 刷新可本地获取或不取
    mainActivedTab: {}, // 刷新从本地获取
    subTabObj: {}, // 副标签， 刷新可本地获取或不取
    isAddDynamicRoutes: false
  },
  mutations: {
    TOGGLE_SIDEBAR: (state, boolean = true) => {
      state.sidebar.opened = boolean
    },
    UPDATE_MENULIST: (state, val = []) => {
      state.menuList = val
      sessionStorage.setItem('menuList', JSON.stringify(val))
    },
    UPDATE_BTNLIST: (state, val = []) => {
      state.btnList = val
      sessionStorage.setItem('btnList', JSON.stringify(val))
    },
    UPDATE_MAINTABS: (state, val = []) => {
      state.mainTabs = val
    },
    UPDATE_MINACTIVEDTAB: (state, val = {}) => {
      state.mainActivedTab = Object.assign({}, val)
      sessionStorage.setItem('mainActivedTab', JSON.stringify(val))
    },
    SAVE_SUBTABS_OBJ: (state, data = {}) => {
      state.subTabObj = data
    },
    TOGGLE_ISADDDYNAMICROUTES: (state, boolean = false) => {
      state.isAddDynamicRoutes = boolean
    }
  },
  actions: {
    getPermission ({ commit, state }) {
      let { department: departmentId } = JSON.parse(localStorage.getItem('userInfo')) || {}
      return apiGetUserAuthMenu({ departmentId }).then(res => {
        if (res.code === '000000') {
          const permission = new Permission({
            btn: systemObj.btnConfig,
            menu: systemObj.menuConfig
          })
          permission.createPermission(res.data.list)
          authBtns.setBtnList(permission.btnList)
          commit('SAVE_SUBTABS_OBJ', permission.subTabs) // 保存二级标签
          commit('UPDATE_MENULIST', permission.menuList)
          commit('TOGGLE_ISADDDYNAMICROUTES', true)
          sessionStorage.setItem('dynamicRoutes', JSON.stringify(permission.menuRoutes)) // 保存动态路由
          return permission
        }
        if (res.code !== '000000') {
          return false
        }
      })
    }
  }
}

export default app
