import CompanyDetails from '@/modules/login/components/companyDetails/CompanyDetails.vue'
import { enableAutoUnmount, flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'

let wrapper: VueWrapper<any>
enableAutoUnmount(afterEach)

const div = document.createElement('div')
div.id = 'root'
document.body.appendChild(div)

const setupWrapper = () => {
  wrapper = mount(CompanyDetails, {
    attachTo: '#root'
  })
}

const findCompanyNameInput = () => wrapper.find('[data-test-id="companyName"]')
const findCompanyTelephoneInput = () => wrapper.find('[data-test-id="companyNumber"]')
const findCompanyEmailInput = () => wrapper.find('[data-test-id="companyEmail"]')
const findBusinessTypeInput = () => wrapper.find('[data-test-id="businessType"]')
const findCompanyNameError = () => wrapper.find('[data-test-id="companyNameError"]')
const findCompanyTelephoneError = () => wrapper.find('[data-test-id="companyNumberError"]')
const findCompanyEmailError = () => wrapper.find('[data-test-id="companyEmailError"]')
const findBusinessTypeError = () => wrapper.find('[data-test-id="businessTypeError"]')
const findNextButton = () => wrapper.find('[data-test-id="nextButton"]')

const formData = {
  companyName: 'Company name',
  companyNumber: '123',
  companyEmail: 'company@test.com',
  businessType: 'test'
}

describe('Company Details component', () => {
  it('should show the error messages', async () => {
    setupWrapper()

    findNextButton().trigger('click')
    await nextTick()

    expect(findCompanyNameError().isVisible()).toBeTruthy()
    expect(findCompanyEmailError().isVisible()).toBeTruthy()
    expect(findCompanyTelephoneError().isVisible()).toBeTruthy()
    expect(findBusinessTypeError().isVisible()).toBeTruthy()
  })

  it('should emit the entered info', async () => {
    setupWrapper()

    await findCompanyNameInput().setValue(formData.companyName)
    await findCompanyEmailInput().setValue(formData.companyEmail)
    await findCompanyTelephoneInput().setValue(formData.companyNumber)
    await findBusinessTypeInput().setValue(formData.businessType)

    findNextButton().trigger('click')
    await nextTick()
    await flushPromises()

    expect(wrapper.emitted()).toHaveProperty('save-company-details')
    expect(wrapper.emitted()['save-company-details']).toEqual([[formData]])
  })
})
