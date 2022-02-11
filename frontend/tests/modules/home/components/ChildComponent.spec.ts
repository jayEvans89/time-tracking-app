import ChildComponent from '@/modules/home/components/ChildComponent.vue'
import { enableAutoUnmount, shallowMount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'

let wrapper: VueWrapper<any>

const createNewWrapper = (component: any, options = {}) => {
  wrapper = shallowMount(component, {
    ...options,
    props: {
      title: 'title'
    }
  })
}

const findTitle = () => wrapper.find('[data-test-id="title"')
const findTestButton = () => wrapper.find('[data-test-id="testButton"')
const findCount = () => wrapper.find('[data-test-id="count"]')

describe('child component', () => {
  enableAutoUnmount(afterEach)

  it('should show the title', () => {
    createNewWrapper(ChildComponent)

    expect(findTitle().text()).toBe('Child Component title')
  })

  it('should increase the count on button click', async () => {
    createNewWrapper(ChildComponent)

    expect(findCount().text()).toBe('0')

    findTestButton().trigger('click')
    await nextTick()

    expect(findCount().text()).toBe('1')
  })

  it('should show optional prop for the button text', async () => {
    createNewWrapper(ChildComponent)

    expect(findTestButton().text()).toBe('defaultOptional')
  })
})
