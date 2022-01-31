import LoginService from '@/services/login/loginService'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { useAuthStore } from '../store/authStore'

const loginService = new LoginService()
const authStore = useAuthStore()

export async function routeGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  let isAuthenticated = false

  if (authStore.token) {
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
    try {
      const response = await loginService.checkSession()

      if (response.status === 'Success') {
        if (to.fullPath === '/login') {
          next('/')
        } else {
          next()
        }
        return
      }
    } catch (error) {
      console.log(error)
    }

    next('/login')
  }
}
