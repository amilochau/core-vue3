<template>
  <v-expand-transition mode="out-in">
    <app-header-bar
      v-if="pageData.header"
      v-bind="pageData.header"
      :title="pageData.title" />
  </v-expand-transition>
  <router-view v-slot="{ Component }">
    <v-fade-transition mode="out-in">
      <component :is="Component" />
    </v-fade-transition>
  </router-view>
  <v-expand-transition mode="out-in">
    <app-footer-bar
      v-if="pageData.footer"
      v-bind="pageData.footer" />
  </v-expand-transition>
</template>

<script setup lang="ts">
import { AppFooterBar, AppHeaderBar } from '../components';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocale } from 'vuetify'
import { useAppStore, useLanguageStore } from '../stores';
import { storeToRefs } from 'pinia';

const { locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const languageStore = useLanguageStore()
const { current } = useLocale()
const appStore = useAppStore()
const { pageData } = storeToRefs(appStore)

const setLanguage = (lang: string) => {
  if (lang) {
    languageStore.setLanguage(lang)
    document.querySelector('html')?.setAttribute('lang', lang)
    locale.value = lang
    current.value = lang
  }
}

setLanguage(route.params.lang?.toString())

onBeforeRouteUpdate((to) => {
  const lang = to.params.lang?.toString()
  setLanguage(lang)
})
</script>
