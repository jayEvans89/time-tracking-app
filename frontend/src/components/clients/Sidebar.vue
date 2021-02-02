
<template>
  <nav class="client-sidebar">
    <div class="client-sidebar__header">
      <h2>Clients</h2>
    </div>
    <ul class="client-sidebar__client-list">
      <li
        class="client-sidebar__client-name"
        :class="{
          'client-sidebar__client-name--active': activeClient === client._id
        }"
        v-for="client in clients"
        :key="client._id"
        @click="setActiveClient(client._id)"
      >
        {{ client.name }}
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.client-sidebar {
  background: var(--color-background-secondary);

  &__header {
    padding: 40px 120px 10px 20px;
    border-bottom: 1px solid var(--color-border-primary);

    h2 {
      font-size: 30px;
    }
  }

  &__client-list {
    padding: 30px 20px;
    margin: 0;
  }

  &__client-name {
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;

    &--active {
      background: var(--medium-purple);
    }
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ClientNames } from '@/models/clients/clientModal'

class Props {
  clients!: Array<ClientNames>
}

@Options({
  name: 'Client Sidebar'
})
export default class ClientSidebar extends Vue.with(Props) {
  get activeClient() {
    return this.$store.state.client?.activeClient
  }

  setActiveClient(id: string) {
    this.$store.commit('client/setActiveClient', id)
  }
}
</script>
