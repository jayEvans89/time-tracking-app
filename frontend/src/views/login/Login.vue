
<template>
  <section class="login-page">
    <div class="login-page__title">
      <h1>Login</h1>
    </div>
    <form v-on:submit.prevent="validateForm">
      <input-field
        name="email"
        type="email"
        placeholder="Enter email"
        :required="true"
        :response-error="userError"
        :response-message="userErrorMessage"
        @clear-error="clearError"
      ></input-field>
      <input-field
        name="password"
        type="password"
        placeholder="Enter password"
        :required="true"
        :response-error="passwordError"
        :response-message="passwordErrorMessage"
        @clear-error="clearError"
      ></input-field>
      <button class="btn btn--primary">Submit</button>
    </form>

    <div class="no-account">
      <div class="no-account__line"></div>
      <p class="no-account__text">Don't have an account?</p>
      <div class="no-account__line"></div>
    </div>
    <router-link to="/signup" class="btn btn--secondary">Get Started</router-link>
  </section>
</template>

<style lang="scss">
.login-page {
  width: 440px;
  margin: 170px auto;

  &__title {
    text-align: center;
  }

  h1 {
    margin-bottom: 45px;
  }
}

.no-account {
  justify-content: center;
  margin: 70px 0 30px;
  display: flex;
  align-items: center;

  &__line {
    height: 1px;
    background: var(--color-text-primary);
    flex: 1 0 auto;
  }

  &__text {
    font-size: 16px;
    flex: 0 0 auto;
    margin: 0 30px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginService from '@/services/login/login'
import InputField from '@/components/shared/form/Input.vue'
import InputValidationResponse from '@/models/form/inputValidationResponse'
import FormData from '@/models/form/formData'

@Component({
  components: {
    InputField
  }
})
export default class Login extends Vue {
  public email = ''
  public password = ''

  public passwordError = false
  public passwordErrorMessage = ''
  public userError = false
  public userErrorMessage = ''

  async validateForm() {
    this.passwordError = false
    this.userError = false
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
    try {
      const res = await LoginService.login(data)
      if (res.status === 'success') {
        this.$router.push('/')
      } else {
        if (res.status === 'Password Error') {
          this.passwordError = true
          this.passwordErrorMessage = res.message
        } else {
          this.userError = true
          this.userErrorMessage = res.message
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  clearError(type: string) {
    if (type === 'email') {
      this.userError = false
      this.userErrorMessage = ''
    }
    if (type === 'password') {
      this.passwordError = false
      this.passwordErrorMessage = ''
    }
  }
}
</script>
