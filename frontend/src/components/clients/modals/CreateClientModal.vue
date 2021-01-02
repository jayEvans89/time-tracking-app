
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

@Options({
  name: 'Create Client Modal',
  components: {
    Modal,
    ClientInfoSection,
    ClientContactSection
  }
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

    const data = await FormValidation.validateParentComponent(components)

    if (data.valid) {
      console.log('send the data')
    } else {
      console.log('errors!!')
    }
  }
}
</script>
