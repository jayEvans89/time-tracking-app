
<template>
  <modal :modal-id="'createClient'">
    <h1 class="modal__title">Create a New Client</h1>
    <div class="modal__body">
      <h2 class="modal__subtitle">Client Info</h2>
      <client-info-section></client-info-section>
      <hr>
      <h2 class="modal__subtitle">Contact Info</h2>
      <client-contact-section></client-contact-section>
    </div>
    <div class="modal__button-container">
      <button class="btn btn--secondary" @click="close">Cancel</button>
      <button class="btn btn--primary" @click="close">Save</button>
    </div>
  </modal>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Modal from '@/components/shared/modal/Modal.vue'
import ClientInfoSection from '@/components/clients/modals/create-client-form-sections/ClientInfo.vue'
import ClientContactSection from '@/components/clients/modals/create-client-form-sections/ContactInfo.vue'

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
}
</script>
