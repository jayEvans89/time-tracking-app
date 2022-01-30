
<template>
  <div class="input-group">
    <label :class="{ 'label--error': error }" for="email">Email</label>
    <input
      :class="{ 'input--error': error }"
      type="email"
      id="email"
      name="email"
      placeholder="Your email address"
      v-model="value"
      :autocomplete="'email-input'"
      @change="validate"
    />
    <div class="input__error-box" v-show="error">
      <p class="input__error-box-text" v-show="!alreadyExsists">
        {{ errorMessage }}
      </p>
      <p class="input__error-box-text" v-show="alreadyExsists">
        A user with that email address alreadys exsists. Please click
        <router-link to="/login">here to login</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import userService from '@/services/user/userService'

@Options({})
export default class NewEmailField extends Vue {
  public value = ''
  public error = false
  public errorMessage = ''
  public alreadyExsists = false
  public emailOk = false
  public validationResponse = {
    valid: false,
    type: 'email',
    value: this.value
  }

  validate() {
    this.error = false
    return this.validateEmail()
  }

  async validateEmail() {
    if (this.value !== '') {
      if (!this.emailValidation()) {
        this.error = true
        this.errorMessage = 'Please enter a valid email address'
        const response = this.validationResponse
        response.valid = false
        return response
      } else {
        if (await this.checkUserExists()) {
          this.error = false
          this.errorMessage = ''
          const response = this.validationResponse
          response.valid = true
          response.value = this.value
          return response
        } else {
          this.error = true
          this.alreadyExsists = true
        }
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

  async checkUserExists() {
    if (!this.emailOk) {
      const res = await userService.checkExsists(this.value)
      if (res.status === 'success') {
        this.emailOk = true
        return true
      } else {
        this.emailOk = false
        return false
      }
    } else {
      return true
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

    a {
      color: var(--color-text-error);
      font-weight: 900;
    }
  }
}
</style>
