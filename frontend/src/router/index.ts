import Vue from 'vue'
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router'
import store from '../store/index'
import LoginService from '../services/login/login'
import NoClients from '@/components/clients/NoData.vue'

async function routeGuard(to: Route, from: Route, next: NavigationGuardNext) {
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

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Home.vue'),
    beforeEnter: routeGuard
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import(/* webpackChunkName: "clients" */ '../views/Clients.vue'),
    beforeEnter: routeGuard,
    children: [{
      path: '',
      component: NoClients
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
