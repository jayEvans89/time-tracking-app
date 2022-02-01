import Login from '@/modules/login/Login.vue'
import { enableAutoUnmount, shallowMount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'

let wrapper: VueWrapper<any>
enableAutoUnmount(afterEach)

const findSubmitButton = () => wrapper.find('[data-test-id="submitButton"]')
const findEmailError = () => wrapper.find('[data-test-id="emailError"]')
const findPasswordError = () => wrapper.find('[data-test-id="passwordError"]')

describe('Login page view', () => {
  it('should show errors', async () => {
    wrapper = shallowMount(Login)

    findSubmitButton().trigger('click')
    await nextTick()

    expect(findEmailError().isVisible()).toBeTruthy()
    expect(findPasswordError().isVisible()).toBeTruthy()
  })
})
