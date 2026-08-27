<template>
  <div :class="['menu-group', isVertical ? 'menu-group-vertical' : 'menu-group-horizontal', isSmallGap ? 'menu-group-tight' : '']">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Orientation } from '../types'

const props = withDefaults(defineProps<{
  orientation?: string
  isSmallGap?: boolean
}>(), {
  orientation: Orientation.Horizontal,
  isSmallGap: false,
})

const isVertical = computed(() => props.orientation === Orientation.Vertical)
</script>

<style scoped>
.menu-group {
  display: flex;
}

.menu-group-vertical {
  flex-direction: column;
}

.menu-group-horizontal {
  margin: 0 0.75rem;
}

.menu-group-tight {
  gap: 0.125rem;
}

.menu-group:not(.menu-group-tight) {
  gap: 0.625rem;
}
</style>
