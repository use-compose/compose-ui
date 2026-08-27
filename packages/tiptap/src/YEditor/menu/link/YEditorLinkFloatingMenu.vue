<template>
  <div
    ref="menuRef"
    class="link-floating-menu"
    :style="menuStyle"
    @click.stop
  >
    <YEditorAddLinkForm v-if="!isExistingLink" :editor="editor" />
    <YEditorLinkAnnotationMenu v-else-if="!isEditMode" :editor="editor" />
    <YEditorEditLinkForm v-else :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import YEditorAddLinkForm from './YEditorAddLinkForm.vue'
import YEditorEditLinkForm from './YEditorEditLinkForm.vue'
import YEditorLinkAnnotationMenu from './YEditorLinkAnnotationMenu.vue'

const props = defineProps<{ editor: Editor }>()

const menuRef = ref<HTMLElement | null>(null)
const storage = computed(() => props.editor.storage.linkMenu)
const isExistingLink = computed(() => storage.value?.isExistingLink)
const isEditMode = computed(() => storage.value?.isEditMode)
const menuStyle = computed(() => {
  if (!storage.value?.isMenuVisible) return {}
  const { top, left } = storage.value.menuPosition
  return { top, left }
})

function onMouseUp(event: Event) {
  if (!storage.value?.isMenuVisible) return
  const el = menuRef.value
  const target = event.target as Node
  if (el && (el === target || el.contains(target))) return
  if (props.editor.view.dom.contains(target as Node)) {
    const anchor = (target as HTMLElement).closest('a')
    if (anchor) return
  }
  props.editor.commands.hideMenu()
}

onMounted(() => window.addEventListener('mouseup', onMouseUp))
onUnmounted(() => window.removeEventListener('mouseup', onMouseUp))
</script>

<style scoped>
.link-floating-menu {
  position: absolute;
  z-index: 50;
  border-radius: 0.75rem;
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px -1px rgb(0 0 0 / 10%);
  padding: 0.625rem;
  min-width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
