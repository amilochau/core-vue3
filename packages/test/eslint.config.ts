import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,
  // Custom rules
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Vue core rules
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-order': ['error', { order: ['template', 'script', 'i18n', 'style'] }],
      'vue/block-tag-newline': ['error', { multiline: 'always' }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: false }],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-macros-order': ['error', { order: ['defineProps', 'defineEmits', 'defineSlots'] }],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/html-button-has-type': 'error',
      'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
      'vue/multi-word-component-names': 'off',
      'vue/next-tick-style': 'error',
      'vue/no-bare-strings-in-template': 'warn',
      'vue/no-boolean-default': 'error',
      'vue/no-duplicate-attr-inheritance': 'error',
      'vue/no-empty-component-block': 'error',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-ref-object-reactivity-loss': 'error',
      'vue/no-required-prop-with-default': 'error',
      'vue/no-setup-props-reactivity-loss': 'error',
      'vue/no-static-inline-styles': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-undef-components': ['error', { ignorePatterns: ['v-(-|\\w)+', 'router-view'] }],
      'vue/no-unused-properties': 'error',
      'vue/no-unused-refs': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/no-v-text': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/require-macro-variable-name': 'error',
      'vue/require-prop-comment': 'off',
      'vue/require-typed-object-prop': 'error',
      'vue/require-typed-ref': 'error',
      'vue/script-indent': 'error',
      'vue/v-for-delimiter-style': 'error',

      // Vue extension rules (some duplicate core behaviors)
      'vue/dot-notation': 'error',
      'vue/eqeqeq': 'error',
      'vue/no-console': 'error',
      'vue/no-constant-condition': 'error',
      'vue/no-extra-parens': 'error',
      'vue/no-irregular-whitespace': 'error',
      'vue/no-loss-of-precision': 'error',
      'vue/no-restricted-syntax': 'error',
      'vue/no-sparse-arrays': 'error',
      'vue/no-useless-concat': 'error',
      'vue/prefer-template': 'error',
      'vue/space-in-parens': 'error',
      'vue/space-infix-ops': 'error',

      // ESLint core rules:
      eqeqeq: 'error',
      'func-style': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-import-assign': 'error',
      'no-param-reassign': 'error',
      'no-self-compare': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],

      // Stylistic rules from @stylistic (be aware these may conflict with Prettier):
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': 'error',
      '@stylistic/comma-style': 'error',
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': 'error',

      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
