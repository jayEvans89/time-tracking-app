
<template>
  <div class="input-group">
    <label :class="{ 'label--error': hasError }" :for="name" :data-test-id="`${testId}Label`">{{ label }}</label>
    <input
      :id="name"
      :value="modelValue"
      :data-test-id="testId"
      :class="{ 'input--error': hasError }"
      :type="inputType"
      :name="name"
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
  inputType: string;
  errorMessages: ErrorObject[];
  modelValue: string;
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
