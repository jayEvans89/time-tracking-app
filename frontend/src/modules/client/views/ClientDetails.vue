
<template>
  <div>
    <section v-if="gotData">
      <h1>Client Details</h1>
      <p>{{ clientDetails.name }}</p>
      <p>Id: {{ id }}</p>
    </section>
  </div>
</template>

<script lang="ts" setup>
import clientService from '@/services/client/clientService'
import { Client } from '@/types/client/clientModel'
import { onMounted, ref } from 'vue'

interface Props {
  /** The clients id */
  id: string
}
const props = defineProps<Props>()

const clientDetails = ref<Client>({} as Client)
const gotData = ref(false)

onMounted(async () => {
  // try {
  //   const res = await clientService.getClient(props.id)
  //   if (res.status !== 'success') {
  //     return
  //   }

  //   clientDetails.value = res.data
  //   gotData.value = true
  // } catch (error) {
  //   console.log(error)
  // }
})
</script>
