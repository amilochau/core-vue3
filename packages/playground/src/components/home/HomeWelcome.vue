<template>
  <h1 class="mb-2 text-h4">
    {{ t("title") }}
  </h1>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>

<i18n lang="yaml">
en:
  title: Welcome!
fr:
  title: Bienvenue !
</i18n>
