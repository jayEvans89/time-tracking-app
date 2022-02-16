
<template>
  <div class="row">
    <input-component
      v-model="clientInfo.clientName"
      label="Name"
      name="name"
      type="text"
      placeholder="Enter clients name"
      test-id="name"
      :has-error="v$.clientName.$error"
      :error-messages="v$.clientName.$errors"
    />
    <input-component
      v-model="clientInfo.address1"
      label="Address 1"
      name="address1"
      type="text"
      placeholder="Enter address line 1"
      test-id="address1"
      :has-error="v$.address1.$error"
      :error-messages="v$.address1.$errors"
    />
  </div>
  <div class="row">
    <input-component
      v-model="clientInfo.address2"
      label="Address 2"
      name="address2"
      type="text"
      placeholder="Enter address line 2"
      test-id="address2"
      :has-error="false"
    />
    <input-component
      v-model="clientInfo.county"
      label="County"
      name="county"
      type="text"
      placeholder="Enter county"
      test-id="county"
      :has-error="v$.county.$error"
      :error-messages="v$.county.$errors"
    />
  </div>
  <div class="row">
    <input-component
      v-model="clientInfo.town"
      label="Town"
      name="town"
      type="text"
      placeholder="Enter town/city"
      test-id="town"
      :has-error="v$.town.$error"
      :error-messages="v$.town.$errors"
    />
    <input-component
      v-model="clientInfo.postcode"
      label="Postcode"
      name="postcode"
      type="text"
      placeholder="Enter postcode"
      test-id="postcode"
      :has-error="v$.postcode.$error"
      :error-messages="v$.postcode.$errors"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import InputComponent from '@/modules/shared/InputComponent.vue'
import { FormResponse } from '@/types/form/formResponse'
import { NewClientInfo } from '@/types/client/newClient'

const clientInfo = reactive({
  clientName: '',
  address1: '',
  address2: '',
  county: '',
  town: '',
  postcode: ''
})

const validation = {
  clientName: {
    required
  },
  address1: {
    required
  },
  county: {
    required
  },
  town: {
    required
  },
  postcode: {
    required
  }
}

const v$ = useVuelidate(validation, clientInfo)

async function validate(): Promise<FormResponse<NewClientInfo>> {
  const formValid = await v$.value.$validate()

  if (!formValid) {
    return {
      valid: false,
      data: null
    }
  }

  return {
    valid: true,
    data: clientInfo
  }
}

defineExpose({
  validate
})

</script>
