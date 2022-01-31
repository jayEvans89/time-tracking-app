
<template>
  <nav-component />

  <img class="logo" alt="Vue logo" src="@/assets/logo.png">

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import NavComponent from '@/core/components/NavComponent.vue'
</script>

<style lang="scss">
@use '@styles/main';

.app {
  text-align: center;
  margin-top: 60px;
}

.logo {
  margin: 0 auto;
}
</style>
