<template>
  <YEditorDropDown ref="dropdownRef">
    <span class="dropdown-label" :style="{ fontFamily: currentFont?.font ?? 'inherit' }">
      {{ currentFont?.label ?? 'Font' }}
    </span>
    <template #dropdown="{ isOpen }">
      <YEditorDropdownMenu v-if="isOpen">
        <YEditorMenuGroup orientation="vertical" :is-small-gap="true">
          <YEditorButton
            v-for="f in fonts"
            :key="f.font"
            class="font-option"
            :style="{ fontFamily: f.font }"
            :is-active="editor.isActive('textStyle', { fontFamily: f.font })"
            @click="editor.chain().focus().setFontFamily(f.font).run()"
          >
            {{ f.label }}
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

const fonts = [
  { label: 'Inter', font: 'Inter' },
  { label: 'Roboto', font: 'Roboto' },
  { label: 'Open Sans', font: 'Open Sans' },
  { label: 'Lato', font: 'Lato' },
  { label: 'Montserrat', font: 'Montserrat' },
  { label: 'Poppins', font: 'Poppins' },
  { label: 'Raleway', font: 'Raleway' },
  { label: 'PT Sans', font: 'PT Sans' },
  { label: 'Oswald', font: 'Oswald' },
  { label: 'Nunito', font: 'Nunito' },
  { label: 'Merriweather', font: 'Merriweather' },
  { label: 'Playfair Display', font: 'Playfair Display' },
  { label: 'Ubuntu', font: 'Ubuntu' },
  { label: 'Source Sans Pro', font: 'Source Sans Pro' },
  { label: 'Lora', font: 'Lora' },
  { label: 'Rubik', font: 'Rubik' },
  { label: 'Work Sans', font: 'Work Sans' },
  { label: 'Quicksand', font: 'Quicksand' },
  { label: 'Space Mono', font: 'Space Mono' },
  { label: 'Slabo 27px', font: 'Slabo 27px' },
  { label: 'Atkinson Hyperlegible', font: 'Atkinson Hyperlegible' },
]

const currentFont = computed(() => fonts.find((f) => props.editor.isActive('textStyle', { fontFamily: f.font })) ?? null)
</script>

<style scoped>
.dropdown-label {
  font-weight: 500;
  color: var(--color-neutral-700);
  font-size: 0.875rem;
  white-space: nowrap;
}

.font-option {
  display: flex;
  padding: 0.4375rem;
  text-align: left;
}
</style>
