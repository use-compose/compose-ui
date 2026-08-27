---
'@use-compose/ui': minor
---

Declare `vue` as a peer dependency instead of a runtime dependency.

A component library that installs its own Vue gives consumers a second copy. Even
when a package manager dedupes to one physical install, a bundler can still end up
with two Vue *module instances* — one from the app's source graph, one inside a
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
