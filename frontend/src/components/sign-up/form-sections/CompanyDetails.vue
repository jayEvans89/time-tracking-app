
<template>
  <div>
    <input-field
      type="text"
      name="name"
      label="Company Name"
      ref="companyName"
      :required="true"
    ></input-field>
    <input-field
      type="tel"
      name="contact_number"
      label="Contact Number"
      ref="contactNumber"
      :required="true"
    ></input-field>
    <input-field
      type="email"
      name="contact_email"
      label="Company Email"
      ref="companyEmail"
      :required="true"
    ></input-field>
    <input-field
      type="text"
      name="business_type"
      label="Type of Business"
      ref="businessType"
      :required="true"
    ></input-field>
    <button class="btn btn--primary" @click="nextPage">Next</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import InputField from '@/components/shared/form/Input.vue'
import FormValidation from '@/components/shared/form/ValidationMethod'
import { DefineComponent } from 'vue'

@Options({
  components: {
    InputField
  }
})
export default class CompanyDetails extends Vue {
  async validate(parent = false) {
    const components = [
      this.$refs.companyName,
      this.$refs.contactNumber,
      this.$refs.companyEmail,
      this.$refs.businessType
    ] as Array<DefineComponent>

    const response = await FormValidation.validate(components)

    if (!parent) {
      return response
    } else {
      return {
        valid: response.valid,
        page: 1,
        data: response.data,
        type: 'companyDetails'
      }
    }
  }

  async nextPage(e: Event) {
    e.preventDefault()
    const res = await this.validate()
    if (res.valid) {
      this.$emit('page-change', 2)
    }
  }
}
</script>
