<template>
  <div class="dropdown-wrapper">
    <YEditorButton
      v-if="hasDropdownStyling"
      ref="dropdownTriggerRef"
      data-component="dropdownTriggerRef"
      class="dropdown-trigger"
      :is-active="isOpen"
      @click="toggle"
    >
      <template #dropdown>
        <slot></slot>
      </template>
    </YEditorButton>

    <slot
      v-else
      name="switch"
      :toggle-handler="toggle"
      :is-open="isOpen"
    ></slot>

    <slot name="dropdown" :is-open="isOpen"></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { DropdownInterface } from '../types'
import { dropdownKey } from '../extensions'
import YEditorButton from '../YEditorButton.vue'

withDefaults(defineProps<{
  hasDropdownStyling?: boolean
}>(), {
  hasDropdownStyling: true,
})

const { isOpen, toggle } = inject(dropdownKey) as DropdownInterface
</script>

<style scoped>
.dropdown-wrapper {
  position: relative;
  display: flex;
}

.dropdown-trigger {
  padding: 0.125rem 0.3125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 0.3125rem;
}
</style>
