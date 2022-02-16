
<template>
  <section class="no-data">
    <customer-icon class-modifier="no-data__icon" />
    <div class="no-data__content">
      <h2>You currently don't have any clients</h2>
      <h2>Click below to get started</h2>
      <div class="no-data__button-container">
        <button class="btn btn--primary" data-bs-toggle="modal" data-bs-target="#createClient">
          Get Started
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import CustomerIcon from '@/modules/client/components/icons/CustomerIcon.vue'
</script>

<style lang="scss">
.no-data {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;

  &__content {
    max-width: 700px;
  }

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
