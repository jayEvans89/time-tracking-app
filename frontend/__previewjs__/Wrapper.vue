<template>
  <slot />
</template>

<script lang="ts" setup>
import { createPinia } from 'pinia'
import { getCurrentInstance } from 'vue'

import router from '../src/core/router'

const pinia = createPinia()
const { appContext } = getCurrentInstance()
appContext.app
  .use(pinia)
  .use(router)
</script>

<style lang="scss">
@use '@styles/main';

</style>
