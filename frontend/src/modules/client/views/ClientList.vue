
<template>
  <div>
    <h1 @click="click">
      Client List {{ test }}
    </h1>
    <router-link to="/clients/1234">
      Details
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emits = defineEmits(['getting-data', 'got-data'])

const test = ref(false)

function click() {
  test.value = !test.value
}
</script>

<script lang="ts">
export default {
  name: 'ClientList'
}
</script>
