import clientRoutes from '@/modules/client/router'
import loginRoutes from '@/modules/login/router'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { routeGuard } from './routeGuard'

const routes: RouteRecordRaw[] = [
  loginRoutes,
  {
    path: '/',
    name: 'Main Layout',
    beforeEnter: routeGuard,
    component: () => import('@/core/layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/modules/dashboard/views/DashboardView.vue')
      },
      clientRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve({
            top: savedPosition.top
          })
        } else {
          resolve({
            top: 0
          })
        }
      }, 500)
    })
  },
  routes
})

export default router
