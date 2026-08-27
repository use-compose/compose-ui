<template>
  <form class="add-link-form" @submit.prevent="onSubmit">
    <YEditorLinkInput ref="inputRef" v-model="linkValue" placeholder="https://" type="url">
      <div v-show="linkValue" class="form-actions">
        <button type="submit" :disabled="!isValid" class="btn-submit">
          <FlecheRetourIcon size="xs" />
        </button>
        <button type="button" class="btn-reset" @click="reset">
          <CroixFermerIcon size="xs" />
        </button>
      </div>
    </YEditorLinkInput>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { CroixFermerIcon, FlecheRetourIcon } from '../../compose-icons'
import YEditorLinkInput from './YEditorLinkInput.vue'

const props = defineProps<{ editor: Editor }>()

const linkValue = ref('')
const inputRef = ref<InstanceType<typeof YEditorLinkInput> | null>(null)

const isValid = computed(() => {
  try { return !!linkValue.value && !!new URL(linkValue.value) } catch { return false }
})

onMounted(() => inputRef.value?.focus())

function onSubmit() {
  if (isValid.value) props.editor.commands.saveLink(linkValue.value)
}

function reset() { linkValue.value = '' }
</script>

<style scoped>
.add-link-form {
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
</style>
