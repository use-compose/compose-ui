<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div class="input-field">
      <input
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        class="input-el"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  type?: string
  label?: string
}>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const inputRef = ref<HTMLInputElement | null>(null)
defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.input-label {
  font-weight: 500;
  color: var(--color-neutral-900);
  font-size: 0.875rem;
}

.input-field {
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
  border: 1px solid var(--color-neutral-300);
  padding: 0.625rem;
}

.input-el {
  background: white;
  width: 100%;
  color: var(--color-neutral-900);
  border: none;
  padding: 0;
  outline: none;
}

.input-el::placeholder {
  color: var(--color-neutral-300);
}
</style>
