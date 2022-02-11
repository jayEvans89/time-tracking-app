import ModalComponent from '@/modules/shared/modal/ModalComponent.vue'
import { enableAutoUnmount, shallowMount } from '@vue/test-utils'

describe('modal component', () => {
  enableAutoUnmount(afterEach)

  it('should set the id of the modal via a prop', () => {
    const wrapper = shallowMount(ModalComponent, {
      props: {
        modalId: 'testModal'
      }
    })

    const modal = wrapper.find('[data-test-id="modal"]')
    expect(modal.attributes('id')).toBe('testModal')
  })

  it('should emit modalMounted when mounted', () => {
    const wrapper = shallowMount(ModalComponent, {
      props: {
        modalId: 'testModal'
      }
    })

    expect(wrapper.emitted()).toHaveProperty('modal-mounted')
  })
})
