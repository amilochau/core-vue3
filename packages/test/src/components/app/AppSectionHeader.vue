<template>
  <h2 class="text-center text-primary text-h6 mt-2 mb-4">
    <slot />
    <p>{{ t('text') }}</p>
  </h2>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineSlots<{
  default(): any,
}>();

const { t } = useI18n();
</script>

<i18n lang="yaml">
en:
  text: Text
fr:
  text: Texte
</i18n>
