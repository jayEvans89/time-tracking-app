
<template>
  <div class="main__content">
    <transition name="fade">
      <no-data v-if="!hasClients" />
    </transition>
    <router-view v-if="hasClients" v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive include="ClientList" max="2">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <create-client-modal />
  </div>
</template>

<script lang="ts" setup>
import NoData from '../components/NoData.vue'
import CreateClientModal from '../components/modals/CreateClientModal.vue'
const hasClients = true
</script>
