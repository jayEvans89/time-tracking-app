
<template>
  <form @submit="validateForm" class="form">
    <div class="form__title-container">
      <h2 class="form__title">Create your account</h2>
      <transition name="fade">
        <p class="form__sub-title" v-show="page">{{ subtitle }}</p>
      </transition>
    </div>

    <transition-group name="fade">
      <company-details
        ref="companyDetails"
        :key="1"
        v-show="page === 1"
        @page-change="pageChange"
      ></company-details>
      <company-address
        ref="companyAddress"
        :key="2"
        v-show="page === 2"
        @page-change="pageChange"
      ></company-address>
      <user-details
        ref="userDetails"
        :key="3"
        v-show="page === 3"
        @page-change="pageChange"
        @create-account="validateForm"
      ></user-details>
    </transition-group>
  </form>
</template>

<style lang="scss">
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CompanyDetails from '@/components/sign-up/form-sections/CompanyDetails.vue'
import CompanyAddress from '@/components/sign-up/form-sections/CompanyAddress.vue'
import UserDetails from '@/components/sign-up/form-sections/UserDetails.vue'
import ValidationMethod from '../shared/form/ValidationMethod'
import userService from '@/services/user/userService'

@Component({
  components: {
    CompanyDetails,
    CompanyAddress,
    UserDetails
  }
})
export default class SignUpForm extends Vue {
  public page = 1

  get subtitle() {
    if (this.page === 1) {
      return 'Your company details'
    } else if (this.page === 2) {
      return 'Your company address'
    } else if (this.page === 3) {
      return 'User details'
    }
  }

  pageChange(page: number) {
    if (this.page !== page) {
      this.page = 0
      setTimeout(() => {
        this.page = page
      }, 300)
    }
  }

  async validateForm(e: Event) {
    console.log('validate form')
    e.preventDefault()
    const components = [
      this.$refs.companyDetails,
      this.$refs.companyAddress,
      this.$refs.userDetails
    ] as Array<Vue>

    const res = await ValidationMethod.validateParentComponent(components)
    console.log(res)
    if (res.valid) {
      const data = {
        user: res.data.user,
        company: {
          ...res.data.companyDetails as {},
          ...res.data.companyAddress as {}
        }
      }

      const signupRes = await userService.newUser(data)
      if (signupRes.status === 'success') {
        this.$router.push('/dashboard')
      }
    } else {
      this.pageChange(res.page)
    }
  }
}
</script>
