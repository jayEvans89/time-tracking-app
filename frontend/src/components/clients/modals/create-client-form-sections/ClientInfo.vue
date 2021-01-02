
<template>
  <div class="row">
    <input-field
      :type="'text'"
      :name="'name'"
      :label="'Name'"
      :placeholder="'Enter clients name'"
      :required="true"
      ref="clientName"
    ></input-field>
    <input-field
      :type="'text'"
      :name="'address1'"
      :label="'Address 1'"
      :placeholder="'Enter address line 1'"
      :required="true"
      ref="address1"
    ></input-field>
  </div>
  <div class="row">
    <input-field
      :type="'text'"
      :name="'address2'"
      :label="'Address 2'"
      :placeholder="'Enter address line 2'"
      ref="address2"
    ></input-field>
    <input-field
      :type="'text'"
      :name="'county'"
      :label="'County/State'"
      :placeholder="'Enter county/state'"
      :required="true"
      ref="county"
    ></input-field>
  </div>
  <div class="row">
    <input-field
      :type="'text'"
      :name="'town'"
      :label="'Town/City'"
      :placeholder="'Enter town/city'"
      :required="true"
      ref="town"
    ></input-field>
    <input-field
      :type="'text'"
      :name="'postcode'"
      :label="'Postcode/Zipcode'"
      :placeholder="'Enter postcode/zipcode'"
      :required="true"
      ref="postcode"
    ></input-field>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import InputField from '@/components/shared/form/Input.vue'
import FormValidation from '@/components/shared/form/ValidationMethod'
import { DefineComponent } from 'vue'

@Options({
  name: 'Client Info Form',
  components: {
    InputField
  }
})
export default class ClientInfoSection extends Vue {
  async validate() {
    const components = [
      this.$refs.clientName,
      this.$refs.address1,
      this.$refs.address2,
      this.$refs.county,
      this.$refs.town,
      this.$refs.postcode
    ] as Array<DefineComponent>

    return await FormValidation.validate(components)
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
