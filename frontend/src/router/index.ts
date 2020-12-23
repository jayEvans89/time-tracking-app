import Vue from 'vue'
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router'
import store from '../store/index'
import LoginService from '../services/login/login'

async function routeGuard(to: Route, from: Route, next: NavigationGuardNext) {
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
      } else if (to.fullPath === '/') {
        next('/dashboard')
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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
        component: () => import(/* webpackChunkName: "clients" */ '../views/main/clients/Clients.vue'),
        children: [{
          path: '/:id'
        }]
      }
    ]
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "login" */ '../views/sign-up/SignUp.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
