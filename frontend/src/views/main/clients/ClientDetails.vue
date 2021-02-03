<template>
  <section>
    <h1>Details: {{ routerParams }}</h1>
    <h2>Active Client: {{ activeClient }}</h2>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { RouteParams } from 'vue-router'
import ClientService from '@/services/client/clientService'

@Options({
  watch: {

  }
})
export default class ClientDetails extends Vue {
  mounted() {
    console.log(this.$route.params)

    this.$watch(
      () => this.$route.params, (toParams: RouteParams) => {
        if (toParams) {
          this.getClientDetails()
        }
      }
    )
  }

  get activeClient() {
    return this.$store.state.client?.activeClient
  }

  async getClientDetails() {
    const clientId = this.activeClient

    if (clientId) {
      const res = await ClientService.getClient(clientId)
      console.log(res.data)
    }

  }
}
</script>
