
<template>
  <section>
    <h1>Client Details</h1>
    <p>Id: {{ id }}</p>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  /** The clients id */
  id: string
}
defineProps<Props>()
</script>
