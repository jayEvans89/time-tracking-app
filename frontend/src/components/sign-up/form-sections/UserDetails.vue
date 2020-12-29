
<template>
  <div>
    <input-field
      type="text"
      name="first_name"
      label="First Name"
      ref="firstName"
      placeholder="Your first name"
      :required="true"
    ></input-field>
    <input-field
      type="text"
      name="last_name"
      label="Last Name"
      ref="lastName"
      placeholder="Your last name"
      :required="true"
    ></input-field>
    <new-email ref="email"></new-email>
    <new-password ref="password"></new-password>
    <div class="button-container">
      <button class="btn btn--secondary" @click="back">Back</button>
      <button class="btn btn--primary" @click="createAccount">Create Account</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import InputField from '@/components/shared/form/Input.vue'
import FormValidation from '@/components/shared/form/ValidationMethod'
import NewEmail from '@/components/shared/form/NewEmail.vue'
import NewPassword from '@/components/shared/form/NewPassword.vue'
import { DefineComponent } from 'vue'

@Options({
  components: {
    InputField,
    NewEmail,
    NewPassword
  }
})
export default class UserDetails extends Vue {
  async validate(parent = false) {
    console.log('validate user details')
    const components = [
      this.$refs.firstName,
      this.$refs.lastName,
      this.$refs.email,
      this.$refs.password
    ] as Array<DefineComponent>

    const response = await FormValidation.validate(components)

    if (!parent) {
      return response
    } else {
      return {
        valid: response.valid,
        page: 3,
        data: response.data,
        type: 'user'
      }
    }
  }

  back(e: Event) {
    e.preventDefault()
    this.$emit('page-change', 2)
  }

  async createAccount(e: Event) {
    const res = await this.validate()
    if (res.valid) {
      return true
    } else {
      e.preventDefault()
    }
  }
}
</script>
