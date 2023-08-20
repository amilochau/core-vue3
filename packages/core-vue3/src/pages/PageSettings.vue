<template>
  <app-header-bar
    :title="t('pageTitle')"
    button-mode="back"
    :default-back-to="{ name: 'Home' }" />
  Settings
</template>

<script setup lang="ts">
import { AppHeaderBar } from '../components'
import { useI18n } from 'vue-i18n';
import { usePage } from '../composition';

usePage()
const { t } = useI18n()
</script>

<i18n lang="yaml">
  en:
    pageTitle: Settings
    pageDescription: Settings page
  fr:
    pageTitle: Paramètres
    pageDescription: Page de paramètres
</i18n>

<i18n lang="yaml">
  
</i18n>
