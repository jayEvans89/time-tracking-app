
<template>
  <form v-on:submit.prevent="validateForm">
    <input-field name="email" type="email" placeholder="Enter email" :required="true"></input-field>
    <input-field name="password" type="password" placeholder="Enter password" :required="true"></input-field>
    <button class="btn btn--primary">Submit</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginService from '../services/login/login'
import InputField from '@/components/shared/form/Input.vue'
import InputValidationResponse from '../models/form/inputValidationResponse'
import FormData from '../models/form/formData'

@Component({
  components: {
    InputField
  }
})
export default class Login extends Vue {
  public email = ''
  public password = ''

  async validateForm() {
    const array = await Promise.all(this.$children.map((child: Vue) => {
      const component = child as InputValidationResponse
      return component.validate()
    }))

    let validCount = 0
    const data = {} as FormData
    for (const component of array) {
      if (!component.valid) {
        break
      } else {
        validCount++
        data[component.type] = component.value
      }
    }

    if (validCount === array.length) {
      this.login(data)
    }
  }

  async login(data: FormData) {
    await LoginService.login(data).then(res => {
      console.log('success: ', res.message, res.data)
      this.$router.push('/')
    }).catch(err => {
      console.log('error: ', err.response.data.message)
    })
  }
}
</script>
