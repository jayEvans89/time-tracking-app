
<template>
  <div class="input-group">
    <label :class="{ 'label--error': hasError }" :for="name" :data-test-id="`${testId}Label`">{{ label }}</label>
    <input
      :id="name"
      :value="modelValue"
      :data-test-id="`${testId}Input`"
      :class="{ 'input--error': hasError }"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="emitValue"
    >
    <div v-show="hasError" class="input__error-box" :data-test-id="`${testId}Error`">
      <div class="input__error-box-text">
        <p v-for="(error, index) in errorMessages" :key="error.$uid" :data-test-id="`${testId}ErrorText-${index}`">
          {{ error.$message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ErrorObject } from '@vuelidate/core'

interface Props {
  hasError: boolean;
  label: string;
  name: string;
  testId: string;
  type: string;
  errorMessages?: ErrorObject[];
  modelValue: string;
  placeholder?: string;
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function emitValue(event: Event) {
  if (event) {
    const element = event.target as HTMLInputElement
    emit('update:modelValue', element.value)
  }
}
</script>

<style lang="scss" scoped>

label {
  display: block;
  margin-bottom: 15px;
  text-transform: capitalize;
  text-align: left;
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
  margin-bottom: 15px;
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
