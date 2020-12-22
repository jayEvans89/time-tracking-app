import { InputValidationResponse, ParentValidationResponse } from '@/models/form/inputValidationResponse'
import { InputFormData, ParentData } from '@/models/form/formData'

class FormValidation {
  async validate(components: Array<Vue>) {
    console.log(components)
    const array = await Promise.all(components.map((child: Vue) => {
      const component = child as InputValidationResponse
      return component.validate()
    }))

    let validCount = 0

    const data = {} as InputFormData
    for (const component of array) {
      if (component) {
        if (!component.valid) {
          break
        } else {
          validCount++
          data[component.type] = component.value
        }
      }
    }

    console.log('valid length: ', validCount)
    if (validCount === array.length) {
      return {
        valid: true,
        data: data
      }
    } else {
      return {
        valid: false,
        data: data
      }
    }
  }

  async validateParentComponent(components: Array<Vue>) {
    console.log(components)
    const array = await Promise.all(components.map((child: Vue) => {
      const component = child as ParentValidationResponse
      return component.validate(true)
    }))

    const data = {} as ParentData
    let validCount = 0
    const response = {
      valid: false,
      page: 0,
      data: {} as ParentData
    }

    for (const component of array) {
      if (component) {
        if (!component.valid) {
          response.valid = false
          response.page = component.page
          break
        } else {
          validCount++
          data[component.type] = component.data
        }
      }
    }

    if (validCount === array.length) {
      response.data = data
      response.valid = true
      return response
    } else {
      return response
    }
  }
}

export default new FormValidation()
