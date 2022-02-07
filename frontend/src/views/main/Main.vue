<template>
  <section class="main">
    <sidebar></sidebar>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss">
.main {
  display: flex;
  width: 100%;
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Sidebar from '@/components/shared/sidebar/Sidebar.vue'

@Options({
  components: {
    Sidebar
  },
  name: 'Main'
})
export default class Main extends Vue {
  get isAuthed() {
    if (this.$store.state.token) {
      return true
    } else {
      return false
    }
  }
}
</script>
