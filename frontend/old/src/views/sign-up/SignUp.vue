
<template>
  <section class="sign-up-page__grid">
    <div class="sign-up-page__col sign-up-page__col--info">
      <info-side></info-side>
    </div>
    <div class="sign-up-page__col">
      <sign-up-form></sign-up-form>
    </div>
  </section>
</template>

<style lang="scss">
.sign-up-page {
  &__grid {
    display: flex;
    width: 100%;
  }

  &__col {
    flex: 0 0 50%;

    &--info {
      background: var(--electric-indigo);
    }
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import InfoSide from '@/components/sign-up/InfoSide.vue'
import SignUpForm from '@/components/sign-up/Form.vue'

@Options({
  components: {
    InfoSide,
    SignUpForm
  }
})
export default class SignUp extends Vue {}
</script>
