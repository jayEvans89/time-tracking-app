
<template>
  <div class="row">
    <input-field
      :type="'text'"
      :name="'name'"
      :label="'Name'"
      :placholder="'Enter clients name'"
      :required="true"
      ref="clientName"
    ></input-field>
    <input-field
      :type="'text'"
      :name="'address1'"
      :label="'Address 1'"
      :placholder="'Enter address line 1'"
      :required="true"
      ref="address1"
    ></input-field>
  </div>
  <div class="row">
    <input-field
      :type="'text'"
      :name="'address2'"
      :label="'Address 2'"
      ref="address2"
    ></input-field>
    <input-field
      :type="'text'"
      :name="'county'"
      :label="'County/State'"
      :placholder="'Enter county/state'"
      :required="true"
      ref="county"
    ></input-field>
  </div>
  <div class="row">
    <input-field
      :type="'text'"
      :name="'town'"
      :label="'Town/City'"
      :placholder="'Enter town/city'"
      :required="true"
      ref="town"
    ></input-field>
    <input-field
      :type="'text'"
      :name="'postcode'"
      :label="'Postcode/Zipcode'"
      :placholder="'Enter postcode/zipcode'"
      :required="true"
      ref="postcode"
    ></input-field>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import InputField from '@/components/shared/form/Input.vue'

@Options({
  name: 'Client Info Form',
  components: {
    InputField
  }
})
export default class ClientContactSection extends Vue { }
</script>

<style scoped lang="scss">
@use "@/styles/mixins/breakpoint" as breakpoint;

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
        margin-left: 30px;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
