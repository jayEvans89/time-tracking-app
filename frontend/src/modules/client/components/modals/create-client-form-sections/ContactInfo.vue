
<template>
  <div class="row">
    <input-component
      v-model="contactInfo.firstName"
      label="First Name"
      name="firstName"
      type="text"
      placeholder="Contacts first name"
      test-id="firstName"
      :has-error="v$.firstName.$error"
      :error-messages="v$.firstName.$errors"
    />
    <input-component
      v-model="contactInfo.lastName"
      label="Last Name"
      name="lastName"
      type="text"
      placeholder="Contacts last name"
      test-id="lastName"
      :has-error="v$.lastName.$error"
      :error-messages="v$.lastName.$errors"
    />
  </div>
  <div class="row">
    <input-component
      v-model="contactInfo.position"
      label="Position"
      name="position"
      type="text"
      placeholder="Contacts position"
      test-id="position"
      :has-error="false"
    />
    <input-component
      v-model="contactInfo.email"
      label="Email"
      name="email"
      type="email"
      placeholder="Contacts email address"
      test-id="email"
      :has-error="v$.email.$error"
      :error-messages="v$.email.$errors"
    />
  </div>
  <div class="row">
    <input-component
      v-model="contactInfo.mobileNumber"
      label="Mobile Number"
      name="mobile"
      type="text"
      placeholder="Contacts mobile number"
      test-id="mobile"
      :has-error="false"
    />
    <input-component
      v-model="contactInfo.officeNumber"
      label="Office Number"
      name="office"
      type="text"
      placeholder="Contacts office number"
      test-id="office"
      :has-error="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import InputComponent from '@/modules/shared/inputComponent/InputComponent.vue'
import { FormResponse } from '@/types/form/formResponse'
import { ClientContactInfo } from '@/types/client/newClient'

const contactInfo = reactive({
  firstName: '',
  lastName: '',
  position: '',
  email: '',
  mobileNumber: '',
  officeNumber: ''
})

const validation = {
  firstName: {
    required
  },
  lastName: {
    required
  },
  email: {
    required, email
  }
}

const v$ = useVuelidate(validation, contactInfo)

async function validate(): Promise<FormResponse<ClientContactInfo>> {
  const formValid = await v$.value.$validate()

  if (!formValid) {
    return {
      valid: false,
      data: null
    }
  }

  return {
    valid: true,
    data: contactInfo
  }
}

defineExpose({
  validate
})
</script>
