import Layout from '@/common/layout/Layout'

export default [
  { path: '/admin',
    component: Layout,
    children: [
      { path: 'index', component: () => import('@/common/home'), meta: { title: '首页' } }
    ]
  },
  /* {
    // 副标签案例
    path: '/develop-center',
    component: Layout,
    children: [
      { path: '/develop-center/menu-manage/newpage', component: () => import('@/pages/develop-center/menu-manage/newpage'), meta: { title: '动态展示副标签' } }
    ]
  }, */
  /* // 字段管理
  { path: '/develop-center/page-manage',
    component: Layout,
    children: [
      { path: 'tybemanage', component: () => import('@/pages/develop-center/page-manage/tybemanage'), meta: { title: '字段页面' } }
    ]
  },
  // 角色管理
  { path: '/auth-config/role-manage',
    component: Layout,
    children: [
      { path: 'roleAuth', component: () => import('@/pages/auth-config/role-manage/roleAuth'), meta: { title: '角色授权' } }
    ]
  },
  // 形态管理
  { path: '/finance-product/product-manage',
    component: Layout,
    children: [
      { path: 'shape-manage/index', component: () => import('@/pages/finance-product/product-manage/shape-manage/index'), meta: { title: '形态管理' } }
    ]
  },
  // 数据权限共享
  { path: '/auth-config/data-authority',
    component: Layout,
    children: [
      { path: '/auth-config/data-authority/data-share', component: () => import('@/pages/auth-config/data-authority/data-share'), meta: { title: '数据权限共享' } }
    ]
  },
  { path: '/demo',
    component: Layout,
    children: [
      { path: 'search', component: () => import('@/pages/demo/search'), meta: { title: 'demo' } }
    ]
  } */
]
