import { RouteRecordRaw } from 'vue-router'

const loginRoutes: RouteRecordRaw = {
  path: '/login',
  name: 'Login View',
  component: () => import('@/core/layouts/LoginLayout.vue'),
  children: [
    {
      path: '',
      name: 'Login',
      component: () => import('@/modules/login/views/login/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/modules/login/views/SignUp.vue')
    }
  ]
}

export default loginRoutes
