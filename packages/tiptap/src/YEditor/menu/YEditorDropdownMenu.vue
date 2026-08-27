<template>
  <div
    ref="dropdownMenuRef"
    class="dropdown-menu"
    :style="{
      maxHeight: `${maxHeight}px`,
      overflowY: hasScrollbar ? 'auto' : 'visible',
      width: width ? 'max-content' : undefined,
    }"
    @click="isSelectionClicked"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import type { DropdownInterface } from '../types'
import { dropdownKey } from '../extensions'

withDefaults(defineProps<{
  maxHeight?: number
  width?: number | null
}>(), {
  maxHeight: 250,
  width: null,
})

const { close, isSelectionClicked, hasScrollbar } = inject(dropdownKey) as DropdownInterface
const dropdownMenuRef = ref<HTMLElement | null>(null)

function onMouseUp(event: Event) {
  const el = dropdownMenuRef.value
  const target = event.target as HTMLElement
  if (!el || target === el || event.composedPath().includes(el)) return
  close(event)
}

onMounted(() => window.addEventListener('mouseup', onMouseUp))
onUnmounted(() => window.removeEventListener('mouseup', onMouseUp))
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.3125rem;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  z-index: 50;
  padding: 0.625rem;
  overflow-x: hidden;
}
</style>
