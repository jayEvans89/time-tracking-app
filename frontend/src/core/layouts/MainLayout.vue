
<template>
  <sidebar v-if="isAuthed" />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/core/store/authStore'
import Sidebar from '@/core/components/Sidebar.vue'

const authStore = useAuthStore()

const isAuthed = computed(() => {
  return authStore.token !== ''
})
</script>
