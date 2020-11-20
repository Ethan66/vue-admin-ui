import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
import { itemIncludesList } from '@/utils/index'
import globalRoutes from './globalRoutes'
import configRoutes from './configRoutes'
import store from '../store'

const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
let isAddDynamicRoutes = false

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
  routes: [...globalRoutes, ...configRoutes]
})

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 是否已加载路由或访问的是全局路由不用请求路由接口
  if ((isAddDynamicRoutes || itemIncludesList(to, globalRoutes, 'path', 'children'))) {
    document.title = to.meta.title
    next()
  } else if (!store.getters.userInfo.sessionId) {
    isAddDynamicRoutes = false
    const newPath = to.path !== '/login' ? `/login?redirect=${to.path}` : '/login'
    next({ path: newPath, replace: true })
  } else {
    // 后台请求菜单列表
    const permission = await store.dispatch('getPermission')
    if (!permission) return false
    isAddDynamicRoutes = true
    const { menuRoutes, menuList } = permission
    router.addRoutes([
      ...menuRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    let newPath = to.path
    if (from.path === '/login') {
      let redirect = ''
      if (redirect = from.query.redirect) {
        redirect = decodeURIComponent(redirect)
      }
      try {
        if (itemIncludesList({ menuUrl: redirect }, menuList, 'menuUrl', 'list') ||
          ['/admin/index', '/404'].includes(redirect)
        ) {
          newPath = redirect
        } else {
          newPath = menuList[0].list[0].menuUrl
        }
      } catch (e) {
        console.error(e)
      }
    }
    next({ path: newPath, replace: true })
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router
