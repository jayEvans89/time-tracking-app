import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/modules/home/HomePage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/modules/about/AboutPage.vue')
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
