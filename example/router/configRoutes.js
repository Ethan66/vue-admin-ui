import Layout from '@/common/layout/Layout'

export default [
  { path: '/admin',
    component: Layout,
    children: [
      { path: 'index', name: '/admin/index', component: () => import('@/common/home'), meta: { title: '首页', isTab: true } }
    ]
  }
]
