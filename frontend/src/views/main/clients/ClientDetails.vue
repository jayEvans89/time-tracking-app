<template>
  <div class="client-details">
    <section class="client-details__header">
      <h2>{{ details.name }}</h2>
      <button class="btn btn--primary btn--small btn--inline">Edit</button>
    </section>
    <section class="client-details__address">
      <h4 class="client-details__address-title">Address</h4>
      <h4></h4>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.client-details {
  flex: 1;
  padding: 60px 40px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 30px;
  }

  &__address-title {
    color: var(--color-text-primary-faded);
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { RouteParams } from 'vue-router'
import ClientService from '@/services/client/clientService'
import { Client } from '@/models/clients/clientModal'

@Options({})
export default class ClientDetails extends Vue {
  public details = {} as Client

  mounted() {
    if (this.$route.params) {
      console.log('route param: ', this.$route.params.id)
      this.getClientDetails(this.$route.params.id as string)
    }
    this.watchRouter()
  }

  get activeClient() {
    return this.$store.state.client?.activeClient
  }

  watchRouter() {
    this.$watch(
      () => this.$route.params, (toParams: RouteParams) => {
        if (toParams) {
          this.getClientDetails(toParams.id as string)
        }
      }
    )
  }

  async getClientDetails(clientId: string) {
    try {
      const res = await ClientService.getClient(clientId)
      if (res.status === 'success') {
        this.details = res.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
