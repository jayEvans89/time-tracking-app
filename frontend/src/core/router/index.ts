import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { routeGuard } from './routeGuard'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login View',
    component: () => import('@/core/layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/modules/login/login/Login.vue')
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/modules/login/SignUp.vue')
      }
    ]
  },
  {
    path: '/',
    beforeEnter: routeGuard,
    component: () => import('@/core/layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/modules/dashboard/views/DashboardView.vue')
      },
      {
        path: '/clients',
        name: 'Clients',
        component: () => import('@/modules/client/views/ClientsView.vue'),
        children: [
          {
            path: '',
            name: 'Client List',
            component: () => import('@/modules/client/views/ClientList.vue')
          },
          {
            path: ':id',
            name: 'Client Details',
            component: () => import('@/modules/client/views/ClientDetails.vue'),
            props: true
          }
        ]
      }
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
