import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
import { handleNowRouteType } from './methods'
import globalRoutes from './globalRoutes'
import configRoutes from './configRoutes'
import store from '../store'

const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  base: '/blow/',
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  isAddDynamicRoutes: false, // 记录是否已加载动态路由
  routes: [...globalRoutes, ...configRoutes]
})

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let toPath = ''
  if (!localStorage.getItem('userInfo')) {
    if (to.path !== '/login') {
      toPath = `/login?redirect=${to.path}`
    }
  }
  // 是否已加载路由或访问的是全局路由不用请求路由接口, firstLogin表示退出重新登录
  if ((store.getters.isAddDynamicRoutes || handleNowRouteType(to, globalRoutes) === 'global')) {
    document.title = to.meta.title ? to.meta.title : '首页'
    !toPath ? next() : next({ path: toPath })
  } else {
    // 后台请求菜单列表
    /*
      此方法默认只有3级菜单，2级菜单下的子页面保存在configRouter里
      1级目录，2级菜单，3级按钮
    */
    const permission = await store.dispatch('getPermission')
    if (!permission) return false
    const { menuRoutes, menuList } = permission
    router.addRoutes([
      ...menuRoutes,
      { path: '*', redirect: { name: '404' } }
    ])

    // 从登录页面过来选择第一个菜单
    if (from.path === '/login' && menuList && menuList[0].list && menuList[0].list[0]) {
      toPath = menuList[0].list[0].menuUrl
    }
    !toPath ? next({ ...to, replace: true }) : next({ path: toPath })
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router
