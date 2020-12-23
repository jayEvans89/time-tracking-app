<template>
  <section class="main">
    <sidebar></sidebar>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<style lang="scss">
.main {
  display: flex;
  width: 100%;
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
export default class Main extends Vue {
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
