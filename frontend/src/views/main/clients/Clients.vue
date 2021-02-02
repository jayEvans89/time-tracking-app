<template>
  <div class="clients">
    <client-sidebar v-show="!noData" :clients="clientNames"></client-sidebar>
    <no-clients v-show="noData"></no-clients>
    <router-view></router-view>
    <create-client-modal></create-client-modal>
  </div>
</template>

<style lang="scss">
.clients {
  display: flex;
  width: 100%;
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ClientService from '@/services/client/clientService'
import { ClientNames } from '@/models/clients/clientModal'
import NoClients from '@/components/clients/NoData.vue'
import CreateClientModal from '@/components/clients/modals/CreateClientModal.vue'
import ClientSidebar from '@/components/clients/Sidebar.vue'
import ClientStore from '@/store/client/client'

@Options({
  components: {
    ClientSidebar,
    NoClients,
    CreateClientModal
  },
  name: 'Clients'
})
export default class Clients extends Vue {
  public gettingData = false
  public clientNames = [] as Array<ClientNames>

  get noData() {
    if (this.clientNames.length === 0) {
      return true
    } else {
      return false
    }
  }

  mounted() {
    this.getClientNames()
    this.checkStore()
  }

  checkStore() {
    if (this.$store.hasModule('client')) {
      return
    }
    this.$store.registerModule('client', ClientStore)
  }

  async getClientNames() {
    this.gettingData = true
    try {
      const res = await ClientService.getClientNames()
      this.clientNames = res.data
    } catch (error) {
      console.log(error)
    }
    this.gettingData = false
  }
}
</script>
