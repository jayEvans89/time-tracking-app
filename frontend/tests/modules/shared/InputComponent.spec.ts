import InputComponent from '@/modules/shared/InputComponent.vue'
import { enableAutoUnmount, shallowMount, VueWrapper } from '@vue/test-utils'

let props = {
  hasError: false,
  label: 'test',
  name: 'test',
  testId: 'testInput',
  inputType: 'text',
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
  wrapper = shallowMount(InputComponent, {
    ...data
  })
}

const findInput = () => wrapper.find('[data-test-id="testInput"]')
const findInputError = () => wrapper.find('[data-test-id="testInputError"]')
const findInputErrorText = () => wrapper.find('[data-test-id="testInputErrorText-0"]')
const findInputLabel = () => wrapper.find('[data-test-id="testInputLabel"]')

describe('input component', () => {
  afterEach(() => {
    props = {
      hasError: false,
      label: 'test',
      name: 'test',
      testId: 'testInput',
      inputType: 'text',
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
