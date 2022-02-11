import Login from '@/modules/login/Login.vue'
import LoginService from '@/services/login/loginService'
import { createTestingPinia } from '@pinia/testing'
import { enableAutoUnmount, flushPromises, RouterLinkStub, shallowMount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

jest.mock('@/services/login/loginService')

let wrapper: VueWrapper<any>
enableAutoUnmount(afterEach)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/modules/login/Login.vue')
    }
  ]
})

const div = document.createElement('div')
div.id = 'root'
document.body.appendChild(div)

const setupWrapper = async () => {
  wrapper = shallowMount(Login, {
    attachTo: '#root',
    global: {
      plugins: [createTestingPinia(), router],
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  })

  router.push('/')
  await router.isReady()
}

const findSubmitButton = () => wrapper.find('[data-test-id="submitButton"]')
const findEmailError = () => wrapper.find('[data-test-id="emailError"]')
const findPasswordError = () => wrapper.find('[data-test-id="passwordError"]')
const findEmailInput = () => wrapper.find('[data-test-id="emailInput"]')
const findPasswordInput = () => wrapper.find('[data-test-id="passwordInput"]')
const findRegisterButton = () => wrapper.find('[data-test-id="registerButton"]')
const findFatalError = () => wrapper.find('[data-test-id="fatalError"]')
const RouterLink = () => wrapper.findComponent(RouterLinkStub)

const fillOutFields = async () => {
  await findEmailInput().setValue('test@test.com')
  await findPasswordInput().setValue('password')
}

describe('Login page view', () => {
  it('should show errors', async () => {
    setupWrapper()

    findSubmitButton().trigger('click')
    await nextTick()

    expect(findEmailError().isVisible()).toBeTruthy()
    expect(findPasswordError().isVisible()).toBeTruthy()
  })

  it('should show incorrect password error', async () => {
    LoginService.login = jest.fn().mockResolvedValue({ status: 'Password Error', message: 'wrong password' })
    setupWrapper()

    await fillOutFields()

    findSubmitButton().trigger('click')
    await nextTick()
    await flushPromises()
    expect(findPasswordError().isVisible()).toBeTruthy()
  })

  it('should show user does not exist error', async () => {
    LoginService.login = jest.fn().mockResolvedValue({ status: 'User Error', message: 'user does not exist' })
    setupWrapper()

    await fillOutFields()

    findSubmitButton().trigger('click')
    await nextTick()
    await flushPromises()
    expect(findEmailError().isVisible()).toBeTruthy()
  })

  it('should navigate to root page', async () => {
    LoginService.login = jest.fn().mockResolvedValue({ status: 'success' })
    const push = jest.spyOn(router, 'push')
    setupWrapper()

    await fillOutFields()

    findSubmitButton().trigger('click')
    await nextTick()
    await flushPromises()
    expect(push).toHaveBeenCalledWith('/')
  })

  it('register button should have the correct link and text', async () => {
    setupWrapper()

    findRegisterButton().trigger('click')
    await nextTick()
    await router.isReady()
    expect(RouterLink().props().to).toBe('/signup')
    expect(RouterLink().text()).toBe('Get Started')
  })

  it('should show the fatal error message', async () => {
    LoginService.login = jest.fn().mockRejectedValue({})
    setupWrapper()

    await fillOutFields()

    findSubmitButton().trigger('click')
    await nextTick()
    await flushPromises()
    expect(findFatalError().isVisible()).toBeTruthy()
  })
})
