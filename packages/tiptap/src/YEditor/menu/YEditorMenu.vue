<template>
  <div class="y-editor-toolbar">
    <YEditorMenuComponent
      v-for="(item, key) in components"
      :key="`${key}-${item.name}`"
      :menu-component="item"
      :editor="editor"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { generateMenuComponents } from '../utils/menu'
import { defaultMenuComponentsList } from '../utils/menu/extensions-list'
import YEditorMenuComponent from './YEditorMenuComponent.vue'

const props = withDefaults(defineProps<{
  editor: Editor
  menuOptions?: string[]
}>(), {
  menuOptions: () => defaultMenuComponentsList,
})

const components = computed(() => generateMenuComponents(props.menuOptions))
</script>

<style scoped>
.y-editor-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.125rem;
  padding: 0.25rem 0.5rem;
  border-bottom: 1px solid var(--color-neutral-200);
  height: 2.5rem;

  & > * {
    height: auto;
    max-height: 100%;
  }
}
</style>
