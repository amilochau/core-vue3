<template>
  <div class="d-flex fill-height">
    <v-main>
      <app-bar />
      <app-progress-bar :lazy-delay="200" />
      <app-cookies />
      <router-view v-slot="{ Component }">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
      <app-navigation-drawer />
    </v-main>
    <app-snackbar />
  </div>
</template>

<script setup lang="ts">
import AppBar from '../components/app/layout/bar/AppBar.vue'
import AppNavigationDrawer from '../components/app/layout/AppNavigationDrawer.vue'
import AppCookies from '../components/app/layout/AppCookies.vue'
import AppProgressBar from '../components/app/layout/AppProgressBar.vue'
import AppSnackbar from '../components/app/layout/AppSnackbar.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocale } from 'vuetify'
import { useLanguageStore } from '../stores';

const i18n = useI18n({ useScope: 'global' })
const route = useRoute()
const languageStore = useLanguageStore()
const { current } = useLocale()

setLanguage(route.params.lang?.toString())

onBeforeRouteUpdate((to) => {
  const lang = to.params.lang?.toString()
  setLanguage(lang)
})

function setLanguage(lang: string) {
  if (lang) {
    languageStore.setLanguage(lang)
    document.querySelector('html')?.setAttribute('lang', lang)
    i18n.locale.value = lang
    current.value = lang
  }
}
</script>
