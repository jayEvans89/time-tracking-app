
<template>
  <div>
    <div class="input-group">
      <label :class="{ 'label--error': v$.companyName.$error }" for="companyName">Company Name</label>
      <input
        id="companyName"
        v-model="companyDetails.companyName"
        :class="{ 'input--error': v$.companyName.$error }"
        type="text"
        name="companyName"
      >
      <div v-show="v$.companyName.$error" class="input__error-box">
        <p class="input__error-box-text">
          {{ v$.companyName.required.$message }}
        </p>
      </div>
    </div>

    <div class="input-group">
      <label :class="{ 'label--error': v$.companyNumber.$error }" for="companyNumber">Company Number</label>
      <input
        id="companyNumber"
        v-model="companyDetails.companyNumber"
        :class="{ 'input--error': v$.companyNumber.$error }"
        type="tel"
        name="companyNumber"
      >
      <div v-show="v$.companyNumber.$error" class="input__error-box">
        <p class="input__error-box-text">
          {{ v$.companyNumber.required.$message }}
        </p>
      </div>
    </div>

    <div class="input-group">
      <label :class="{ 'label--error': v$.companyEmail.$error }" for="companyEmail">Company Email</label>
      <input
        id="companyEmail"
        v-model="companyDetails.companyEmail"
        :class="{ 'input--error': v$.companyEmail.$error }"
        type="email"
        name="companyEmail"
      >
      <div v-show="v$.companyEmail.$error" class="input__error-box">
        <p class="input__error-box-text">
          {{ v$.companyEmail.required.$message }}
        </p>
      </div>
    </div>
    <div class="input-group">
      <label :class="{ 'label--error': v$.businessType.$error }" for="businessType">Business Type</label>
      <input
        id="businessType"
        v-model="companyDetails.businessType"
        :class="{ 'input--error': v$.businessType.$error }"
        type="text"
        name="businessType"
      >
      <div v-show="v$.businessType.$error" class="input__error-box">
        <p class="input__error-box-text">
          {{ v$.businessType.required.$message }}
        </p>
      </div>
    </div>
    <button class="btn btn--primary" @click="nextPage">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { required, numeric, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const emits = defineEmits(['save-company-details'])

const companyDetails = reactive({
  companyName: '',
  companyNumber: '',
  companyEmail: '',
  businessType: ''
})

const validation = {
  companyName: {
    required
  },
  companyNumber: {
    required,
    numeric
  },
  companyEmail: {
    required,
    email
  },
  businessType: {
    required
  }
}

const v$ = useVuelidate(validation, companyDetails)

async function nextPage() {
  if (await v$.value.$validate()) {
    emits('save-company-details', companyDetails)
  }
}
</script>
