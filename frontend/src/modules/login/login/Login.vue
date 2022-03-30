
<template>
  <div class="container">
    <section class="login-page">
      <div class="login-page__title">
        <h1 data-test-id="title">
          Login
        </h1>
      </div>
      <form data-test-id="loginForm" @submit.prevent="validateForm">
        <input-component
          v-model="loginDetails.email"
          :has-error="v$.email.$error || errors.userError"
          label="Email"
          name="email"
          test-id="email"
          type="email"
          :error-messages="v$.email.$errors"
        />
        <input-component
          v-model="loginDetails.password"
          :has-error="v$.password.$error || errors.passwordError"
          label="Password"
          name="password"
          test-id="password"
          type="password"
          :error-messages="v$.password.$errors"
        />
        <div v-show="errors.passwordError || errors.userError" class="input__error-box">
          <p v-if="errors.passwordError">
            {{ errors.passwordError }}
          </p>
          <p v-if="errors.userError">
            {{ errors.userError }}
          </p>
        </div>
        <div v-show="errors.fatalError" class="input__error-box" data-test-id="fatalError">
          <p>A fatal error has occurred please try again later</p>
        </div>
        <button class="btn btn--primary" data-test-id="submitButton">
          Submit
        </button>
      </form>

      <div class="no-account">
        <div class="no-account__line" />
        <p class="no-account__text">
          Don't have an account?
        </p>
        <div class="no-account__line" />
      </div>
      <router-link to="/signup" class="btn btn--secondary" data-test-id="registerButton">
        Get Started
      </router-link>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import LoginService from '@/services/login/loginService'
import router from '@/core/router'
import { useAuthStore } from '@/core/store/authStore/authStore'
import InputComponent from '@/modules/shared/inputComponent/InputComponent.vue'

const authStore = useAuthStore()

const loginDetails = reactive({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required }
}

const errors = reactive({
  passwordError: false,
  passwordErrorMessage: '',
  userError: false,
  userErrorMessage: '',
  fatalError: false
})

const v$ = useVuelidate(rules, loginDetails)

async function validateForm() {
  const formValid = await v$.value.$validate()
  if (formValid) {
    login()
  }
}

async function login() {
  clearErrors()
  try {
    const res = await LoginService.login(loginDetails)
    if (res.status === 'success') {
      authStore.setUserId(res.data._id)
      router.push('/')
      return
    }

    if (res.status === 'Password Error') {
      errors.passwordError = true
      errors.passwordErrorMessage = res.message
    } else {
      errors.userError = true
      errors.userErrorMessage = res.message
    }
  } catch (error) {
    console.log(error)
    errors.fatalError = true
  }
}

function clearErrors() {
  errors.passwordError = false
  errors.passwordErrorMessage = ''
  errors.userError = false
  errors.userErrorMessage = ''
  errors.fatalError = false
}
</script>

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
