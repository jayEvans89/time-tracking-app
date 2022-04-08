import InputComponent from '@/modules/shared/inputComponent/InputComponent.vue'
import { enableAutoUnmount, mount, VueWrapper } from '@vue/test-utils'

let props = {
  hasError: false,
  label: 'test',
  name: 'test',
  testId: 'test',
  type: 'text',
  errorMessages: [
    {
      $message: 'test error message'
    }
  ],
  modelValue: ''
}

let wrapper: VueWrapper<any>
enableAutoUnmount(afterEach)

const setupWrapper = (data: any) => {
  wrapper = mount(InputComponent, {
    ...data
  })
}

const findInput = () => wrapper.find('[data-test-id="testInput"]')
const findInputError = () => wrapper.find('[data-test-id="testError"]')
const findInputErrorText = () => wrapper.find('[data-test-id="testErrorText-0"]')
const findInputLabel = () => wrapper.find('[data-test-id="testLabel"]')

describe('input component', () => {
  afterEach(() => {
    props = {
      hasError: false,
      label: 'test',
      name: 'test',
      testId: 'test',
      type: 'text',
      errorMessages: [
        {
          $message: 'test error message'
        }
      ],
      modelValue: ''
    }
  })

  it('should show the error message and styling', async () => {
    props.hasError = true
    setupWrapper({
      props: props
    })

    expect(findInputError().isVisible()).toBeTruthy()
    expect(findInputErrorText().text()).toBe(props.errorMessages[0].$message)
  })

  it('should emit an event when the value changes', async () => {
    setupWrapper({
      props: props
    })

    await findInput().setValue('test value')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toEqual([['test value']])
  })

  it('should show the correct label text', () => {
    setupWrapper({
      props: props
    })

    expect(findInputLabel().text()).toBe('test')
  })
})
