
<template>
  <h1 data-test-id="title">
    {{ computedVar }}
  </h1>

  <child-component
    title="child component"
    optional="optional Prop"
  />
</template>

<script lang="ts">
import ChildComponent from '@/modules/home/components/ChildComponent.vue'
import { defineComponent, computed } from 'vue'
export default defineComponent({
  components: {
    ChildComponent
  },
  props: {
    test: {
      type: String,
      default: 'Home parent'
    }
  },
  setup(prop) {
    const computedVar = computed(() => {
      return `${prop.test} Home Page Title`
    })

    return {
      computedVar
    }
  }
})
</script>
