import Vue from 'vue';
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router';
import store from '../store/index'
import LoginService from '../services/login/login'

async function routeGuard(to: Route, from: Route, next: NavigationGuardNext) {
  let isAuthenticated = false

  if (store.state.token) {
    isAuthenticated = true
  }

  if (isAuthenticated) {
    console.log(to.fullPath)
    if (to.fullPath == '/login') {
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

    if (response.response.status === 'Success') {
      store.commit('setToken', response.response.token)
      if (to.fullPath == '/login') {
        next('/')
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
}

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    beforeEnter: routeGuard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: routeGuard
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
