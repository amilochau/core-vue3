<template>
  <h1 class="mb-2 text-h4">
    {{ t("pages.home.welcome.title") }}
  </h1>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
