
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
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 700px;
  text-align: center;

  &__icon {
    margin-bottom: 80px;
    width: 245px;

    path {
      fill: var(--color-icon-highlight);
    }
  }

  h2 {
    margin-bottom: 40px;
  }

  &__button-container {
    margin: 0 auto;
    width: 70%;
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
