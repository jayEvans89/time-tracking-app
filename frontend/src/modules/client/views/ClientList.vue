
<template>
  <div v-show="hasClients">
    <h1>
      Client List
    </h1>
    <div v-show="clientNames.length > 0" class="client-grid">
      <div v-for="client in clientNames" :key="client._id" class="client-card">
        <p class="client-card__name">
          {{ client.name }}
        </p>
        <p>
          Total Projects: 0
        </p>
        <p>
          Total Time: 0:00
        </p>
        <router-link :to="`/clients/${client._id}`">
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ClientNames } from '@/types/client/clientModel'
import { computed } from 'vue'
interface Props {
  clientNames: ClientNames[]
}

const props = defineProps<Props>()

const hasClients = computed(() => {
  return props.clientNames.length > 0
})

</script>

<script lang="ts">
export default {
  name: 'ClientList'
}
</script>

<style lang="scss" scoped>
.client-grid {
  display: grid;
  grid-template: repeat(4, 1fr);
}

.client-card {
  border-radius: 5px;
  background: var(--color-background-tertiary);
  padding: 20px 25px;

  &__name {
    text-transform: capitalize;
  }
}
</style>
