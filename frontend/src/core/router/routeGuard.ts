import loginService from '@/services/login/loginService'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { useAuthStore } from '../store/authStore'

export async function routeGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.token !== ''

  if (isAuthenticated) {
    if (to.fullPath === '/login') {
      next('/')
      return
    }

    next()
    return
  }

  try {
    const res = await loginService.checkSession()
    if (res.status !== 'success') {
      next('/login')
      return
    }

    authStore.setUserId(res.userId)

    if (to.fullPath !== '/login') {
      next()
      return
    }

    next('/')
  } catch (error) {
    console.log(error)
    next('/login')
  }
}
