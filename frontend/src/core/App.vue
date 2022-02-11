
<template>
  <main class="main">
    <sidebar v-if="isAuthed" />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from './store/authStore'
import Sidebar from '@/core/components/Sidebar.vue'

const authStore = useAuthStore()

const isAuthed = computed(() => {
  return authStore.token !== ''
})
</script>

<style lang="scss">
@use '@styles/main';
</style>
