
<template>
  <section>
    <div class="input-group">
      <label :class="{ 'label--error': error }" for="password">Password</label>
      <input
        :class="{ 'input--error': error}"
        type="password"
        name="password"
        id="password"
        v-model="password"
        placeholder="Enter password"
        @change="checkPassword"
      />
      <div class="input__error-box" v-show="error">
        <p class="input__error-box-text">{{ errorMessage }}</p>
      </div>
    </div>
    <div class="input-group">
      <label :class="{ 'label--error': confirmError }" for="confirm">Confirm Password</label>
      <input
        :class="{ 'input--error': confirmError}"
        type="password"
        name="confirm"
        id="confirm"
        v-model="confirm"
        placeholder="Re-enter password"
        @change="confirmPassword"
      />
      <div class="input__error-box" v-show="confirmError">
        <p class="input__error-box-text">{{ confirmErrorMessage }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class NewPassword extends Vue {
  public password = ''
  public error = false
  public errorMessage = ''
  public confirm = ''
  public confirmError = false
  public confirmErrorMessage = ''
  public validationResponse = {
    valid: false,
    type: 'password',
    value: this.confirm
  }

  checkPassword() {
    if (this.password === '') {
      this.error = true
      this.errorMessage = 'Please enter a password'
      return false
    } else {
      if (this.password.length < 8) {
        this.error = true
        this.errorMessage = 'Please enter a password of atleast 8 characters'
        return false
      } else {
        this.error = false
        this.errorMessage = ''
        return true
      }
    }
  }

  confirmPassword() {
    if (this.confirm === '') {
      this.confirmError = true
      this.confirmErrorMessage = 'Please confirm your password'
      return false
    } else {
      if (this.confirm !== this.password) {
        this.confirmError = true
        this.confirmErrorMessage = 'The password must match'
        return false
      } else {
        this.confirmError = false
        this.confirmErrorMessage = ''
        return true
      }
    }
  }

  validate() {
    const password = this.checkPassword()
    const confirm = this.confirmPassword()

    if (password && confirm) {
      this.validationResponse.valid = true
      this.validationResponse.value = this.confirm
      return this.validationResponse
    } else {
      this.validationResponse.valid = false
      return this.validationResponse
    }
  }
}
</script>
