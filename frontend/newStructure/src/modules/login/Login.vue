
<template>
  <div class="container">
    <section class="login-page">
      <div class="login-page__title">
        <h1>Login</h1>
      </div>
      <form @submit.prevent="validateForm">
        <div class="input-group">
          <label :class="{ 'label--error': v$.email.$error || errors.userError }" for="email">Email</label>
          <input
            id="email"
            v-model="loginDetails.email"
            :class="{ 'input--error': v$.email.$error || errors.userError }"
            type="email"
            name="email"
            placeholder="Enter email"
          >
          <div v-show="v$.email.$error || errors.userError" class="input__error-box">
            <p class="input__error-box-text">
              {{ emailError }}
            </p>
          </div>
        </div>
        <div class="input-group">
          <label :class="{ 'label--error': v$.password.$error || errors.passwordError }" for="password">Password</label>
          <input
            id="password"
            v-model="loginDetails.password"
            :class="{ 'input--error': v$.password.$error || errors.passwordError }"
            type="password"
            name="password"
            placeholder="Enter password"
          >
          <div v-show="v$.password.$error || errors.passwordError" class="input__error-box">
            <p class="input__error-box-text">
              {{ passwordError }}
            </p>
          </div>
        </div>
        <button class="btn btn--primary">
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
      <router-link to="/signup" class="btn btn--secondary">
        Get Started
      </router-link>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import LoginService from '@/services/login/loginService'
import router from '@/core/router'

const loginService = new LoginService()
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
  userErrorMessage: ''
})

const passwordError = computed(() => {
  if (errors.passwordErrorMessage !== '') {
    return errors.passwordErrorMessage
  }
  return v$.value.password.required.$message
})

const emailError = computed(() => {
  if (errors.userErrorMessage !== '') {
    return errors.userErrorMessage
  }
  return v$.value.email.email.$message
})

const v$ = useVuelidate(rules, loginDetails)

async function validateForm() {
  if (await v$.value.$validate()) {
    login()
  }
}

async function login() {
  clearErrors()
  try {
    const res = await loginService.login(loginDetails)
    if (res.status === 'success') {
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
  }
}

function clearErrors() {
  errors.passwordError = false
  errors.passwordErrorMessage = ''
  errors.userError = false
  errors.userErrorMessage = ''
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
