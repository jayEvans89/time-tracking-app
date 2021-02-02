
<template>
  <div class="container">
    <section class="login-page">
      <div class="login-page__title">
        <h1>Login</h1>
      </div>
      <form v-on:submit.prevent="validateForm">
        <input-field
          :name="'email'"
          :type="'email'"
          :placeholder="'Enter email'"
          :required="true"
          :response-error="userError"
          :response-message="userErrorMessage"
          @clear-error="clearError"
          ref="email"
        ></input-field>
        <input-field
          name="password"
          type="password"
          placeholder="Enter password"
          :required="true"
          :response-error="passwordError"
          :response-message="passwordErrorMessage"
          @clear-error="clearError"
          ref="password"
        ></input-field>
        <button class="btn btn--primary">Submit</button>
      </form>

      <div class="no-account">
        <div class="no-account__line"></div>
        <p class="no-account__text">Don't have an account?</p>
        <div class="no-account__line"></div>
      </div>
      <router-link to="/signup" class="btn btn--secondary"
        >Get Started</router-link
      >
    </section>
  </div>
</template>

<style lang="scss">
.login-page {
  margin: 170px auto;
  width: 440px;

  &__title {
    text-align: center;
  }

  h1 {
    margin-bottom: 45px;
  }
}

.no-account {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 70px 0 30px;

  &__line {
    background: var(--color-text-primary);
    flex: 1 0 auto;
    height: 1px;
  }

  &__text {
    flex: 0 0 auto;
    font-size: 16px;
    margin: 0 30px;
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import LoginService from '@/services/login/login'
import InputField from '@/components/shared/form/Input.vue'
import formValidation from '@/components/shared/form/ValidationMethod'
import { DefineComponent } from 'vue'
import { LoginValidationData} from '@/models/user/login'

@Options({
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
    const components = [
      this.$refs.email,
      this.$refs.password
    ] as Array<DefineComponent>

    const res = await formValidation.validate(components)
    if (!res.valid) {
      return
    }

    const validationData = res.data as LoginValidationData

    this.login(validationData)
  }

  async login(data: LoginValidationData) {
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
