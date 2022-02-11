import HomePage from '@/modules/home/HomePage.vue'
import { enableAutoUnmount, shallowMount, VueWrapper } from '@vue/test-utils'

let wrapper: VueWrapper<any>
enableAutoUnmount(afterEach)

const findTitle = () => wrapper.find('[data-test-id="title"]')

describe('Home page component', () => {
  it('should display the correct title', () => {
    wrapper = shallowMount(HomePage, {
      props: {
        test: 'title'
      }
    })

    expect(findTitle().text()).toBe('title Home Page Title')
  })
})
