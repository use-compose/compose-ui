import type { Meta, StoryObj } from '@storybook/vue3'

import { YButton } from '@/components'
import { action } from '@storybook/addon-actions'
import { ref } from 'vue'
import YOverlay, { YOverlayProps } from './YOverlay.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YOverlay> = {
  title: 'Compose/Overlays/YOverlay',
  component: YOverlay,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'handleClick' },
    color: { control: 'color' },
    opacity: { control: 'number' },
    blur: { control: 'number' },
  },
  args: {
    onClick: action('onClick'),
  }, // default value
}

export default meta

type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (args: YOverlayProps, { argTypes }) => ({
    components: { YOverlay, YButton },
    props: Object.keys(argTypes),
    template: `
         <div>
           <YButton @click="open">Open Overlay</YButton>
           <YOverlay v-bind="args" v-model="isVisible" @click="close">
         </div>
       `,
    setup() {
      const isVisible = ref(false)

      const open = () => {
        isVisible.value = true
      }

      const close = () => {
        isVisible.value = false
      }

      return { args, open, close, isVisible }
    },
  }),

  args: {},
}

const Default = renderGenericStory

export { Default }
