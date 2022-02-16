
<template>
  <div>
    <input-component
      v-model="userDetails.firstName"
      label="First Name"
      name="firstName"
      :has-error="v$.firstName.$error"
      type="text"
      test-id="firstName"
      :error-messages="v$.firstName.$errors"
    />

    <input-component
      v-model="userDetails.lastName"
      label="Last Name"
      name="lastName"
      :has-error="v$.lastName.$error"
      type="text"
      test-id="lastName"
      :error-messages="v$.lastName.$errors"
    />

    <input-component
      v-model="userDetails.email"
      label="Email"
      name="email"
      :has-error="emailErrors.error"
      type="email"
      test-id="email"
      :error-messages="emailErrors.errorMessages"
    />

    <input-component
      v-model="userDetails.password"
      label="Password"
      name="password"
      :has-error="v$.password.$error"
      type="password"
      test-id="password"
      :error-messages="v$.password.$errors"
    />

    <input-component
      v-model="userDetails.confirmPassword"
      label="Confirm Password"
      name="confirmPassword"
      :has-error="v$.confirmPassword.$error"
      type="password"
      test-id="confirmPassword"
      :error-messages="v$.confirmPassword.$errors"
    />

    <button class="btn btn--primary" data-test-id="registerButton" @click="validate">
      Register
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, toRef } from 'vue'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import userService from '@/services/user/userService'
import InputComponent from '@/modules/shared/InputComponent.vue'
import router from '@/core/router'

const userExists = {
  error: false,
  message: 'A user with that email already exists'
}

const userDetails = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validation = {
  firstName: {
    required
  },
  lastName: {
    required
  },
  email: {
    required,
    email
  },
  password: {
    required,
    minLength: minLength(6)
  },
  confirmPassword: {
    required,
    sameAsPassword: helpers.withMessage('The passwords must match', sameAs(toRef(userDetails, 'password')))
  }
}

const emailErrors = computed(() => {
  let messages

  if (userExists.error) {
    messages = [{
      $message: userExists.message,
      $propertyPath: '',
      $property: '',
      $validator: '',
      $params: {},
      $pending: false,
      $response: '',
      $uid: ''
    }]
  } else {
    messages = v$.value.email.$errors
  }
  return {
    error: v$.value.email.$error || userExists.error,
    errorMessages: messages
  }
})

const v$ = useVuelidate(validation, userDetails)

async function validate() {
  const formValid = await v$.value.$validate()

  if (!formValid) {
    return
  }

  if (!await checkUserExists()) {
    return
  }

  register()
}

async function checkUserExists() {
  userExists.error = false
  const res = await userService.checkExists(userDetails.email)

  if (res.status === 'error') {
    userExists.error = true
    return false
  }
  return true
}

async function register() {
  const { confirmPassword, ...newUser } = userDetails
  try {
    const res = await userService.newUser(newUser)
    if (res.status === 'success') {
      router.push('/')
      return
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
