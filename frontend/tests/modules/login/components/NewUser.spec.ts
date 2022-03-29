import NewUser from '@/modules/login/components/NewUser.vue'
import UserService from '@/services/user/userService'
import { enableAutoUnmount, flushPromises, shallowMount, VueWrapper } from '@vue/test-utils'
import { vi } from 'vitest'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/services/user/userService')

let wrapper: VueWrapper<any>
enableAutoUnmount(afterEach)

const div = document.createElement('div')
div.id = 'root'
document.body.appendChild(div)

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('@/modules/home/HomePage.vue')
  }]
})

const setupWrapper = (data?: any) => {
  wrapper = shallowMount(NewUser, {
    attachTo: '#root',
    ...data
  })
}

const userData = {
  firstName: 'first',
  lastName: 'last',
  email: 'test@tes.com',
  password: 'test123',
  confirmPassword: 'test123'
}

const findRegisterButton = () => wrapper.find('[data-test-id="registerButton"]')
const setupUserData = () => {
  wrapper.vm.userDetails.firstName = 'first'
  wrapper.vm.userDetails.lastName = 'last'
  wrapper.vm.userDetails.email = 'test@test.com'
  wrapper.vm.userDetails.password = 'test1234'
  wrapper.vm.userDetails.confirmPassword = 'test1234'
}

describe('New User component', () => {
  it('should check a user exists', async () => {
    UserService.checkExists = vi.fn().mockResolvedValue({ status: 'error' })
    setupWrapper()
    setupUserData()

    findRegisterButton().trigger('click')
    await nextTick()
    await flushPromises()
    expect(wrapper.vm.userExists.error).toBeTruthy()
  })
})
