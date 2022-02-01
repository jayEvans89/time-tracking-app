
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
          <transition name="fade">
            <p v-show="page" class="form__sub-title">
              {{ subtitle }}
            </p>
          </transition>
        </div>
        <transition-group name="fade">
          <company-details v-show="page === 1" :key="1" @save-company-details="saveCompanyDetails" />
        </transition-group>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import CompanyDetails from './components/sign-up-form-sections/CompanyDetails.vue'

const page = ref(1)
const signUpData = reactive({
  companyDetails: {}
})

const subtitle = computed(() => {
  if (page.value === 1) {
    return 'Your company details'
  } else if (page.value === 2) {
    return 'Your company address'
  } else if (page.value === 3) {
    return 'User details'
  } else {
    return ''
  }
})

function saveCompanyDetails(data: any) {
  signUpData.companyDetails = data
  movePageForward()
}

function movePageForward() {
  page.value++
}

function movePageBackward() {
  page.value--
}

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
