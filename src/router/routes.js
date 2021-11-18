const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Index.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/bet',
        name: 'Bet',
        component: () => import('src/pages/Bet.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/draw',
        name: 'Draw',
        component: () => import('pages/Draw.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('pages/History.vue'),
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
