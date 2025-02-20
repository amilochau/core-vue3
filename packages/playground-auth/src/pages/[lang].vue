<route lang="yaml">
path: /:lang(fr|en)
</route>

<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocale } from 'vuetify';
import { useLanguageStore } from '@amilochau/core-vue3/stores';
import { useHead, useSeoMeta } from '@unhead/vue';
import { generateMetadataInfo } from '@amilochau/core-vue3/utils';

const { locale } = useI18n({ useScope: 'global' });
const route = useRoute();
const languageStore = useLanguageStore();
const { current } = useLocale();

const setLanguage = (lang: string) => {
  if (lang) {
    languageStore.setLanguage(lang);
    locale.value = lang;
    current.value = lang;
  }
};

setLanguage(route.params.lang?.toString());

if (document.location.host.startsWith('dev.') || document.location.host.startsWith('localhost')) {
  useSeoMeta({
    robots: 'noindex',
  });
}

useHead(() => {
  const metadataInfo = generateMetadataInfo(route.path, route.meta, locale.value);

  return {
    title: metadataInfo.title,
    meta: metadataInfo.meta,
    htmlAttrs: {
      lang: locale,
    },
  };
});

onBeforeRouteUpdate(to => {
  const lang = to.params.lang?.toString();
  setLanguage(lang);
});
</script>
