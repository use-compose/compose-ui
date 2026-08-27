<template>
  <YFlow class="theme-picker" align="center" style="

--flex-gap: var(--_spacing-md)">
    <YSection v-if="showColors" title="Colours">
      <YRow type="cluster">
        <YColorInput
          v-for="key in THEME_COLOR_KEYS"
          :key="key"
          :model-value="theme[key]"
          :label="key"
          :name="key"
          @update:model-value="(value: string) => setThemeProperty(key, value)"
        />
      </YRow>
      <YRow type="cluster">
        <YButton size="small" style="

--component-margin-bottom: 0" @click="randomize">
          Randomize
        </YButton>
        <YButton
          size="small"
          variant="outlined"
          style="

--component-margin-bottom: 0"
          @click="resetColors"
        >
          Reset colours
        </YButton>
      </YRow>
    </YSection>

    <YSection v-if="showTokens" title="Tokens">
      <div v-for="group in tokenGroups" :key="group.category" class="theme-picker-group">
        <h3 class="theme-picker-group-title">{{ group.category }}</h3>
        <YRow type="cluster">
          <div
            v-for="leaf in group.leaves"
            :key="leaf.cssVar"
            class="theme-picker-knob"
            :class="{ 'is-overridden': group.editor.isOverridden(leaf.cssVar) }"
          >
            <YInputText
              :model-value="group.editor.valueOf(leaf)"
              :label="leaf.name"
              :name="leaf.cssVar"
              no-margin
              @update:model-value="
                (value) => group.editor.setToken(leaf.cssVar, String(value ?? ''))
              "
            />
            <button
              type="button"
              class="theme-picker-reset"
              :disabled="!group.editor.isOverridden(leaf.cssVar)"
              :title="`Reset ${leaf.cssVar}`"
              @click="group.editor.resetToken(leaf.cssVar)"
            >
              &#8635;
            </button>
          </div>
        </YRow>
      </div>

      <YButton
        size="small"
        variant="outlined"
        style="

--component-margin-bottom: 0"
        :disabled="overrideCount === 0"
        @click="resetTokens"
      >
        Reset {{ overrideCount }} token override{{ overrideCount === 1 ? '' : 's' }}
      </YButton>
    </YSection>
  </YFlow>
</template>

<script setup lang="ts">
import { YButton } from '@/components'
import { useTheme } from '@/composables'
import { basePropsDefault } from '@/composables/component-theme'
import { defaultTheme } from '@/composables/theme'
import { useTokens } from '@/composables/use-theme-tokens'
import type { YTheme } from '@/types/theme'
import { computed } from 'vue'
import YFlow from '../cube/YFlow/YFlow.vue'
import YRow from '../cube/YRow/YRow.vue'
import { YColorInput } from '../YColorInput'
import { YInputText } from '../YInputText'
import YSection from '../YSection/YSection.vue'
import { MAIN_TOKEN_CATEGORIES, MAIN_TOKEN_PATHS } from './main-tokens'
import type { YThemePickerProps } from './types'
import './YThemePicker.css'

withDefaults(defineProps<YThemePickerProps>(), {
  ...basePropsDefault,
  showColors: true,
  showTokens: true,
})

const THEME_COLOR_KEYS = [
  'primary',
  'secondary',
  'background',
  'dark',
  'danger',
  'text',
] as const satisfies readonly (keyof YTheme)[]

const { theme, setThemeProperty } = useTheme()

const editors = useTokens(MAIN_TOKEN_CATEGORIES)

const tokenGroups = computed(() =>
  Object.entries(MAIN_TOKEN_PATHS).map(([category, paths]) => {
    const editor = editors[category as keyof typeof editors]
    const byPath = new Map(editor.leaves.map((leaf) => [leaf.path, leaf]))
    return {
      category,
      editor,
      leaves: paths.map((path) => byPath.get(path)).filter((leaf) => leaf !== undefined),
    }
  }),
)

const overrideCount = computed(() =>
  MAIN_TOKEN_CATEGORIES.reduce(
    (total, category) => total + editors[category].overrideCount.value,
    0,
  ),
)

function resetTokens() {
  for (const category of MAIN_TOKEN_CATEGORIES) editors[category].resetAll()
}

function randomHexColorCode() {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
  )
}

function randomize() {
  for (const key of THEME_COLOR_KEYS) setThemeProperty(key, randomHexColorCode())
}

function resetColors() {
  for (const key of THEME_COLOR_KEYS) {
    const value = defaultTheme[key]
    if (value) setThemeProperty(key, value)
  }
}
</script>
