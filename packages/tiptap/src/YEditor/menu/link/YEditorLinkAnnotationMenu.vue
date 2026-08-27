<template>
  <div class="annotation-menu">
    <LinkIcon size="xs" />
    <p class="link-url">{{ link }}</p>
    <div class="annotation-actions">
      <button class="btn-icon" type="button" @click="editor.commands.removeLink()">
        <CroixFermerIcon size="xs" />
      </button>
      <button class="btn-icon btn-edit" type="button" @click="editor.commands.setEditMode()">
        <EditIcon size="xs" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { CroixFermerIcon, EditIcon, LinkIcon } from '../../compose-icons'

const props = defineProps<{ editor: Editor }>()
const link = computed(() => props.editor.storage.linkMenu?.link)
</script>

<style scoped>
.annotation-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  column-gap: 0.625rem;
}

.link-url {
  color: var(--color-neutral-900);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  flex: 1;
}

.annotation-actions {
  display: flex;
  align-items: center;
  column-gap: 0.3125rem;
}

.btn-icon {
  display: flex;
  border: none;
  background: transparent;
  padding: 0.3125rem;
  cursor: pointer;
}

.btn-edit {
  border-radius: 0.25rem;
}

.btn-edit:hover {
  background: var(--color-neutral-100);
}
</style>
