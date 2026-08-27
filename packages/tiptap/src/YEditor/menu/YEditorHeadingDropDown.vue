<template>
  <YEditorDropDown ref="dropdownRef">
    <span class="dropdown-label">{{ selectedHeading }}</span>
    <template #dropdown="{ isOpen }">
      <YEditorDropdownMenu v-if="isOpen" :has-scrollbar="false">
        <YEditorMenuGroup orientation="vertical">
          <YEditorButton class="heading-option" :is-active="editor.isActive('paragraph')" @click="editor.chain().focus().setParagraph().run()">
            Paragraph
          </YEditorButton>
          <YEditorButton class="heading-option" :is-active="editor.isActive('heading', { level: 2 })" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            Headline 1
          </YEditorButton>
          <YEditorButton class="heading-option" :is-active="editor.isActive('heading', { level: 3 })" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            Headline 2
          </YEditorButton>
          <YEditorButton class="heading-option" :is-active="editor.isActive('heading', { level: 5 })" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
            Headline 3
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
import YEditorButton from '../YEditorButton.vue'
import YEditorDropDown from './YEditorDropDown.vue'
import YEditorDropdownMenu from './YEditorDropdownMenu.vue'
import YEditorMenuGroup from './YEditorMenuGroup.vue'

const props = defineProps<{ editor: Editor }>()

const dropdownRef = ref<EventTarget | null>(null)
useDropdown({ dropdownRef })

const selectedHeading = computed(() => {
  if (props.editor.isActive('heading', { level: 2 })) return 'Headline 1'
  if (props.editor.isActive('heading', { level: 3 })) return 'Headline 2'
  if (props.editor.isActive('heading', { level: 5 })) return 'Headline 3'
  return 'Paragraph'
})
</script>

<style scoped>
.dropdown-label {
  font-weight: 500;
  color: var(--color-neutral-700);
  font-size: 0.875rem;
}

.heading-option {
  display: flex;
  padding: 0.625rem;
  font-weight: 500;
}
</style>
