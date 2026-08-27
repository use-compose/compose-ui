# @use-compose/ui

## 1.2.0

### Minor Changes

- 70d7b3c: Declare `vue` as a peer dependency instead of a runtime dependency.

  A component library that installs its own Vue gives consumers a second copy. Even
  when a package manager dedupes to one physical install, a bundler can still end up
  with two Vue _module instances_ — one from the app's source graph, one inside a
  prebundled chunk of this library. The symptoms are hard to trace because nothing
  errors at install time:

  - `renderSlot` breaks when a component is rendered across the two instances
  - in Vite dev, only one instance defines `__VUE_HMR_RUNTIME__`, while
    `@vitejs/plugin-vue` emits an unguarded reference to it in every compiled SFC —
    so hydration throws and the whole island silently goes inert, having already
    server-rendered correctly

  Consumers were working around this with `ssr.noExternal`, `optimizeDeps.include`,
  `resolve.dedupe: ['vue']`, and package-manager overrides pinning a single Vue.

  `vue` moves to `peerDependencies` (`^3.5.0`) and is added to `devDependencies` for
  building and testing. The build already externalised `vue`, so `dist` is unchanged.

  **Upgrading:** install `vue` alongside this package if it isn't already a direct
  dependency. Every existing consumer already has it, and npm 7+ and pnpm install
  missing peers automatically, so no change is expected in practice.

## 1.1.1

### Patch Changes

- fa81a77: Fix import

## 1.1.0

### Minor Changes

- e619744: YRegion component

## 1.0.0

### Major Changes

- ffe9817: Adds `YChip`/`YChipGroup` for removable/selectable tags, and reworks `YCard` into a standalone
  "block link" card:

  - `YChip`: a clickable, toggleable chip (`aria-pressed`, keyboard-activatable) with an optional
    removable "x" (`removable`, emits `remove`) and a standalone `v-model:selected`.
  - `YChipGroup`: single- or multi-select (`multiple`) coordinator over an array `v-model` —
    chips register their selection via `value` and read it back through provide/inject, following
    the same getter-based pattern `YList`/`YListItem` use.
  - `YCard` **(breaking)**: no longer extends `ThemeComponentBaseProps` and drops all shared
    theming composables/`data-compose-ui` engine hookup — it's now a genuinely standalone
    component with its own props and plain `--y-card-*` CSS custom properties. New props: `tag`,
    `title`, `href`, `headingLevel`, `flat` (replaces the old `raw`). Implements the "block link"
    pattern from [Inclusive Components](https://inclusive-components.design/cards/) — the same one
    brutally-css's `.m-card` implements — via `title`+`href`, or hand-rolled with the
    `.y-card-link`/`.y-card-interactive` utility classes for full free-form control. The brutalist
    offset-shadow pop triggers specifically off the card's real link being hovered/focused (via
    `:has()`), not just the mouse being anywhere over the card, and text auto-inverts to solid
    white/black (whichever contrasts against `--y-card-bg-lightness`) while that pop is active.
    Also deletes `components/YCardHeader.vue`/`YCardFooter.vue`, fully commented-out dead stubs
    that weren't exported or used anywhere.

### Minor Changes

- ffe9817: Re-added the old root-level timeline as a working component, `YTimeline` + `YTimelineItem`.

  It had been stranded at the repo root in `src/components/YList` since the monorepo move and was
  never exported from the package. The old version was also mis-shaped: it was named `YList` but
  rendered a single timeline item, and required the caller to pass `index` and `lastIndex` by hand.

  - `YTimeline` renders the `<ul>`/`<ol>`; `YTimelineItem` renders one item. An item's position in
    the rail is now read from the DOM with `:first-child` / `:last-child`, so `index` and
    `lastIndex` are gone from the public API.
  - Replaced the `<style scoped>` block with a `YTimeline.css` / `YTimelineItem.css` pair in the
    `components` layer, with flat kebab-case classes (`.y-timeline-marker`, `.y-timeline-body`,
    etc.) rather than BEM, and dropped references to custom properties and classes that no longer
    exist (`--color-white`, `--color-black`, `.font-gotham`, `.text-9`, `.display-flex`). Geometry
    is tunable through `--y-timeline-*` custom properties.
  - Rail and dot colour default to a semantic token rather than `--theme-current-color`, which is
    only defined inside `[data-compose-ui='block']` and so resolved to nothing here — taking the
    whole `border-left` shorthand down with it and leaving the rail invisible. `YTimeline` wires up
    `color`/`variant` through the shared `useColor`/`useVariant` composables (`.primary` /
    `.secondary` / `.danger` on `.y-timeline`) without adding `data-compose-ui="block"`, since a
    rail isn't a clickable block and that attribute is what turns on the shared engine's
    interactive shadow/transform styling.
  - The list reserves padding for its markers, which hang into negative x and previously relied on
    a padded ancestor to avoid being clipped.
  - Item state classes are `is-highlighted` / `is-collapsible` / `is-open`. A bare `highlighted`
    collided with `YHighlightedText`'s global `.highlighted` rule and uppercased the item's
    description.
  - Collapsing is now an explicit `collapsible` prop on the list instead of a `window.innerWidth`
    check inside the click handler, which never re-evaluated on resize. The toggle is a real button
    with `aria-expanded` and `aria-controls`, and is omitted when an item has nothing to reveal.
  - `YTimelineItem` fixes the title's `level="h3"` (not a prop on `YHighlightedText`) with a
    `headingLevel` prop, and renders its default slot as the description so items can carry markup.

### Patch Changes

- ffe9817: YList / YTimeline and YCard new version

## 0.10.2

### Patch Changes

- 74320fc: Fixed dropdown positioning, button click-effect glitches, and false
  clickable affordance:

  - `YDropdown`: the menu had no `position: absolute`, so it pushed layout
    instead of floating over the trigger. Adds absolute positioning plus a
    left/right `position` prop.
  - compose-ui token engine: outlined/raw buttons kept the brutalist
    `translate()` click effect even with box-shadow hidden, reading as an
    unwanted jiggle. Gates the transform by the same is-box-shadow-hidden
    flag as the shadow itself.
  - `YButton`: the `:focus` outline and the state engine's active-state
    box-shadow both drew a rectangle on click at once. Outline is now
    suppressed while `:active`.
  - `YModal` footer buttons: `border: var(--component-border)` referenced an
    undefined custom property, resetting the border to `none` and making
    adjacent buttons merge into one block. Points at the real,
    already-computed border vars instead.
  - `YTag`/`Card`: only apply the button-style hover/active depth effect
    when actually interactive (`YTag` defaults raw; `Card` gates on
    `href`/`clickable`), so static tags and cards stop reading as clickable.
  - `YParallax`: was an unimplemented stub; ports the CSS-only
    perspective/`translateZ` technique from brutally-css with a
    back/default-slot API.

- 74320fc: Fixed a `stylelint` error in `YParallax.css` (`declaration-block-no-redundant-longhand-properties`) by collapsing `overflow-x: hidden; overflow-y: auto;` into the shorthand `overflow: hidden auto;`. No behavior change.

## 0.10.1

### Patch Changes

- ffecfbe: Fixed `v-model` not propagating on every form input component (`YInput`,
  `YInputText`, `YCheckbox`, `YColorInput`, `YDateInput`, `YTimeInput`,
  `YDateTimeInput`) — typing, checking a box, or picking a date/color never
  wrote back to the bound value.

  Root cause: `YInput`'s native `<input>` used `v-on="handleEvent"`, binding a
  single function where `v-on` without an argument requires an event-name-keyed
  object. Vue silently dropped it, so the input had no write-back path at all.
  A second, independent bug in `useInput()`'s re-emit watcher (`newValue !==
modelValue.value`, which is always false since `newValue` _is_
  `modelValue.value`) meant fixing `YInput` alone didn't fix wrappers built on
  top of it — `useInput()` is now a small writable `computed` instead.

  `YCheckbox` also emitted a checkbox's `.value` (e.g. `"on"`) instead of
  `.checked` for its `change` event. `YColorInput` was rewritten to match the
  fixed contract while preserving its "commit on `change`, not on every drag
  tick" behavior.

  Deleted `use-events.ts`, an unused, more-correct parallel implementation of
  the same thing that nothing ever called.

- 70de0ff: Cleanup + fix input logic

## 0.10.0

### Minor Changes

- bf21d92: `YThemePicker` is now a working live theme editor instead of a read-only dump.

  - All six `YTheme` colours are editable (`dark` and `text` were missing), each
    writing through to the theme on change.
  - Added a curated set of design-token knobs — the scale roots for `border`,
    `spacing`, `radius` and `font`. Everything else in those categories derives
    from these through `calc()`, so these are the values worth tuning. Edits go
    straight to `:root`, persist across reloads, and are resettable individually
    or as a group.
  - `Randomize` works outside dev builds. It was wrapped in `import.meta.env.DEV`,
    so the button did nothing in any production or Storybook build.
  - New `showColors` / `showTokens` props to render either half on its own.

  `useToken` / `useTokens` were rewritten to support the above and to fix bugs that
  made them unusable:

  - `tokenTypes` returned the 24 top-level token categories instead of the types
    within the requested category, so `setToken` threw `Invalid token type` for
    every valid input.
  - `setToken` wrote the token's _name_ as its value — `--border-width-base: base`.
  - The composable touched `document.documentElement` during setup, which threw
    during SSR.

  They now expose the category's flattened leaves (`cssVar`, `defaultValue`, and a
  `kind` for picking a control) plus `setToken` / `resetToken` / `resetAll` /
  `valueOf` / `isOverridden`, all SSR-safe and persisted.

## 0.9.1

### Patch Changes

- 092d764: Removed two leftover `console.log` calls that fired in consumer applications: one
  in `useComposeTheme` on every colour resolution (so several times per theme
  change) and one in `useDropdown` on every setup. The package no longer logs
  anything at runtime.

  `setColorProperties` keeps its `useMode(modeRgb)` call. The return value is
  unused, but `culori/fn` is tree-shakeable and `oklch()` can only parse hex/rgb
  input once that mode is registered — without it every theme colour falls through
  to the "Invalid color provided" warning.

## 0.9.0

### Minor Changes

- 24bbf67: `AppCompose`'s `useBg` now paints a real background instead of setting a dead flag.

  It still accepts `true` (the theme background, `--color-bg`), and now also accepts a
  background token — `'info'`, `'accent'`, `'elevated'`, … with an optional `bg-` /
  `color-bg-` prefix — a custom property (`'--my-surface'`), or any plain CSS color.
  The resolver is exported as `resolveComposeBg`, with `COMPOSE_BG_TOKENS` /
  `ComposeBgToken` for the token list.

  Export and cascade fixes:

  - `YTable`, `YTableBody`, `YTableRow`, `YTableHeader`, `YTableDataCell` and
    `YTableFooter` are now exported — the `YTable` barrel pointed at file paths that
    did not exist, so the whole subtree was left out of the public entry.
  - `YTag`, `YLabel`, `YMenu`, `YParallax`, `YSkeleton`, `YDropdownTrigger` and
    `CloseIcon` are now exported.
  - `ModalProvider` is no longer re-exported from two barrels, which made it an
    ambiguous star export.
  - Component prop types (`YButtonProps`, `YTableProps`, `WrapperProps`, …) are now
    re-exported alongside their components.
  - `global.css` is imported first from the package entry so the
    `@layer tokens, base, theme, components, utilities` order is registered before any
    component stylesheet. Previously a component stylesheet could register
    `components` first and sink it below `theme` and `base`.
  - `AppCompose.css` and `YInputText.css` were never imported and are now included.
  - Removed duplicate `components/AppCompose.vue` and `components/Wrapper.vue`; the
    stale `Wrapper.vue` copy used by `YSection` was missing its stylesheet import.
  - `package.json` `exports`: `./package.json` and `./components` pointed at files
    that are not emitted into `dist`.
  - `YSkeleton` no longer ships an unlayered `<style>` block. It was outranking every
    layered rule in the package — including its own `YSkeleton.css` — and wrote
    `--border-color`, `--animation-duration`, `--skeleton-base` and
    `--skeleton-highlight` onto the global `:root`. The styles moved into
    `YSkeleton.css` under `@layer components`, and the variables are now namespaced
    (`--y-skeleton-*`) and scoped to `.skeleton-container`. Override them there.
    The shimmer's `left: -var(…)` was invalid CSS and never applied; the highlight
    now sweeps the full placeholder and respects `prefers-reduced-motion`.
  - `CloseIcon`'s scoped `<style>` is layered too, so nothing in the package sits
    outside the cascade layers any more.

## 0.8.1

### Patch Changes

- dc9d18b: Move `express`, `compression` and `sirv` from `dependencies` to `devDependencies`. They are used only by `server.js`, the SSR dev/preview server, which is not published (the package ships `files: ["dist"]`). Consumers no longer install them transitively, which removes the `path-to-regexp`, `body-parser` and `qs` advisories from the published dependency tree.

## 0.8.0

### Minor Changes

- b507ab9: Cleanup styling, removal of duplicate causing heavy rendering and Tiptap package

## 0.7.0

### Minor Changes

- 68b7db0: Setup monorepo to init Tiptap package
