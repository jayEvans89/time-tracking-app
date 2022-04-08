import { useAuthStore } from '@/core/store/authStore/authStore'
import { createPinia, setActivePinia } from 'pinia'

describe('setup root store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should set a token', () => {
    const store = useAuthStore()
    store.setToken('new token')
    expect(store.token).toBe('new token')
  })

  it('should clear a token', () => {
    const store = useAuthStore()
    store.logout()
    expect(store.token).toBe('')
  })
})
