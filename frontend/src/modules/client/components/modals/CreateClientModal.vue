
<template>
  <modal modal-id="createClient">
    <h1 class="modal__title">
      Create a New Client
    </h1>
    <div class="modal__body">
      <h2 class="modal__subtitle">
        Client Info
      </h2>
      <client-info ref="clientInfoComponent" />
      <hr>
      <h2 class="modal__subtitle">
        Contact Info
      </h2>
      <contact-info ref="contactInfoComponent" />
    </div>
    <div class="modal__button-container">
      <button class="btn btn--secondary" data-bs-close>
        Cancel
      </button>
      <button class="btn btn--primary" @click="validate">
        Save
      </button>
    </div>
  </modal>
</template>

<script lang="ts" setup>
import Modal from '@/components/shared/modal/Modal.vue'
import ClientInfo from '@/modules/client/components/modals/create-client-form-sections/ClientInfo.vue'
import ContactInfo from '@/modules/client/components/modals/create-client-form-sections/ContactInfo.vue'
import ClientService from '@/services/client/clientService'
import { NewClient } from '@/types/client/newClient'
import { ref } from 'vue'

const emits = defineEmits(['client-data-saved'])

const clientInfoComponent = ref<InstanceType<typeof ClientInfo> | null>(null)
const contactInfoComponent = ref<InstanceType<typeof ContactInfo> | null>(null)

async function validate() {
  const clientInfo = await clientInfoComponent.value?.validate()
  const contactInfo = await contactInfoComponent.value?.validate()

  if ((clientInfo?.valid && clientInfo.data !== null) && (contactInfo?.valid && contactInfo.data !== null)) {
    const { clientName, ...address } = clientInfo.data

    const newClient: NewClient = {
      name: clientInfo.data?.clientName,
      address: address,
      description: '',
      contacts: [contactInfo.data],
      companyId: ''
    }
    createClient(newClient)
  }
}

async function createClient(data: NewClient) {
  const res = await ClientService.createClient(data)

  if (res.status !== 'success') {
    return
  }

  emits('client-data-saved')
}
</script>
