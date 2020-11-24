<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!isAuthed" to="/login">Login</router-link> |
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

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
