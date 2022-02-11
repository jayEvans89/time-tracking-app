import loginService from '@/services/login/loginService'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { useAuthStore } from '../store/authStore'

export async function routeGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const authStore = useAuthStore()
  let isAuthenticated = false

  if (authStore.token) {
    isAuthenticated = true
  }

  if (isAuthenticated) {
    if (to.fullPath === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    try {
      const response = await loginService.checkSession()
      if (response.status === 'success') {
        if (to.fullPath === '/login') {
          next('/')
        } else {
          next()
        }
        return
      }
    } catch (error) {
      console.log(error)
      next('/login')
    }
  }
}
