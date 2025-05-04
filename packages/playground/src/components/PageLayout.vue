<template>
  <v-empty-state
    :headline="t('headline')"
    :icon="mdiCheck"
    color="primary" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { mdiCheck } from '@mdi/js';

const { t } = useI18n();
await new Promise(resolve => setTimeout(resolve, 10000));
</script>

<i18n lang="yaml">
en:
  headline: Loaded
fr:
  headline: Chargé
</i18n>
