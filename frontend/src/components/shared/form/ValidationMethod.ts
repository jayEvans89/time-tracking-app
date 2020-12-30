import { InputValidationResponse, ParentValidationResponse } from '@/models/form/inputValidationResponse'
import { InputFormData, ParentData } from '@/models/form/formData'
import { DefineComponent } from 'vue'

class FormValidation {
  async validate(components: Array<DefineComponent>) {
    const array = await Promise.all(components.map((child: DefineComponent) => {
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

  async validateParentComponent(components: Array<DefineComponent>) {
    const array = await Promise.all(components.map((child: DefineComponent) => {
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
