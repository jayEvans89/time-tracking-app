<template>
  <main>
    <sidebar></sidebar>
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sidebar from '@/components/shared/sidebar/Sidebar.vue'

@Component({
  components: {
    Sidebar
  }
})
export default class App extends Vue {
  mounted() {
    console.log('mounted')
  }

  get isAuthed() {
    if (this.$store.state.token) {
      return true
    } else {
      return false
    }
  }
}
</script>
