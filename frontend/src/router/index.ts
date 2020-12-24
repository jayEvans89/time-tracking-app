import { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext, createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import LoginService from '../services/login/login'
import NoClients from '@/components/clients/NoData.vue'

async function routeGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  let isAuthenticated = false

  if (store.state.token) {
    isAuthenticated = true
  }

  if (isAuthenticated) {
    console.log(to.fullPath)
    if (to.fullPath === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    let response
    try {
      response = await LoginService.checkSession()
    } catch (error) {
      console.log(error)
    }

    if (response.status === 'Success') {
      if (to.fullPath === '/login') {
        next('/')
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/main/Main.vue'),
    beforeEnter: routeGuard,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/main/dashboard/Home.vue')
      },
      {
        path: '/clients',
        name: 'Clients',
        component: () => import(/* webpackChunkName: "clients" */ '../views/main/clients/Clients.vue')
      }
    ]
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "login" */ '../views/sign-up/SignUp.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
