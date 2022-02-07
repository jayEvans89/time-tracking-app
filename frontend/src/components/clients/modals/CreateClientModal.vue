
<template>
  <modal :modal-id="'createClient'">
    <h1 class="modal__title">Create a New Client</h1>
    <div class="modal__body">
      <h2 class="modal__subtitle">Client Info</h2>
      <client-info-section ref="info"></client-info-section>
      <hr>
      <h2 class="modal__subtitle">Contact Info</h2>
      <client-contact-section ref="contact"></client-contact-section>
    </div>
    <div class="modal__button-container">
      <button class="btn btn--secondary" @click="close">Cancel</button>
      <button class="btn btn--primary" @click="validate">Save</button>
    </div>
  </modal>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Modal from '@/components/shared/modal/Modal.vue'
import ClientInfoSection from '@/components/clients/modals/create-client-form-sections/ClientInfo.vue'
import ClientContactSection from '@/components/clients/modals/create-client-form-sections/ContactInfo.vue'
import FormValidation from '@/components/shared/form/ValidationMethod'
import { DefineComponent } from 'vue'
import { ClientValidationData, NewClient } from '@/models/clients/newClient'
import ClientService from '@/services/client/clientService'

@Options({
  name: 'Create Client Modal',
  components: {
    Modal,
    ClientInfoSection,
    ClientContactSection
  },
  emits: ['client-saved']
})
export default class CreateClientModal extends Vue {
  close() {
    this.$store.commit('removeModal', 'createClient')
  }

  async validate() {
    const components = [
      this.$refs.info,
      this.$refs.contact
    ] as Array<DefineComponent>

    const res = await FormValidation.validateParentComponent(components)

    if (!res.data) {
      return
    }

    const validationData = res.data as ClientValidationData

    const newClient = {
      name: validationData.info.name,
      address: {
        addressLine1: validationData.info.addressLine1,
        addressLine2: validationData.info.addressLine2,
        town: validationData.info.town,
        county: validationData.info.county,
        postcode: validationData.info.postcode,
      },
      description: '',
      contacts: [validationData.contact],
      companyId: this.$store.state.companyId
    }

    this.createClient(newClient)
  }

  async createClient(data: NewClient) {
    const res = await ClientService.createClient(data)

    if (res.status !== 'success') {
      return
    }

    this.$store.commit('client/setActiveClient', res.data._id)
    this.$store.commit('removeModal', 'createClient')
    this.$emit('client-saved')
  }
}
</script>
