<template>
  <div class="container">
    <div id="app">
      <div class="nav" id="nav">
        <router-link v-if="!isAuthed" to="/login">Login</router-link> |
        <router-link v-if="isAuthed" to="/">Home</router-link> |
        <router-link v-if="isAuthed" to="/about">About</router-link>
        <p v-if="isAuthed" @click="logout">Logout</p>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@use 'styles/global' as *;

.nav {
  margin-bottom: 50px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginService from './services/login/login'

@Component({})
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

  async logout() {
    const response = await LoginService.logout()
    if (response.status === 'Success') {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>
