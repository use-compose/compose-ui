<template>
  <form class="edit-link-form" @submit.prevent="onSubmit">
    <YEditorLinkInput v-model="link" label="URL" placeholder="https://">
      <div v-show="hasLinkChanged" class="form-actions">
        <button type="submit" :disabled="!isValid" class="btn-submit">
          <FlecheRetourIcon size="xs" />
        </button>
        <button type="button" class="btn-reset" @click="link = ''">
          <CroixFermerIcon size="xs" />
        </button>
      </div>
    </YEditorLinkInput>

    <YEditorLinkInput v-if="link !== linkText" v-model="linkText" label="Link text" />

    <hr class="divider" />

    <button type="button" class="remove-link-btn" @click="editor.commands.removeLink()">
      <TrashIcon size="xs" />
      <span class="remove-link-label">Remove link</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { CroixFermerIcon, FlecheRetourIcon, TrashIcon } from '../../compose-icons'
import YEditorLinkInput from './YEditorLinkInput.vue'

const props = defineProps<{ editor: Editor }>()

const storage = computed(() => props.editor.storage.linkMenu)
const link = ref(storage.value?.link ?? '')
const linkText = ref(storage.value?.linkText ?? '')

watch(() => storage.value?.link, (val) => { link.value = val ?? '' }, { immediate: true })
watch(() => storage.value?.linkText, (val) => { linkText.value = val ?? '' }, { immediate: true })
watch(linkText, (val) => { props.editor.commands.setLinkText(val) })

const initialLink = computed(() => storage.value?.link ?? '')
const hasLinkChanged = computed(() => link.value !== initialLink.value)
const isValid = computed(() => {
  try { return !!link.value && !!new URL(link.value) } catch { return false }
})

function onSubmit() {
  if (isValid.value) props.editor.commands.saveLink(link.value, linkText.value)
}
</script>

<style scoped>
.edit-link-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.375rem;
  width: 100%;
}

.form-actions {
  display: flex;
  align-items: center;
  column-gap: 0.625rem;
  margin-top: -0.75rem;
  margin-bottom: -0.75rem;
}

.btn-submit {
  display: flex;
  border: none;
  background: var(--color-primary-800);
  padding: 0.3125rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-submit:disabled {
  opacity: 0.5;
}

.btn-reset {
  display: flex;
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.divider {
  border-color: var(--color-neutral-200);
  margin: 0 -1rem;
}

.remove-link-btn {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-neutral-700);
}

.remove-link-btn:hover {
  color: var(--color-primary-800);
}

.remove-link-label {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
