<template>
  <!--
   * As we are using the native <input type="color">, we get different behaviors based on each browser.
   * When the input value gets modified by the user, the input triggers a change event that we can listen to.
   * Chrome and Edge will display a simple color picker to let the user create a custom color and by clicking outside of it, it will close and trigger the change event
   * Firefox will display a more complex color picker as a separate window with more interactions, that once manually closed, will trigger the change event
   * Safari will first display a color picker with predefined choices, and by clicking on a button, will display a more complex color picker to create a custom color (as Google Sheet or Excel)
   * If we click on one of the predefined colors, the change event will be triggered
   * If we want to use the more complex color picker to create a custom color, the problem is that each time we would change a value in this color picker, the change event will be fired, resulting in a new color added in our situation
   * The problem has been discussed here: https://stackoverflow.com/a/62055129 and explain why the blur event is used
   * Adding a browser detection will probably not help as Safari triggers the change event on the first pre-defined color picker
   * See https://github.com/reteach/reteach-app/pull/2581#issue-1933228007 for a better visual understanding
   *
   * This solution is a workaround for the custom color picker on Safari, working fine in Chrome & Edge but giving a not very friendly UX on Firefox and in the first color picker of Safari
   * We decided with the UX team to give priority to Safari users over Firefox users as they will likely be more numerous
   -->
  <label
    for="y-editor-color-input"
    class="color-input-label multi-color-circle"
    @click.stop
  >
    <input
      id="y-editor-color-input"
      v-model="inputValue"
      type="color"
      name="y-editor-color-input"
      class="color-input"
      @blur="blurInput"
      @change="changeInput"
    />
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Color } from '../../types'

const emit = defineEmits<{ 'on-set-new-color': [color: Color] }>()

const inputValue = ref<Color>('#ffffff')
const isInputChanged = ref(false)
const isInputBlurred = ref(false)

const isColorPicked = computed(() => isInputChanged.value && isInputBlurred.value)

watch(isColorPicked, (val) => {
  if (val) {
    isInputBlurred.value = false
    isInputChanged.value = false
    emit('on-set-new-color', inputValue.value)
  }
})

function changeInput() { isInputChanged.value = true }
function blurInput() { isInputBlurred.value = true }
</script>

<style scoped>
.color-input-label {
  display: flex;
  margin: 0;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  backdrop-filter: blur(1px);
  cursor: pointer;
}

.color-input {
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}

.multi-color-circle {
  background: conic-gradient(
    #f00 0%, #fa0 15%, #af0 30%, #0f0 45%,
    #0af 60%, #a0f 75%, #f0a 90%, #f00 100%
  );
}
</style>
