import { shallowMount } from '@vue/test-utils'

export function createNewWrapper(component: any, options = {}) {
  return shallowMount(component, {
    ...options
  })
}
