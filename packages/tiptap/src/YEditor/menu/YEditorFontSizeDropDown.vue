<template>
  <YEditorDropDown ref="dropdownRef">
    <span class="dropdown-label">{{ currentLabel }}</span>
    <template #dropdown="{ isOpen }">
      <YEditorDropdownMenu v-if="isOpen" :has-scrollbar="false">
        <YEditorMenuGroup orientation="vertical" :is-small-gap="true">
          <YEditorButton
            v-for="(label, size) in FONT_SIZE_LABELS"
            :key="size"
            class="size-option"
            :is-active="editor.isActive('font-size', { size })"
            @click="editor.chain().focus().toggleFontSize({ size }).run()"
          >
            {{ label }}
          </YEditorButton>
        </YEditorMenuGroup>
      </YEditorDropdownMenu>
    </template>
  </YEditorDropDown>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { useDropdown } from '../composables/use-dropdown'
import { FONT_SIZE_LABELS, type Size } from '../extensions'
import YEditorButton from '../YEditorButton.vue'
import YEditorDropDown from './YEditorDropDown.vue'
import YEditorDropdownMenu from './YEditorDropdownMenu.vue'
import YEditorMenuGroup from './YEditorMenuGroup.vue'

const props = defineProps<{ editor: Editor }>()

const dropdownRef = ref<EventTarget | null>(null)
useDropdown({ dropdownRef, hasScrollbar: false })

const currentLabel = computed(() => {
  const active = Object.keys(FONT_SIZE_LABELS).find((size) =>
    props.editor.isActive('font-size', { size })
  ) as Size | undefined
  return active ? FONT_SIZE_LABELS[active] : 'M'
})
</script>

<style scoped>
.dropdown-label {
  font-weight: 500;
  color: var(--color-neutral-700);
  font-size: 0.875rem;
}

.size-option {
  display: flex;
  padding: 0.4375rem;
  text-align: left;
}
</style>
