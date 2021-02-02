import { shallowMount } from '@vue/test-utils'
import Sidebar from '@/components/shared/sidebar/Sidebar.vue'

describe('Sidebar.vue', () => {
  const wrapper = shallowMount(Sidebar)
  expect(wrapper.trigger)
})
