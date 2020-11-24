
<template>
  <form v-on:submit.prevent="login">
    <div>
      <label>Email</label>
      <input type="email" v-model="email" placeholder="Enter email">
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="password" placeholder="Enter email">
    </div>

    <button>Submit</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginService from '../services/login/login'

@Component({})
export default class Login extends Vue {
  public email = ''
  public password = ''

  async login() {
    const data = {
      email: this.email,
      password: this.password
    }

    await LoginService.login(data).then(res => {
      console.log('success: ', res.message, res.data)
      this.setToken(res.token)
    }).catch(err => {
      console.log('error: ', err.response.data.message)
    })
  }

  setToken(token: any) {
    this.$store.commit('setToken', token)
    this.$router.push('/')
  }
}
</script>
