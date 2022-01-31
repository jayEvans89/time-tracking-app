
<template>
  <h1 data-test-id="title">
    Child Component {{ title }}
  </h1>
  <p data-test-id="testButton" @click="testMethod">
    {{ optional }}
  </p>
  <p data-test-id="count">
    {{ count }}
  </p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  title: string;
  optional?: string
}

withDefaults(defineProps<Props>(), {
  optional: 'defaultOptional'
})

const count = ref(0)

const testMethod = () => {
  count.value++
}

</script>
