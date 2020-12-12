<template>
  <div class="container">
    <div class="nav" id="nav" v-if="isAuthed">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <p v-if="isAuthed" @click="logout">Logout</p>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">

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
