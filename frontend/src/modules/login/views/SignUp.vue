
<template>
  <section class="sign-up-page__grid">
    <div class="sign-up-page__col sign-up-page__col--info">
      <h1>Text side</h1>
    </div>
    <div class="sign-up-page__col">
      <form class="form" @submit.prevent>
        <div class="form__title-container">
          <h2 class="form__title">
            Create your account
          </h2>
          <p class="form__sub-title">
            Please enter your details
          </p>
        </div>
        <new-user />
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import NewUser from '../components/newUser/NewUser.vue'
</script>

<style lang="scss" scoped>
@use '@styles/tools/breakpoint';

.sign-up-page {
  &__grid {
    display: flex;
    width: 100%;
    min-height: 100vh;
  }

  &__col {
    flex: 1;

    &--info {
      flex: 0 0 50%;
      background: var(--electric-indigo);

      @include breakpoint.min(lg) {
        flex: 0 0 40%;
      }
    }
  }
}

.form {
  max-width: 450px;
  margin: 0 auto;

  &__title-container {
    margin-top: 120px;
    margin-bottom: 60px;
    text-align: center;
  }

  &__title {
    margin-bottom: 15px;
  }
}
</style>
