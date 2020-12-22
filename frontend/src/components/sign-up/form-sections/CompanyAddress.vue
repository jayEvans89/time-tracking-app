
<template>
  <div>
    <input-field
      type="text"
      name="address"
      label="Address"
      ref="address"
      :required="true"
    ></input-field>
    <input-field
      type="text"
      name="town_city"
      label="Town/City"
      ref="townCity"
      :required="true"
    ></input-field>
    <input-field
      type="text"
      name="county"
      label="County"
      ref="county"
      :required="true"
    ></input-field>
    <input-field
      type="text"
      name="postcode"
      label="Postcode"
      ref="postcode"
      :required="true"
    ></input-field>
    <div class="button-container">
      <button class="btn btn--secondary" @click="back">Back</button>
      <button class="btn btn--primary" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InputField from '@/components/shared/form/Input.vue'
import FormValidation from '@/components/shared/form/ValidationMethod'

@Component({
  components: {
    InputField
  }
})
export default class CompanyAddress extends Vue {
  async validate(parent = false) {
    console.log('validate address')
    const components = [
      this.$refs.address,
      this.$refs.townCity,
      this.$refs.county,
      this.$refs.postcode
    ] as Array<Vue>

    const response = await FormValidation.validate(components)

    if (!parent) {
      return response
    } else {
      return {
        valid: response.valid,
        page: 2,
        data: response.data,
        type: 'companyAddress'
      }
    }
  }

  back(e: Event) {
    e.preventDefault()
    this.$emit('page-change', 1)
  }

  async nextPage(e: Event) {
    e.preventDefault()
    const res = await this.validate()
    if (res.valid) {
      this.$emit('page-change', 3)
    }
  }
}
</script>
