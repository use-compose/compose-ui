<template>
  <YEditorButton @click="open = true">
    <PictosEditeurAjouterImageIcon size="xs" />
  </YEditorButton>

  <dialog ref="dialogRef" class="image-dialog" @click.self="open = false">
    <h3 class="dialog-title">Insert image</h3>
    <div class="dialog-body">
      <input
        v-model="imageUrl"
        type="url"
        placeholder="https://..."
        class="url-input"
      />
      <div class="dialog-actions">
        <button type="button" class="btn-cancel" @click="open = false">Cancel</button>
        <button type="button" class="btn-insert" @click="insertImage">Insert</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { PictosEditeurAjouterImageIcon } from '../../compose-icons'
import YEditorButton from '../../YEditorButton.vue'

const props = defineProps<{ editor: Editor }>()

const open = ref(false)
const imageUrl = ref('')
const dialogRef = ref<HTMLDialogElement | null>(null)

watch(open, (val) => {
  if (!dialogRef.value) return
  if (val) { imageUrl.value = ''; dialogRef.value.showModal() }
  else dialogRef.value.close()
})

function insertImage() {
  if (imageUrl.value) {
    props.editor.chain().focus().setImage({ src: imageUrl.value }).run()
    open.value = false
  }
}
</script>

<style scoped>
.image-dialog {
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%);
  padding: 1.5rem;
  min-width: 320px;
  border: 1px solid var(--color-neutral-200);
}

.dialog-title {
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 500;
}

.dialog-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.url-input {
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  width: 100%;
  outline: none;
  box-sizing: border-box;
}

.dialog-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-cancel {
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  background: white;
}

.btn-insert {
  background: var(--color-primary-800);
  color: white;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
}
</style>
