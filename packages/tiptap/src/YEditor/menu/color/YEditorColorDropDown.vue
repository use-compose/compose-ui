<template>
  <YEditorDropDown ref="dropdownRef">
    <YEditorColorCircle :is-small="true" :color="selectedColor" />

    <template #dropdown="{ isOpen }">
      <YEditorDropdownMenu v-if="isOpen" :width="180">
        <div class="section-title">Colors</div>
        <div class="color-grid">
          <YEditorColorCircle
            v-for="color in colors"
            :key="color"
            :color="color"
            :is-selected="color === selectedColor"
            @click="setColor(color)"
          />
          <YEditorMultiColorCircle @on-set-new-color="onSetNewColor" />
          <button
            type="button"
            class="unset-btn"
            title="Remove color"
            @click="unsetColor"
          >✕</button>
        </div>
        <template v-if="additionalColors.length > 0">
          <div class="section-title section-title-spaced">Custom</div>
          <div class="color-grid">
            <YEditorColorCircle
              v-for="color in additionalColors"
              :key="color"
              :color="color"
              :is-selected="color === selectedColor"
              @click="setColor(color)"
            />
          </div>
        </template>
      </YEditorDropdownMenu>
    </template>
  </YEditorDropDown>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { useDropdown } from '../../composables/use-dropdown'
import type { Color } from '../../types'
import YEditorDropDown from '../YEditorDropDown.vue'
import YEditorDropdownMenu from '../YEditorDropdownMenu.vue'
import YEditorColorCircle from './YEditorColorCircle.vue'
import YEditorMultiColorCircle from './YEditorMultiColorCircle.vue'

const props = defineProps<{
  editor: Editor
  /** Theme/preset colors to show in the palette */
  colors?: Color[]
  /** Previously saved custom colors */
  customColors?: Color[]
}>()

const emit = defineEmits<{
  /** Emitted when user picks a new custom color so the parent can persist it */
  'update:customColors': [colors: Color[]]
}>()

const dropdownRef = ref<EventTarget | null>(null)
useDropdown({ dropdownRef, isClosingOnSelection: false, hasScrollbar: false })

const additionalColors = ref<Color[]>(props.customColors ?? [])

const selectedColor = computed(() => props.editor.getAttributes('textStyle').color ?? '')

function setColor(color: Color) {
  props.editor.chain().focus().setColor(color).run()
}

function unsetColor() {
  props.editor.chain().focus().unsetColor().run()
}

function onSetNewColor(color: Color) {
  additionalColors.value = [...additionalColors.value, color]
  emit('update:customColors', additionalColors.value)
  setColor(color)
}
</script>

<style scoped>
.section-title {
  margin-bottom: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.section-title-spaced {
  margin-top: 0.625rem;
  margin-bottom: 0.25rem;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.625rem;
}

.unset-btn {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  border: 1px solid var(--color-neutral-200);
  background: white;
  padding: 0;
  cursor: pointer;
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>
