import { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext, createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import LoginService from '../services/login/login'

async function routeGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  let isAuthenticated = false

  if (store.state.token) {
    isAuthenticated = true
  }

  if (isAuthenticated) {
    if (to.fullPath === '/login') {
      next('/dashboard')
    } else if (to.fullPath === '/') {
      next('/dashboard')
    } else {
      next()
    }
    return
  }

  try {
    const response = await LoginService.checkSession()
    if (response.status === 'success') {
      store.dispatch('setUserDetails', {
        userId: response.response.userId,
        companyId: response.response.companyId
      })
      if (to.fullPath === '/login') {
        next('/')
      } else if (to.fullPath === '/') {
        next('/dashboard')
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } catch (error) {
    console.log(error)
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/main/Main.vue'),
    beforeEnter: routeGuard,
    name: 'Main',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/main/dashboard/Home.vue')
      },
      {
        path: 'clients',
        name: 'Clients',
        component: () => import(/* webpackChunkName: "clients" */ '@/views/main/clients/Clients.vue'),
        children: [
          {
            path: ':id',
            name: 'Client Details',
            component: () => import(/* webpackChunkName: "client-details" */ '@/views/main/clients/ClientDetails.vue'),
            props: {
              default: true,
              id: true
            }
          }
        ]
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
