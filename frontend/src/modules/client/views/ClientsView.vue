
<template>
  <div>
    <h1>Clients View</h1>
    <router-link to="/clients/1234">
      To Details
    </router-link>
    <router-link to="/clients">
      Back to List
    </router-link>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>

</script>
