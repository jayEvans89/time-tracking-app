
<template>
  <div class="row">
    <input-field
      :type="'text'"
      :name="'firstName'"
      :label="'First Name'"
      :placeholder="'Enter your first name'"
      :required="true"
      ref="firstName"
    ></input-field>
    <input-field
      :type="'text'"
      :name="'lastName'"
      :label="'Last Name'"
      :placeholder="'Enter your last name'"
      :required="true"
      ref="lastName"
    ></input-field>
  </div>
  <div class="row">
    <input-field
      :type="'text'"
      :name="'position'"
      :label="'Position'"
      :placeholder="'Please enter your position'"
      ref="position"
    ></input-field>
    <new-email-field ref="email"></new-email-field>
  </div>
  <div class="row">
    <input-field
      :type="'tel'"
      :name="'mobileNumber'"
      :label="'Mobile Number'"
      :placeholder="'Enter mobile number'"
      ref="mobile"
    ></input-field>
    <input-field
      :type="'tel'"
      :name="'officeNumber'"
      :label="'Office Number'"
      :placeholder="'Enter office number'"
      ref="office"
    ></input-field>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import InputField from '@/components/shared/form/Input.vue'
import NewEmailField from '@/components/shared/form/NewEmail.vue'
import FormValidation from '@/components/shared/form/ValidationMethod'
import { DefineComponent } from 'vue'

@Options({
  name: 'Client Info Form',
  components: {
    InputField,
    NewEmailField
  }
})
export default class ClientContactSection extends Vue {
  async validate() {
    const components = [
      this.$refs.firstName,
      this.$refs.lastName,
      this.$refs.position,
      this.$refs.email,
      this.$refs.mobile,
      this.$refs.office
    ] as Array<DefineComponent>

    const res = await FormValidation.validate(components)
    if (res.valid) {
      return {
        valid: true,
        page: 1,
        data: res.data,
        type: 'contact'
      }
    } else {
      return {
        valid: false,
        page: 1,
        data: res.data,
        type: 'contact'
      }
    }

  }
}
</script>

<style scoped lang="scss">
@use '@/styles/mixins/breakpoint' as breakpoint;

.row {
  display: flex;
  flex-direction: column;

  @include breakpoint.min(lg) {
    flex-direction: row;
  }

  > * {
    flex-basis: 100%;

    + * {
      @include breakpoint.min(lg) {
        margin-bottom: 30px;
        margin-left: 30px;
      }
    }
  }
}
</style>
