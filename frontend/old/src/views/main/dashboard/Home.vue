<template>
  <div class="home">
    <h1>Home page</h1>
    <img alt="Vue logo" src="@/assets/logo.png">
    <button class="btn btn--primary" @click="test">Test requset</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import http from '@/services/http'

@Options({})
export default class Home extends Vue {
  test() {
    http({
      url: 'http://localhost:3001/api/user/getAll',
      method: 'get',
      withCredentials: true
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>
