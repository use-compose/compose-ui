export default {
  ignoreFiles: [
    '**/storybook-static/**',
    '**/dist/**',
    '**/node_modules/**',
    'packages/ui/src/assets/css/themes/tokens/**',
    'src/assets/css/themes/tokens/**',
    'packages/ui/src/assets/scss/theme/_theme copy.scss',
    'packages/ui/src/assets/scss/utiilities/token-theming.scss',
    'packages/ui/src/components/YTable/YTableFooter/YTableFooter.scss',
    'packages/ui/bin/templates/**',
    'packages/ui/src/bin/templates/**',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  files: ['**/*.{vue,scss,sass,css}'],
  rules: {
    // 'custom-property-pattern': 'foo-.+',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/operator-no-newline-after': null,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global', 'slotted'] }],
    'selector-class-pattern': [
      '^[-]?[a-z0-9]+(?:-[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case',
      },
    ],
    'custom-property-pattern': [
      '^_?[a-z0-9]+(?:-[a-z0-9]+)*$',
      {
        message: 'Expected custom property name to be kebab-case',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        // Inline `style="..."` attributes are declarations-only by design;
        // this rule misreads them as misplaced.
        'no-invalid-position-declaration': null,
      },
    },
  ],
}

// TODO: V2?
// plugins: ['stylelint-declaration-block-no-ignored-properties'],
// rules: {
//   'declaration-block-no-duplicate-custom-properties': true,
//   'declaration-block-no-shorthand-property-overrides': true,
//   'custom-property-pattern': '^[a-z]+(-[a-z]+)*$',
//   'custom-property-no-missing-var-function': true,

//   'max-nesting-depth': 3,
//   'scss/dollar-variable-pattern': '^\\$[a-z]+(-[a-z]+)*$',
//   'scss/at-import-no-partial-leading-underscore': true,
//   'scss/at-function-pattern': '^\\$[a-z]+(-[a-z]+)*$',

//   'color-no-invalid-hex': true,
//   'font-family-no-duplicate-names': true,
//   'selector-pseudo-class-no-unknown': true,
//   'media-feature-name-no-unknown': true,
//   'property-no-unknown': true,
// },
