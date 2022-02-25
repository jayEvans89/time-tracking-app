
<template>
  <div>
    <transition name="fade">
      <div v-show="gettingData" class="spinner">
        <p>Getting clients...</p>
      </div>
    </transition>
    <transition name="fade">
      <no-data v-if="!hasClients && !gettingData" />
    </transition>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" v-if="!gettingData && hasClients" :client-names="clientNames" />
      </transition>
    </router-view>
    <create-client-modal @new-client-created="getClientList" />
  </div>
</template>

<script lang="ts" setup>
import NoData from '../components/NoData.vue'
import CreateClientModal from '../components/modals/CreateClientModal.vue'
import { computed, onMounted, ref } from 'vue'
import clientService from '@/services/client/clientService'
import { ClientNames } from '@/types/client/clientModel'

const gettingData = ref(true)
const clientNames = ref<ClientNames[]>([])

const hasClients = computed(() => {
  return clientNames.value.length > 0
})

onMounted(() => {
  getClientList()
})

async function getClientList() {
  gettingData.value = true
  try {
    const res = await clientService.getClientNames()
    clientNames.value = res.data
  } catch (error) {
    console.log(error)
  } finally {
    gettingData.value = false
  }
}
</script>
