<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocale } from 'vuetify';
import { useLanguageStore } from '../stores';

const { locale } = useI18n({ useScope: 'global' });
const route = useRoute();
const languageStore = useLanguageStore();
const { current } = useLocale();

const setLanguage = (lang: string) => {
  if (lang) {
    languageStore.setLanguage(lang);
    document.querySelector('html')?.setAttribute('lang', lang);
    locale.value = lang;
    current.value = lang;
  }
};

setLanguage(route.params.lang?.toString());

onBeforeRouteUpdate((to) => {
  const lang = to.params.lang?.toString();
  setLanguage(lang);
});
</script>
