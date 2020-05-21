export default [
  { path: '/', redirect: '/admin/index' },
  { path: '/404', component: () => import('@/common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: () => import('@/common/login'), name: 'login', meta: { title: '登录', firstLogin: true } }
]
