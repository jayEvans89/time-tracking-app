<template>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'App'
})
export default class App extends Vue {

}
</script>
