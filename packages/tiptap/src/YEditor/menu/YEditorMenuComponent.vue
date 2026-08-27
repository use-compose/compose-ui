<template>
  <Component :is="dynamicComponent" v-bind="getComponentProps" @click="handleComponentClick">
    <Component :is="menuComponent.iconComponent" v-if="menuComponent.icon" class="menu-component-icon"  />
    <slot v-if="menuComponent.children" />
  </Component>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import { resolveDynamicComponent, type MenuComponent } from '../utils/menu'

const props = withDefaults(
  defineProps<{
    editor: Editor
    menuComponent: MenuComponent
    isTooltipShown?: boolean
  }>(),
  {
    // editor: undefined,
    isTooltipShown: true,
  },
)

const dynamicComponent = computed(() => resolveDynamicComponent(props.menuComponent.component))

const getComponentProps = computed(() => {
  const menuComponentProps =
    typeof props.menuComponent.componentProps === 'function'
      ? { ...props.menuComponent.componentProps(props?.editor), editor: props.editor }
      : { ...props.menuComponent.componentProps, editor: props.editor }

  return menuComponentProps
})

function handleComponentClick(event: Event) {
  if (typeof props.menuComponent.componentProps !== 'function') {
    event.preventDefault()
    return
  }
  if (
    props.menuComponent.componentProps(props.editor)?.command &&
    typeof props.menuComponent.componentProps(props.editor)?.command === 'function'
  ) {
    const command = props.menuComponent.componentProps(props.editor).command

    if (!command) return

    //  if command is a boolean
    if (typeof command === 'boolean') {
      return !!command
    }

    return (command as () => boolean | void)()
  }
}
</script>

<style scoped>
  .menu-component-icon {
    height: 100%;
    max-width: auto;
  }
</style>
