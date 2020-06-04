export default [
  { path: '/', redirect: '/login' },
  { 
    path: '/login', 
    name: 'login', 
    component: () => import('../views/login.vue'), 
    meta: { title: '登录' } 
  },
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: () => import('../views/dashboard.vue'), 
    children: [
      {
        path: '/dashboard/console',
        name: 'console',
        component: () => import('../views/pages/console.vue'), 
        meta: { title: '主控台', requireAuth: false }
      },
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: () => import('../views/pages/workplace.vue'), 
        meta: { title: '工作台', requireAuth: false }
      },
      {
        path: '/dashboard/userList',
        name: 'userList',
        component: () => import('../views/pages/userList.vue'), 
        meta: { title: '用户列表', requireAuth: false }
      },
      {
        path: '/dashboard/userAdd',
        name: 'userAdd',
        component: () => import('../views/pages/userAdd.vue'), 
        meta: { title: '新增用户', requireAuth: false }
      }
    ]
  }
]