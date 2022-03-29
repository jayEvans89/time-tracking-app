import ModalComponent from '@/modules/shared/modal/ModalComponent.vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'

describe('modal component', () => {
  enableAutoUnmount(afterEach)

  it('should emit modalMounted when mounted', () => {
    const wrapper = mount(ModalComponent, {
      props: {
        modalId: 'testModal'
      }
    })

    expect(wrapper.emitted()).toHaveProperty('modal-mounted')
  })
})
