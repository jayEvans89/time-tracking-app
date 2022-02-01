import { createRouter, createWebHistory } from 'vue-router'

// import { routeGuard } from './routeGuard'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/modules/login/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/modules/login/SignUp.vue')
  }
  // {
  //   path: '/',
  //   component: () => import('../views/main/Main.vue'),
  //   beforeEnter: routeGuard,
  //   children: [
  //     {
  //       path: '/dashboard',
  //       name: 'Dashboard',
  //       component: () => import('../views/main/dashboard/Home.vue')
  //     },
  //     {
  //       path: '/clients',
  //       name: 'Clients',
  //       component: () => import('../views/main/clients/Clients.vue')
  //     }
  //   ]
  // },
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
