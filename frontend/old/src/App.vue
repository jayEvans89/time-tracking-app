<template>
  <main>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class App extends Vue {}
</script>
