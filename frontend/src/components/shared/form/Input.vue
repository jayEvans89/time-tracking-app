
<template>
  <div class="input-group">
    <label :class="{ 'label--error': error || responseError }" :for="name">{{ label }}</label>
    <input
      :class="{ 'input--error': error || responseError }"
      :type="type"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      v-model="value"
      :autocomplete="type + '-input'"
      @change="validate"
    />
    <div class="input__error-box" v-show="error || responseError">
      <p class="input__error-box-text">{{ errorText }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class InputField extends Vue {
  @Prop() type!: string
  @Prop() name!: string
  @Prop() label!: string
  @Prop() placeholder!: string
  @Prop({ default: false }) required!: boolean
  @Prop({ default: false }) responseError!: boolean
  @Prop({ default: '' }) responseMessage!: string

  public value = ''
  public error = false
  public errorMessage = ''
  public validationResponse = {
    valid: false,
    type: this.name,
    value: this.value
  }

  get errorText() {
    if (this.responseMessage !== '') {
      return this.responseMessage
    } else {
      return this.errorMessage
    }
  }

  validate() {
    this.$emit('clear-error', this.type)
    this.error = false

    if (this.required) {
      if (this.type === 'email') {
        return this.validateEmail()
      } else if (this.type === 'tel') {
        return this.telephoneValidation()
      } else {
        return this.defaultValidation()
      }
    } else {
      this.error = false
      this.errorMessage = ''
      const response = this.validationResponse
      response.valid = true
      return response
    }
  }

  validateEmail() {
    if (this.value !== '') {
      if (!this.emailValidation()) {
        this.error = true
        this.errorMessage = 'Please enter a valid email address'
        const response = this.validationResponse
        response.valid = false
        return response
      } else {
        this.error = false
        this.errorMessage = ''
        const response = this.validationResponse
        response.valid = true
        response.value = this.value
        return response
      }
    } else {
      this.error = true
      this.errorMessage = 'Please enter your email address'
      const response = this.validationResponse
      response.valid = false
      return response
    }
  }

  emailValidation() {
    const re = /\S+@\S+\.\S+/
    return re.test(this.value)
  }

  telephoneValidation() {
    if (this.value !== '') {
      this.error = false
      this.errorMessage = ''
      this.validationResponse.valid = true
      this.validationResponse.value = this.value
      return this.validationResponse
    } else {
      this.error = true
      this.errorMessage = 'Please enter a contact number'
      this.validationResponse.valid = false
      return this.validationResponse
    }
  }

  defaultValidation() {
    if (this.value !== '') {
      this.error = false
      this.errorMessage = ''
      const response = this.validationResponse
      response.valid = true
      response.value = this.value
      return response
    } else {
      this.error = true
      this.errorMessage = 'Please enter your ' + this.label.toLowerCase()
      const response = this.validationResponse
      response.valid = false
      return response
    }
  }
}
</script>

<style lang="scss">

label {
  display: block;
  margin-bottom: 15px;
  text-transform: capitalize;
}

input {
  appearance: none;
  border-radius: 6px;
  padding: 10px;
  background: transparent !important;
  border: 1px solid var(--color-border-primary);
  outline: 0;
  color: var(--color-text-primary);
  width: 100%;
  transition: 250ms ease-in-out;

  &::placeholder {
    color: var(--color-text-placeholder);
  }

  &:focus {
    outline: 0;
    border-color: var(--color-border-active);
    caret-color: var(--color-secondary);
    background: var(--color-background-tertiary);
  }

  &:hover {
    border-color: var(--color-border-active);
  }
}

.input-group {
  margin-bottom: 30px;

  &:last-of-type {
    margin-bottom: 50px;
  }
}

.label {
  &--error {
    color: var(--color-text-error);
  }
}

.input {
  &--error {
    border-color: var(--color-border-error);
  }

  &__error-box {
    background: var(--color-background-error);
    border-radius: 6px;
    padding: 15px;
    margin-top: 15px;
  }

  &__error-box-text {
    color: var(--color-text-error);
  }
}
</style>
