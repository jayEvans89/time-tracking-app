
<template>
  <nav class="client-sidebar">
    <div class="client-sidebar__header">
      <h2>Clients</h2>
      <p @click="addNewClient">Add</p>
    </div>
    <ul class="client-sidebar__client-list">
      <li
        :class="[
          {
            'client-sidebar__client-name--active': activeClient === client._id
          },
          'client-sidebar__client-name'
        ]"
        v-for="client in clients"
        :key="client._id"
        @click="setActiveClient(client._id)"
      >
        <router-link :to="'/clients/' + client._id">{{ client.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.client-sidebar {
  background: var(--color-background-secondary);

  &__header {
    border-bottom: 1px solid var(--color-border-primary);
    padding: 40px 120px 10px 20px;

    h2 {
      font-size: 30px;
    }
  }

  &__client-list {
    margin: 0;
    padding: 30px 20px;
  }

  &__client-name {
    border-radius: 5px;
    cursor: pointer;

    &--active {
      background: var(--medium-purple);
    }

    a {
      display: block;
      padding: 10px 15px;
      text-decoration: none;
    }
  }
}
</style>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'
import { ClientNames } from '@/models/clients/clientModal'
import { PropType } from 'vue'

class Props {
  clients = prop({
    type: Array as PropType<Array<ClientNames>>,
    required: true,
  })
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

  addNewClient() {
    this.$store.commit('addModal', 'createClient')
  }
}
</script>
