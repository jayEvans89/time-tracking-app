
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
import { Options, Vue, prop } from 'vue-class-component'

class Props {
  type!: string;
  name!: string
  label!: string
  placeholder!: string
  required = prop<boolean>({
    default: false
  })

  responseError = prop({
    type: Boolean,
    default: false
  })

  responseMessage = prop({
    type: String,
    default: ''
  })
}

@Options({})
export default class InputField extends Vue.with(Props) {
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

<style scoped lang="scss">

label {
  display: block;
  margin-bottom: 15px;
  text-transform: capitalize;
}

input {
  appearance: none;
  background: transparent !important;
  border: 1px solid var(--color-border-primary);
  border-radius: 6px;
  color: var(--color-text-primary);
  outline: 0;
  padding: 10px;
  transition: 250ms ease-in-out;
  width: 100%;

  &::placeholder {
    color: var(--color-text-placeholder);
  }

  &:focus {
    background: var(--color-background-tertiary);
    border-color: var(--color-border-active);
    caret-color: var(--color-secondary);
    outline: 0;
  }

  &:hover {
    border-color: var(--color-border-active);
  }
}

.input-group {
  margin-bottom: 30px;
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
    margin-top: 15px;
    padding: 15px;
  }

  &__error-box-text {
    color: var(--color-text-error);
  }
}
</style>
