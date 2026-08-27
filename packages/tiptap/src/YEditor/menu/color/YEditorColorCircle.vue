<template>
  <button
    type="button"
    :class="['color-circle', isSmall ? 'color-circle-small' : 'color-circle-normal', isSelected ? 'color-circle-selected' : '']"
    :style="{ backgroundColor: color }"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { Color } from '../../types'

withDefaults(defineProps<{
  color?: Color | string
  isSmall?: boolean
  isSelected?: boolean
}>(), { color: 'transparent' })

defineEmits<{ click: [event: Event] }>()
</script>

<style scoped>
.color-circle {
  padding: 0;
  border-radius: 50%;
  border-style: solid;
  cursor: pointer;
}

.color-circle-small {
  height: 1rem;
  width: 1rem;
}

.color-circle-normal {
  height: 1.5rem;
  width: 1.5rem;
}

.color-circle-selected {
  border-width: 2px;
  border-color: var(--color-neutral-900);
}

.color-circle:not(.color-circle-selected) {
  border-width: 1px;
  border-color: var(--color-neutral-200);
}
</style>
