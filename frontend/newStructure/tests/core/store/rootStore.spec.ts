import { useRootStore } from '@/core/store/rootStore'
import { createPinia, setActivePinia } from 'pinia'

describe('setup root store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should exist', () => {
    const store = useRootStore()
    store.setName('Root Store')
    expect(store.name).toBe('Root Store')
  })
})
