<template>
  <h1 class="mb-2 text-h4">
    {{ t("title") }}
  </h1>
  <h2 class="mb-2 text-h6">
    {{ t("description") }}
  </h2>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<i18n lang="yaml">
en:
  title: Welcome!
  description: This site can be used to test the features from amilochau/core-vue3
fr:
  title: Bienvenue !
  description: Ce site peut être utilisé pour tester les fonctionnalités de amilochau/core-vue3
</i18n>
