
<template>
  <div class="input-group">
    <label :for="name">{{ name }}</label>
    <input
      :type="type"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      v-model="value"
    />
    <p v-show="error">Error</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class InputField extends Vue {
  @Prop() type!: string
  @Prop() name!: string
  @Prop() placeholder!: string
  @Prop({ default: false }) required!: boolean

  public value = ''
  public error = false
  public validationResponse = {
    valid: false,
    type: this.type,
    value: this.value
  }

  validate() {
    if (this.required) {
      if (this.type === 'email') {

      } else if (this.value !== '') {
        const response = this.validationResponse
        response.valid = true
        return response
      } else {
        this.error = true
        return {
          valid: false
        }
      }
    } else {
      this.error = true
      return {
        valid: false
      }
    }
  }
}
</script>
