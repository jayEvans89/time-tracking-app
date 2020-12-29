<template>
  <div class="clients">
    <nav v-show="!noData" class="client-sidebar"></nav>
    <no-clients v-show="noData"></no-clients>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.clients {
  width: 100%;
  display: flex;
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ClientService from '@/services/client/clientService'
import { ClientNames } from '@/models/clients/clientModal'
import NoClients from '@/components/clients/NoData.vue'

@Options({
  components: {
    NoClients
  }
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
    console.log('client mounted')
    this.getClientNames()
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
