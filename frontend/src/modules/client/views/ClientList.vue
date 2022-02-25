
<template>
  <div>
    <h1>
      Client List
    </h1>
    <div v-show="clientNames.length > 0">
      <p v-for="client in clientNames" :key="client.id">
        {{ client.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ClientNames } from '@/types/client/clientModel'
interface Props {
  clientNames: ClientNames[]
}

defineProps<Props>()
</script>

<script lang="ts">
export default {
  name: 'ClientList'
}
</script>
