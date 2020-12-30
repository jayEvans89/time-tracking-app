
<template>
  <section class="no-data">
    <customer-icon class-modifier="no-data__icon"></customer-icon>
    <h2>You currently dont have any clients</h2>
    <h2>Click below to get started</h2>
    <div class="no-data__button-container">
      <button class="btn btn--primary" @click="createClient">Get Started</button>
    </div>
  </section>
</template>

<style lang="scss">
.no-data {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;

  &__icon {
    width: 245px;
    margin-bottom: 80px;

    path {
      fill: var(--color-icon-highlight);
    }
  }

  h2 {
    margin-bottom: 40px;
  }

  &__button-container {
    width: 70%;
    margin: 0 auto;
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CustomerIcon from '@/components/shared/icons/CustomerIcon.vue'

@Options({
  components: {
    CustomerIcon
  },
  name: 'Clients No Data'
})
export default class NoClients extends Vue {
  createClient() {
    this.$store.commit('addModal', 'createClient')
  }
}
</script>
